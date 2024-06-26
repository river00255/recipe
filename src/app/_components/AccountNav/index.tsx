'use client';
import Link from 'next/link';
import { useAuth } from '../AuthProvider';
import styles from './account.module.scss';

const AccountNav = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.account}>
      {!user ? (
        <button>
          <Link href={'/account/login'}>로그인</Link>
        </button>
      ) : (
        <ul>
          <li>
            <Link href={'/my'}>마이페이지</Link>
          </li>
          <li>
            <button onClick={() => logout()}>로그아웃</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AccountNav;
