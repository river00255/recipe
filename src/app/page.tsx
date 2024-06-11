import SearchForm from './_components/SearchForm';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <h3>레시피 찾기</h3>
      <div className={styles.search}>
        <SearchForm />
      </div>
    </main>
  );
}
