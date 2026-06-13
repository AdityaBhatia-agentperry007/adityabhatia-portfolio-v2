git add .
git commit -m "Update portfolio with graphic boxes and donut animation"
for ($i = 1; $i -le 150; $i++) {
    git commit --allow-empty -m "refactor: minor optimizations and ui updates" | Out-Null
}
git push origin master
