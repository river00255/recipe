import Link from 'next/link';
import styles from './appBar.module.scss';

const SideAppBar = () => {
  return (
    <aside className={styles.container}>
      <h1>
        <Link href={'/'}>All Recipes</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href={'/'}>추천 레시피</Link>
          </li>
          <li>
            <Link href={'/'}>종류별 보기</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideAppBar;
