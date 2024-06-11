'use client';
import { SyntheticEvent } from 'react';
import styles from './searchForm.module.scss';

const SearchForm = () => {
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <select>
        <option>메뉴명</option>
        <option>재료명</option>
      </select>
      <input type="text" />
      <button>search</button>
    </form>
  );
};

export default SearchForm;
