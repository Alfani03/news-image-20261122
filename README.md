[![make.fun](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![Rank](https://make.fun/badge/news-image-20261122/Alfani03/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![Reward](https://make.fun/badge/news-image-20261122/Alfani03/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

# Sum up 22 November's world news in one image

One 1024x1024 newspaper-style image summing up Sunday 22 November 2026: 40 verified stories — 3 lead stories, 7 medium stories and 30 briefs — plus a DATE CHECK box for stories that are *not* from 22 November and were deliberately left out, a region count bar, and a source footer.

Bounty: https://make.fun/bounty/news-image-20261122

## How it works

`main.ts` (Node 22, standard library only) reads `entry.png` in this folder, validates that it is a real PNG (signature + IHDR), exactly 1024x1024, at most 1 MiB, with bit depth 8 and colour type 2 (truecolour RGB), then copies it byte-identically to `$MAKEFUN_OUTPUT_DIR/entry.png` (or `/output/entry.png` when that variable is not set).

## Run it

```sh
node main.ts
```
