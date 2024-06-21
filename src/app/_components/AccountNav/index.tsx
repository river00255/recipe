'use client';
import Link from 'next/link';
import { useAuth } from '../AuthProvider';
import styles from './account.module.scss';

const AccountNav = () => {
  const { user, login, logout } = useAuth();

  return (
    <div className={styles.account}>
      {!user ? (
        <button>
          <Link href={'/login'}>login</Link>
        </button>
      ) : (
        <button onClick={() => logout()}>logout</button>
      )}
    </div>
  );
};

export default AccountNav;
