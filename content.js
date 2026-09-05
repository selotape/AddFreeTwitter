(() => {
  "use strict";

  // X/Twitter tags promoted tweets with a small "Promoted" (sometimes "Ad")
  // label in the tweet header/footer, outside the tweet body text.
  const AD_LABELS = new Set(["Promoted", "Ad"]);

  function isAd(article) {
    const body = article.querySelector('[data-testid="tweetText"]');
    for (const span of article.querySelectorAll("span")) {
      if (body && body.contains(span)) continue; // ignore the tweet's own text
      if (AD_LABELS.has(span.textContent.trim())) return true;
    }
    return false;
  }

  function hide(article) {
    const cell = article.closest('[data-testid="cellInnerDiv"]') || article;
    if (cell.dataset.adfreeHidden) return;
    cell.dataset.adfreeHidden = "1";
    cell.style.display = "none";
  }

  function sweep(root) {
    const scope = root && root.querySelectorAll ? root : document;
    for (const article of scope.querySelectorAll("article:not([data-adfree-seen])")) {
      article.dataset.adfreeSeen = "1";
      if (isAd(article)) hide(article);
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.addedNodes.length) {
        sweep(document);
        return;
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  sweep(document);
})();
