# Ad-Free Twitter

A tiny Chrome (Manifest V3) extension that hides promoted / ad tweets on
twitter.com and x.com.

## How it works

`content.js` runs on every Twitter/X page. It watches the timeline with a
`MutationObserver` and, for each tweet `<article>`, checks for a "Promoted" or
"Ad" label outside the tweet body. Matching tweets have their container
(`[data-testid="cellInnerDiv"]`) set to `display: none`.

No permissions, no network access, no options page.

## Install (unpacked)

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
4. Open twitter.com / x.com and reload.

## Notes

- Twitter changes its DOM often; if ads reappear, the "Promoted" label markup
  likely changed and `isAd()` in `content.js` needs a tweak.
- To also hide the sidebar "Trends"/"Who to follow" promos, extend `isAd()` /
  `sweep()` — this version only targets timeline tweets.
