import { Recipe } from '@/app/type';
import Image from 'next/image';
import styles from './preview.module.scss';
import Link from 'next/link';

const RecipePreview = ({ item }: { item: Recipe }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.category}>
        <Link href={`/recipe/?cat=${encodeURIComponent(encodeURIComponent(item.RCP_PAT2.split('&')[0]))}`}>
          {item.RCP_PAT2}
        </Link>
      </div>
      <Link href={`/recipe/${encodeURIComponent(encodeURIComponent(item.RCP_NM))}`}>
        <div className={styles.img}>
          {item.ATT_FILE_NO_MAIN.length < 1 ? (
            <div style={{ width: '160px', height: '160px', background: '#f5f5f5' }} />
          ) : (
            <Image
              src={item.ATT_FILE_NO_MAIN}
              alt={item.RCP_NM}
              width={160}
              height={160}
              style={{ width: '160px', height: '160px' }}
            />
          )}
        </div>
        <p>{item.RCP_NM}</p>
      </Link>
    </div>
  );
};

export default RecipePreview;
