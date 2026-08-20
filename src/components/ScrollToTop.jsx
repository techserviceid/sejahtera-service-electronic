import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Memastikan setiap pindah halaman (route), posisi scroll kembali ke atas
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;