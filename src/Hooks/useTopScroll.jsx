import { useEffect } from 'react';

export default function useTopScroll() {
  useEffect(() => {
    const scrollToTop = () => {
      top.location.href = '#page-top';
    };

    scrollToTop();
  }, []);
}
