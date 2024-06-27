import Link from 'next/link';
import styles from './appBar.module.scss';
import AccountNav from '../AccountNav';
import AuthProvider from '../AuthProvider';
import MainNav from '../MainNav';

const SideAppBar = () => {
  return (
    <aside className={styles.container}>
      <h1>
        <Link href={'/'}>All Recipes</Link>
      </h1>
      <nav>
        <MainNav />
      </nav>
      <AuthProvider>
        <AccountNav />
      </AuthProvider>
    </aside>
  );
};

export default SideAppBar;
