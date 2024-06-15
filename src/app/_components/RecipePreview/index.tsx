import { Recipe } from '@/app/type';
import Image from 'next/image';
import styles from './preview.module.scss';
import Link from 'next/link';

const RecipePreview = ({ item }: { item: Recipe }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.category} onClick={() => console.log(item.RCP_PAT2)}>
        {item.RCP_PAT2}
      </div>
      <Link href={`/recipe/${encodeURIComponent(encodeURIComponent(item.RCP_NM))}`}>
        <div className={styles.img}>
          <Image src={item.ATT_FILE_NO_MAIN} alt={item.RCP_NM} width={160} height={160} />
        </div>
        <p>{item.RCP_NM}</p>
      </Link>
    </div>
  );
};

export default RecipePreview;
