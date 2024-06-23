import { Recipe } from '@/app/type';
import Image from 'next/image';
import styles from './detail.module.scss';
import { User } from 'firebase/auth';
import LikeButton from '../LikeButton';

const RecipeDetail = ({
  recipe,
  manual,
  user,
}: {
  recipe: Recipe;
  manual: { index: number; text: string; img: string }[];
  user: User | null;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <div className={styles.image}>
          <div>
            <Image
              src={recipe.ATT_FILE_NO_MAIN}
              alt={recipe.RCP_NM}
              width={320}
              height={320}
              style={{ width: '320px', height: '320px' }}
            />
          </div>
          <h4>&lt;&nbsp;{recipe.RCP_NM}&nbsp;&gt;</h4>
        </div>
        <div className={styles.info}>
          <span>{recipe.RCP_PAT2}</span>
          <span>{recipe.RCP_WAY2}</span>
          <div>
            <p>{recipe.INFO_ENG}kcal</p>
            <table>
              <tbody>
                <tr>
                  <td>탄수화물(g)</td>
                  <td>단백질(g)</td>
                  <td>지방(g)</td>
                  <td>나트륨(g)</td>
                </tr>
                <tr>
                  <td>{recipe.INFO_CAR}</td>
                  <td>{recipe.INFO_PRO}</td>
                  <td>{recipe.INFO_FAT}</td>
                  <td>{recipe.INFO_NA}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {recipe.HASH_TAG !== '' && <i>{`#${recipe.HASH_TAG}`}</i>}
          <LikeButton item={recipe} user={user} />
        </div>
      </div>
      <hr />
      <div className={styles.manual}>
        <h5>재료</h5>
        <div>{recipe.RCP_PARTS_DTLS}</div>
        <h5>만드는 법</h5>
        <div className={styles.manualStep}>
          {manual.map((item) => (
            <div key={item.index} className={styles.manualItem}>
              <div>
                <Image src={item.img} alt={item.index.toString()} width={196} height={130} />
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        {recipe.RCP_NA_TIP !== '' && (
          <div className={styles.tip}>
            <i>저감 조리법 Tip</i>
            <p>{recipe.RCP_NA_TIP}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
