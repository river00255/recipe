'use client';
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get('type'));
  console.log(decodeURIComponent(String(searchParams.get('q'))));

  return <div></div>;
};

export default Search;
