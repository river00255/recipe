import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react';
import styles from './page.module.scss';
import usePagiantion from '@/app/_hooks/usePagination';
import { verifyNumber } from '@/util';

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
  const { prev, next, moveToFirst, moveToLast, onPageChange, totalPage, inputValue } = usePagiantion({
    currentPage,
    limit,
    totalElement,
  });

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const verifiedValue = verifyNumber(inputValue, totalPage, currentPage);
      setCurrentPage(verifiedValue);
    }
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const verifiedValue = verifyNumber(e.target.value, totalPage, currentPage);
    setCurrentPage(verifiedValue);
  };

  return (
    <div className={styles.page}>
      <button onClick={() => setCurrentPage(moveToFirst())} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button onClick={() => setCurrentPage(prev(currentPage))} disabled={currentPage === 1 || totalPage < 2}>
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
      <button onClick={() => setCurrentPage(next(currentPage))} disabled={currentPage === totalPage || totalPage < 2}>
        &gt;
      </button>
      <button onClick={() => setCurrentPage(moveToLast())} disabled={currentPage === totalPage}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagiantion;
