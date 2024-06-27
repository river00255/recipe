import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect } from 'react';
import styles from './page.module.scss';
import usePagiantion from '@/app/_hooks/usePagination';
import { verifyNumber } from '@/util';
import usePageMarker from '@/app/_hooks/usePageMarker';

const Pagiantion = ({
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
  const { prev, next, moveToFirst, moveToLast, onPageChange, totalPage, inputValue, setInputValue } = usePagiantion({
    currentPage,
    limit,
    totalElement,
  });

  const { markedPage, pageMarker, resetPageMarker } = usePageMarker();

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const verifiedValue = verifyNumber(inputValue, totalPage, currentPage);
      setCurrentPage(verifiedValue);
      pageMarker(verifiedValue);
    }
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const verifiedValue = verifyNumber(e.target.value, totalPage, currentPage);
    setCurrentPage(verifiedValue);
    pageMarker(verifiedValue);
  };

  useEffect(() => {
    markedPage == currentPage && currentPage.toString() !== inputValue && setInputValue(currentPage.toString());
  }, [currentPage, markedPage]);

  return (
    <div className={styles.page}>
      <button
        onClick={() => {
          setCurrentPage(moveToFirst());
          resetPageMarker();
        }}
        disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button
        onClick={() => {
          const page = prev(currentPage);
          setCurrentPage(page);
          pageMarker(page);
        }}
        disabled={currentPage === 1 || totalPage < 2}>
        &lt;
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onPageChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      &#47;
      <input type="text" value={totalPage < 1 ? 1 : totalPage} readOnly />
      <button
        onClick={() => {
          const page = next(currentPage);
          setCurrentPage(page);
          pageMarker(page);
        }}
        disabled={currentPage === totalPage || totalPage < 2}>
        &gt;
      </button>
      <button
        onClick={() => {
          const page = moveToLast();
          setCurrentPage(page);
          pageMarker(page);
        }}
        disabled={currentPage === totalPage}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagiantion;
