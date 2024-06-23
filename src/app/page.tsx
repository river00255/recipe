import Ranking from './_components/Ranking';
import SearchForm from './_components/SearchForm';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <h3>레시피 검색</h3>
      <div className={styles.search}>
        <SearchForm />
      </div>
      <Ranking />
    </main>
  );
}
