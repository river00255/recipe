'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './category.module.scss';

const category = [
  { index: 1, name: '밥', path: encodeURIComponent('밥') },
  { index: 2, name: '국', path: encodeURIComponent('국') },
  { index: 3, name: '반찬', path: encodeURIComponent('반찬') },
  { index: 4, name: '일품', path: encodeURIComponent('일품') },
  { index: 5, name: '후식', path: encodeURIComponent('후식') },
];

const Category = ({ ...rest }: { [property: string]: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectCategory = (param: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('cat', param);
    searchParams.set('page', '1');
    router.push(`/recipe?${searchParams.toString()}`);
  };

  return (
    <ul className={styles.category}>
      <li
        onClick={() => {
          const searchParams = new URLSearchParams();
          searchParams.set('page', '1');
          router.push(`/recipe?${searchParams.toString()}`);
        }}
        data-type={!searchParams.get('cat') ? 0 : null}>
        전체
      </li>
      {category.map((item) => (
        <li
          key={item.index}
          onClick={() => selectCategory(item.path)}
          data-type={searchParams.get('cat') === item.path ? item.index : null}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Category;
