import Link from 'next/link';
import styles from './appBar.module.scss';
import AccountNav from '../AccountNav';

const SideAppBar = () => {
  return (
    <aside className={styles.container}>
      <h1>
        <Link href={'/'}>All Recipes</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/recipe/recommend">추천 레시피</Link>
          </li>
          <li>
            <Link href="/recipe">종류별 보기</Link>
          </li>
          <li>
            <Link href="/review">요리 후기</Link>
          </li>
        </ul>
      </nav>
      <AccountNav />
    </aside>
  );
};

export default SideAppBar;
