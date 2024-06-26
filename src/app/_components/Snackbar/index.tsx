import { useEffect } from 'react';
import styles from './snackbar.module.scss';

const Snackbar = ({
  message,
  show,
  close,
}: {
  message: string;
  show: (message: string) => void;
  close: () => void;
}) => {
  useEffect(() => {
    const setTimer = setTimeout(() => {
      close();
    }, 3000);

    return () => clearTimeout(setTimer);
  }, [show]);

  return (
    <div className={styles.snackbar}>
      <p>{message}</p>
      <button onClick={() => close()}>✕</button>
    </div>
  );
};

export default Snackbar;
