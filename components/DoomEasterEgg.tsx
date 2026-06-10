'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useApp } from './AppContext';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export default function DoomEasterEgg() {
  const { doomTriggered, triggerDoom, closeDoom } = useApp();
  const [keys, setKeys] = useState<string[]>([]);
  const [lightningFlash, setLightningFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [lightningPaths, setLightningPaths] = useState<string[]>([]);

  useEffect(() => {
    // Console log ASCII art
    console.log(`
 %c  ###    ########  #### ######## ##    ##    ###  
  ## ##   ##     ##  ##     ##     ##  ##    ## ##  
  ##   ##  ##     ##  ##     ##      ####    ##   ##  
 ##     ## ##     ##  ##     ##       ##    ##     ##
 ######### ##     ##  ##     ##       ##    #########
 ##     ## ##     ##  ##     ##       ##    ##     ##
 ##     ## ########  ####    ##       ##    ##     ##

 B H A T I A
 doom was here.
`, 'color: #e63946; font-weight: bold;');

    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code || e.key;
      let normCode = code;
      if (code === 'KeyB' || code === 'b' || code === 'B') normCode = 'KeyB';
      if (code === 'KeyA' || code === 'a' || code === 'A') normCode = 'KeyA';

      const nextKeys = [...keys, normCode].slice(-KONAMI_CODE.length);
      setKeys(nextKeys);

      const isMatch = nextKeys.every((val, index) => {
        const expected = KONAMI_CODE[index];
        return val.toLowerCase() === expected.toLowerCase();
      });

      if (isMatch && !doomTriggered) {
        triggerDoom();
        setKeys([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, doomTriggered, triggerDoom]);

  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let thunderInterval: NodeJS.Timeout | null = null;
    let drone1: OscillatorNode | null = null;
    let drone2: OscillatorNode | null = null;
    let droneGain: GainNode | null = null;

    // Procedural jagged lightning bolt generator
    const generateLightningPath = (startX: number, endY: number) => {
      let path = `M ${startX} 0`;
      let currentX = startX;
      let currentY = 0;
      const segments = 6;
      const stepY = endY / segments;
      for (let i = 0; i < segments; i++) {
        currentY += stepY;
        currentX += (Math.random() - 0.5) * 160; // Jagged shift width
        path += ` L ${currentX} ${currentY}`;
      }
      return path;
    };

    if (doomTriggered) {
      // Audio context setup
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }

      const playHorrorSounds = () => {
        if (!audioCtx || audioCtx.state === 'closed') return;
        try {
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }

          const compressor = audioCtx.createDynamicsCompressor();
          compressor.threshold.setValueAtTime(-12, audioCtx.currentTime);
          compressor.knee.setValueAtTime(24, audioCtx.currentTime);
          compressor.ratio.setValueAtTime(16, audioCtx.currentTime);
          compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
          compressor.release.setValueAtTime(0.3, audioCtx.currentTime);
          compressor.connect(audioCtx.destination);

          const masterGain = audioCtx.createGain();
          masterGain.gain.setValueAtTime(2.0, audioCtx.currentTime); // LOUDER
          masterGain.connect(compressor);

          // Crackle sound (lightning strike crackle)
          const bufferSize = audioCtx.sampleRate * 2.8;
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const r = Math.random() * 2 - 1;
            data[i] = r > 0.4 ? 0.95 : r < -0.4 ? -0.95 : r * 2.5; // Grittier distortion
          }

          const noise = audioCtx.createBufferSource();
          noise.buffer = buffer;

          const filter = audioCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(450, audioCtx.currentTime);
          filter.Q.setValueAtTime(4.0, audioCtx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 2.0);

          const noiseGain = audioCtx.createGain();
          noiseGain.gain.setValueAtTime(1.4, audioCtx.currentTime);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.4);

          noise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(masterGain);
          noise.start();

          // Thunder Rumble 1
          const rumble1 = audioCtx.createOscillator();
          const rumbleGain1 = audioCtx.createGain();
          rumble1.type = 'sawtooth';
          rumble1.frequency.setValueAtTime(55, audioCtx.currentTime);
          rumble1.frequency.linearRampToValueAtTime(18, audioCtx.currentTime + 3.0);

          const rumbleFilter1 = audioCtx.createBiquadFilter();
          rumbleFilter1.type = 'lowpass';
          rumbleFilter1.frequency.setValueAtTime(60, audioCtx.currentTime);

          rumbleGain1.gain.setValueAtTime(1.6, audioCtx.currentTime);
          rumbleGain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.0);

          rumble1.connect(rumbleFilter1);
          rumbleFilter1.connect(rumbleGain1);
          rumbleGain1.connect(masterGain);
          rumble1.start();
          rumble1.stop(audioCtx.currentTime + 3.2);

          // Thunder Rumble 2 (delayed second strike rumble)
          setTimeout(() => {
            if (!audioCtx || audioCtx.state === 'closed') return;
            try {
              const rumble2 = audioCtx.createOscillator();
              const rumbleGain2 = audioCtx.createGain();
              rumble2.type = 'triangle';
              rumble2.frequency.setValueAtTime(45, audioCtx.currentTime);
              rumble2.frequency.linearRampToValueAtTime(20, audioCtx.currentTime + 2.5);

              const rumbleFilter2 = audioCtx.createBiquadFilter();
              rumbleFilter2.type = 'lowpass';
              rumbleFilter2.frequency.setValueAtTime(50, audioCtx.currentTime);

              rumbleGain2.gain.setValueAtTime(1.4, audioCtx.currentTime);
              rumbleGain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);

              rumble2.connect(rumbleFilter2);
              rumbleFilter2.connect(rumbleGain2);
              rumbleGain2.connect(masterGain);
              rumble2.start();
              rumble2.stop(audioCtx.currentTime + 2.7);
            } catch {}
          }, 350);
        } catch (err) {
          console.error('Failed to trigger audio clap:', err);
        }
      };

      // Loop continuous ambient wind drone (plays throughout the entire session)
      if (audioCtx) {
        try {
          const droneFilter = audioCtx.createBiquadFilter();
          droneFilter.type = 'lowpass';
          droneFilter.frequency.setValueAtTime(95, audioCtx.currentTime);

          droneGain = audioCtx.createGain();
          droneGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
          droneGain.gain.linearRampToValueAtTime(0.7, audioCtx.currentTime + 2.0); // Louder background pad
          droneGain.connect(audioCtx.destination);

          drone1 = audioCtx.createOscillator();
          drone2 = audioCtx.createOscillator();
          drone1.type = 'sawtooth';
          drone2.type = 'sawtooth';
          drone1.frequency.setValueAtTime(78, audioCtx.currentTime);
          drone2.frequency.setValueAtTime(80.5, audioCtx.currentTime); // detuned beats

          drone1.connect(droneFilter);
          drone2.connect(droneFilter);
          droneFilter.connect(droneGain);

          drone1.start();
          drone2.start();
        } catch (err) {
          console.error('Failed to trigger ambient drone:', err);
        }
      }

      // Visual lightning flash function
      const triggerStrike = (x: number) => {
        setLightningPaths([
          generateLightningPath(x, window.innerHeight),
          generateLightningPath(x + (Math.random() - 0.5) * 120, window.innerHeight * 0.8),
        ]);
        setLightningFlash(true);
        setShake(true);
        setTimeout(() => {
          setLightningFlash(false);
          setShake(false);
        }, 90 + Math.random() * 90);
      };

      // Initial storm sequence on load
      playHorrorSounds();
      setTimeout(() => triggerStrike(window.innerWidth * 0.35), 0);
      setTimeout(() => triggerStrike(window.innerWidth * 0.65), 200);
      setTimeout(() => triggerStrike(window.innerWidth * 0.48), 480);

      // Loop visual strikes & thunder sound effects every 4.5 seconds continuously
      thunderInterval = setInterval(() => {
        playHorrorSounds();
        const randX = Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2;
        setTimeout(() => triggerStrike(randX), 0);
        if (Math.random() > 0.4) {
          setTimeout(() => triggerStrike(randX + (Math.random() - 0.5) * 150), 240);
        }
      }, 4500);
    }

    return () => {
      if (thunderInterval) {
        clearInterval(thunderInterval);
      }
      try {
        if (drone1) drone1.stop();
        if (drone2) drone2.stop();
      } catch {}
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [doomTriggered]);

  return (
    <AnimatePresence>
      {doomTriggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeDoom}
          className={`fixed inset-0 z-[99999] bg-[#010101] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden transition-all duration-[50ms] ${
            lightningFlash ? 'bg-white/95 invert' : ''
          }`}
        >
          {/* Injecting modular drift keyframes */}
          <style>{`
            @keyframes cloudDriftSlow {
              0% { transform: translateX(-15%) translateY(-5%); }
              50% { transform: translateX(5%) translateY(5%); }
              100% { transform: translateX(-15%) translateY(-5%); }
            }
            @keyframes cloudDriftFast {
              0% { transform: translateX(-5%) translateY(5%); }
              50% { transform: translateX(15%) translateY(-5%); }
              100% { transform: translateX(-5%) translateY(5%); }
            }
            .animate-cloud-drift-slow {
              animation: cloudDriftSlow 32s ease-in-out infinite;
            }
            .animate-cloud-drift-fast {
              animation: cloudDriftFast 20s ease-in-out infinite;
            }
          `}</style>

          {/* Jagged Lightning Bolt Render */}
          {lightningFlash && (
            <svg className="absolute inset-0 w-full h-full z-40 pointer-events-none">
              {lightningPaths.map((path, idx) => (
                <path
                  key={idx}
                  d={path}
                  stroke="#f0f9ff"
                  strokeWidth={5 + Math.random() * 5}
                  fill="none"
                  style={{
                    filter: 'drop-shadow(0 0 18px rgba(224, 242, 254, 0.95))'
                  }}
                />
              ))}
            </svg>
          )}

          {/* Billowing Storm Clouds Background Layer */}
          <div className="absolute inset-0 opacity-40 pointer-events-none z-10 overflow-hidden mix-blend-color-dodge">
            <svg className="absolute top-0 left-0 w-[140%] h-[140%] opacity-40" style={{ filter: 'blur(30px)' }}>
              <path d="M-100,200 Q200,50 500,200 T1100,200 T1700,200 T2300,200 L2300,0 L-100,0 Z" fill="#1f1f1f" className="animate-cloud-drift-slow" />
              <path d="M-50,300 Q300,100 700,300 T1500,300 T2300,300 L2300,0 L-50,0 Z" fill="#0d0d0d" className="animate-cloud-drift-fast" />
            </svg>
          </div>

          {/* CRT overlay scanlines */}
          <div className="absolute inset-0 pointer-events-none z-30" style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
            backgroundSize: '100% 6px'
          }} />

          {/* Red warning vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-80"
            style={{
              background: 'radial-gradient(circle, transparent 15%, rgba(220, 38, 38, 0.3) 100%)'
            }}
          />

          {/* Red radial backlight glowing behind */}
          <div className="absolute w-[450px] h-[450px] bg-red-950/20 blur-[130px] rounded-full pointer-events-none z-0 animate-pulse" />

          <motion.div
            animate={shake ? {
              x: [0, -20, 20, -15, 15, -8, 8, 0],
              y: [0, 12, -12, 10, -10, 5, -5, 0],
            } : {}}
            transition={{ duration: 0.45 }}
            className="text-center p-6 z-20 flex flex-col items-center max-w-lg"
          >
            {/* Dr. Doom 4K emergence from dark shadows */}
            <motion.div
              initial={{ scale: 0.65, opacity: 0, filter: 'brightness(0) contrast(3)' }}
              animate={{
                scale: [0.65, 1.03, 1],
                opacity: 1,
                filter: 'brightness(0.95) contrast(1.35) saturate(1.15)',
              }}
              transition={{
                delay: 0.45,
                duration: 1.8,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="relative w-72 h-72 md:w-96 md:h-96 mb-6 border border-red-800/80 overflow-hidden bg-black shadow-[0_0_60px_rgba(220,38,38,0.25)]"
            >
              <Image
                src="/dr_doom.png"
                alt="Dr. Doom"
                fill
                priority
                className="object-cover transition-all duration-[6s] ease-out scale-105 hover:scale-110"
              />
              <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: 0.05 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="absolute inset-0 bg-black pointer-events-none" 
              />
            </motion.div>

            {/* Bouncing horror title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="font-mono text-2xl md:text-4xl text-red-600 font-extrabold tracking-widest uppercase mb-4 drop-shadow-[0_0_20px_rgba(220,38,38,0.7)] animate-pulse"
            >
              DR. DOOM WAS HERE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="font-mono text-[9px] md:text-xs text-neutral-400 uppercase tracking-[0.25em]"
            >
              [SYSTEM CRITICAL - SECURITY SHIELD BROKEN]
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 2.0, duration: 0.7 }}
              className="font-mono text-[8px] text-neutral-600 uppercase mt-4 tracking-wider"
            >
              click anywhere to initiate reboot sequence
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
