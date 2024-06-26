'use client';
import { SyntheticEvent, useRef } from 'react';
import styles from './login.module.scss';
import Link from 'next/link';
import { useAuth } from '@/app/_components/AuthProvider';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) return;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email.length > 0 && password.length > 0) {
      login(email, password);
    }
  };

  return (
    <div className={styles.login}>
      <h4>로그인</h4>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" name="email" ref={emailRef} />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" ref={passwordRef} />
        <button>로그인</button>
      </form>
      <Link href={'/account/register'}>가입하기</Link>
    </div>
  );
};

export default Login;
