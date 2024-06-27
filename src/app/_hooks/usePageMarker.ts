import { getSessionStorage, setSessionStorage } from '@/util/persist';
import { usePathname } from 'next/navigation';

const usePageMarker = () => {
  const pathname = usePathname();
  const markedPage: number | null = getSessionStorage('page');

  const pageMarker = (currentPage: number) => {
    if (!pathname.includes('recipe')) return;
    setSessionStorage('page', currentPage);
  };

  const resetPageMarker = () => {
    sessionStorage.removeItem('page');
  };

  return { markedPage, pageMarker, resetPageMarker };
};

export default usePageMarker;
