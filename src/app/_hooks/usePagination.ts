import { verifyNumber } from '@/util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useState } from 'react';

const usePagiantion = ({
  currentPage,
  setCurrentPage,
  limit,
  totalElement,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  limit: number;
  totalElement: number;
}) => {
  const totalPage = Math.ceil(totalElement / limit);

  const [inputValue, setInputValue] = useState(currentPage?.toString() || '1');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearchParams = searchParams.toString();

  const setUrlSearchParams = useCallback((currentPage: number) => {
    const searchParams = new URLSearchParams(currentSearchParams);
    searchParams.set('page', String(currentPage));
    router.push(`${pathname}?${searchParams.toString()}`);
  }, []);

  const onPageChange = useCallback((text: string) => {
    const value = text.trim().replace(/[^\d]+/g, '');
    setInputValue(value);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const verifiedValue = verifyNumber(inputValue, totalPage, currentPage);
        setCurrentPage(verifiedValue);
        setUrlSearchParams(verifiedValue);
      }
    },
    [currentPage]
  );

  const onBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const verifiedValue = verifyNumber(e.target.value, totalPage, currentPage);
      setCurrentPage(verifiedValue);
      setUrlSearchParams(verifiedValue);
    },
    [currentPage]
  );

  const prev = (currentPage: number) => {
    if (currentPage <= 1) return;
    setInputValue((currentPage - 1).toString());
    setCurrentPage((prev) => prev - 1);
    setUrlSearchParams(currentPage - 1);
  };

  const next = (currentPage: number) => {
    if (currentPage >= totalPage) return currentPage;
    setInputValue((currentPage + 1).toString());
    setCurrentPage((prev) => prev + 1);
    setUrlSearchParams(currentPage + 1);
  };

  const moveToFirst = () => {
    setInputValue('1');
    setCurrentPage(1);
    setUrlSearchParams(1);
  };

  const moveToLast = () => {
    setInputValue(totalPage.toString());
    setCurrentPage(totalPage);
    setUrlSearchParams(totalPage);
  };

  useEffect(() => {
    const pageParams = Number(searchParams.get('page'));
    if (pageParams > 0 && pageParams !== currentPage) {
      setCurrentPage(pageParams);
      setInputValue(pageParams.toString());
    }
  }, [currentPage, searchParams]);

  return {
    onPageChange,
    onKeyDown,
    onBlur,
    prev,
    next,
    moveToFirst,
    moveToLast,
    totalPage,
    inputValue,
    setInputValue,
  };
};

export default usePagiantion;
