'use client';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './searchForm.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { addSearchString } from '@/app/_service/firestore';

const SearchForm = () => {
  const [type, setType] = useState('RCP_NM');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchText = searchParams.get('q');
  const searchType = searchParams.get('type');

  const { mutate } = useMutation({
    mutationFn: addSearchString,
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      const text = inputRef.current.value.trim();
      const searchParams = new URLSearchParams();
      searchParams.set('type', encodeURIComponent(type));
      searchParams.set('q', encodeURIComponent(text));
      mutate(text);
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    if (searchType) setType(String(searchType));
  }, [searchType]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <select defaultValue={searchType || type} onChange={(e) => setType(e.target.value)}>
        <option value="RCP_NM">메뉴명</option>
        <option value="RCP_PARTS_DTLS">재료명</option>
      </select>
      <input type="text" ref={inputRef} defaultValue={searchText ? decodeURIComponent(String(searchText)) : ''} />
      <button>검 색</button>
    </form>
  );
};

export default SearchForm;
