name: Update Vol Surface Data

on:
  schedule:
    - cron: '*/30 * * * *'   # každých 30 minut
  workflow_dispatch:           # možnost spustit ručně

jobs:
  update:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Fetch vol surface data
        run: node scripts/fetch_volsurface.js

      - name: Commit and push if changed
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/volsurface.json
          git diff --staged --quiet || git commit -m "chore: update volsurface data $(date -u '+%Y-%m-%d %H:%M UTC')"
          git push
