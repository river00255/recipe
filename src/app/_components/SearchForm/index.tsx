'use client';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from './searchForm.module.scss';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const [type, setType] = useState('RCP_NM');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      const text = inputRef.current.value.trim();
      const searchParams = new URLSearchParams();
      searchParams.set('type', encodeURIComponent(type));
      searchParams.set('q', encodeURIComponent(text));
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <select defaultValue={type} onChange={(e) => setType(e.target.value)}>
        <option value="RCP_NM">메뉴명</option>
        <option value="RCP_PARTS_DTLS">재료명</option>
      </select>
      <input type="text" ref={inputRef} />
      <button>search</button>
    </form>
  );
};

export default SearchForm;
