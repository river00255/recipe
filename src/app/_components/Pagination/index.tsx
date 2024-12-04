import { Dispatch, SetStateAction } from 'react';
import styles from './page.module.scss';
import usePagiantion from '@/app/_hooks/usePagination';

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
  const { prev, next, moveToFirst, moveToLast, onPageChange, onKeyDown, onBlur, totalPage, inputValue, setInputValue } =
    usePagiantion({
      currentPage,
      setCurrentPage,
      limit,
      totalElement,
    });

  return (
    <div className={styles.page}>
      <button onClick={() => moveToFirst()} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button onClick={() => prev(currentPage)} disabled={currentPage === 1 || totalPage < 2}>
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
      <button onClick={() => next(currentPage)} disabled={currentPage === totalPage || totalPage < 2}>
        &gt;
      </button>
      <button onClick={() => moveToLast()} disabled={currentPage === totalPage}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagiantion;
