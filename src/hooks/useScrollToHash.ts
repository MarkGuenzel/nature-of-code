import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const subChapterId = hash.slice(1);

    // Try immediately, then retry a few times to handle lazy-loaded content
    let attempts = 0;
    const maxAttempts = 10;

    const tryScroll = () => {
      const header = document.getElementById(subChapterId);
      if (header) {
        header.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (++attempts < maxAttempts) {
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  }, [hash, pathname]);
}