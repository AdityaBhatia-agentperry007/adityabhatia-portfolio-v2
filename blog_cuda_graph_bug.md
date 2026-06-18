# a bug, a fix, and what nvidia built back

a few weeks ago i was benchmarking a multi-camera detection pipeline on a gpu. eight camera feeds, each running a detection kernel, then merging the results into one tracklet. the question was simple: does wrapping this in a cuda graph actually help, or is it just overhead for something this small.

i ran three approaches. naive global sync, event-chained streams, and a captured cuda graph. the numbers came back and cuda graphs looked *worse*. not a little worse, meaningfully worse, and the gap widened as i added more cameras (3% slower at n=2, 134% slower at n=8). that's backwards from everything i expected going in.

my first theory was that the kernels were too small to amortize the graph's overhead, true if you're running sub-microsecond synthetic kernels. i wrote that up and sent it to cédric augonnet at nvidia research (he works on cudastf, part of nvidia's open source cccl project, on exactly this kind of scheduling problem), and asked if he'd seen anything similar.

he asked one good question back: had i actually looked at it under nsys.

i hadn't, not properly. so i did. the real kernel time turned out to be around 12 microseconds, not sub-microsecond like i'd assumed, which broke my own theory immediately. that sent me back into the actual capture code, line by line, instead of trusting a headline number that happened to sound plausible.

the bug was three lines long.

```
cudaEventRecord(fork_events[c], primary);
cudaStreamWaitEvent(cam_streams[c], fork_events[c], 0);
...
cudaStreamWaitEvent(primary, join_events[c], 0);   // this one
```

that last line, sitting inside a per-camera loop, was making the *next* camera's fork wait on the *current* camera's join. since stream operations execute in issue order, this silently chained every camera behind the one before it. i wasn't comparing "cuda graph vs no graph" at all. i was comparing a graph i'd accidentally serialized against streams that were genuinely running in parallel.

the fix is one fork event recorded once, every camera stream waits on that same event so they all become eligible together, and the joins only get waited on after every camera has already launched. same kernels, same hardware, and the corrected graph went from the slowest option by a wide margin to roughly 6x faster than my own broken version and 3x faster than the naive baseline at n=8. checked it on a t4 and a p100, so it wasn't a quirk of one card.

i emailed cédric the correction. owning a wrong result you already sent someone isn't a fun email to write, but it felt more honest than quietly letting it go.

what happened next was the actually interesting part. instead of just acknowledging it, he built a custom example. wrote a small cudastf repo overnight, calibrated to my exact measured kernel numbers, not generic placeholder values, using a `task_graph()` mechanism that isn't even merged into cudastf's main branch yet.

i cloned it, built it on the same t4 hardware, profiled it, and found something genuinely interesting: his example was overshooting its own calibrated kernel timing by about 2x on the t4. the cause turned out to be that the gpu's reported clock speed is its max boost clock, but a single-thread busy-wait doesn't actually hold the gpu at boost, so the real timing comes in slower than intended. nothing to do with cudastf's scheduling, everything to do with how a lone thread interacts with gpu clock behavior, the kind of thing you only find by actually running the code instead of reading about it.

structurally, the more interesting finding was this: cudastf's `task_graph()` produces the exact same fan-out, fan-in shape my hand-fixed version does, n concurrent camera writes, one merge reading all of them, one graph launch per frame, except it gets there by inferring concurrency from data dependencies instead of me hand-placing events. the bug i spent days chasing is structurally impossible to write in cudastf, because there's no event left to place wrong in the first place.

right now i'm working on a small contribution back to his repo, a build fix so it compiles cleanly on cloud gpu environments without a manual cmake flag, which feels like the right way to close the loop on this.

the whole thing was a good reminder that the most expensive bugs are the ones that produce a plausible wrong answer. "graphs are slower for small kernels" sounded reasonable enough that i almost stopped there. the fix wasn't being smarter, it was looking at the actual trace instead of trusting the number i wanted to believe.
