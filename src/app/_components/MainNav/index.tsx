'use client';
import Link from 'next/link';
import styles from './nav.module.scss';
import { usePathname } from 'next/navigation';

const nav = [
  { id: 1, title: '추천 레시피', path: '/recipe/recommend' },
  { id: 2, title: '종류별 보기', path: '/recipe' },
  { id: 3, title: '요리 후기', path: '/review' },
];

const MainNav = () => {
  const pathname = usePathname();

  return (
    <ul className={styles.nav}>
      {nav.map((item) => (
        <li key={item.id} className={pathname === item.path ? `${styles.active}` : ''}>
          <Link href={item.path}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MainNav;
