import { useState } from 'react';

const usePagiantion = ({
  currentPage,
  limit,
  totalElement,
}: {
  currentPage: number;
  limit: number;
  totalElement: number;
}) => {
  const totalPage = Math.ceil(totalElement / limit);

  const [inputValue, setInputValue] = useState(currentPage.toString());

  const onPageChange = (text: string) => {
    const value = text.trim().replace(/[^\d]+/g, '');
    setInputValue(value);
  };

  const prev = (currentPage: number) => {
    if (currentPage <= 1) return currentPage;
    setInputValue((currentPage - 1).toString());
    return currentPage - 1;
  };

  const next = (currentPage: number) => {
    if (currentPage >= totalPage) return currentPage;
    setInputValue((currentPage + 1).toString());
    return currentPage + 1;
  };

  const moveToFirst = () => {
    setInputValue('1');
    return 1;
  };

  const moveToLast = () => {
    setInputValue(totalPage.toString());
    return totalPage;
  };

  return {
    onPageChange,
    prev,
    next,
    moveToFirst,
    moveToLast,
    totalPage,
    inputValue,
  };
};

export default usePagiantion;
