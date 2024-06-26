'use client';
import { useFormState } from 'react-dom';
import styles from './register.module.scss';
import { validateEmail, validatePassword } from '@/util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/app/_components/SnackbarProvider';

const signup = async (
  prevState: { email: boolean; password: boolean; passwordConfirm: boolean; username: boolean } | undefined,
  formData: FormData
) => {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const passwordConfirm = String(formData.get('passwordConfirm'));
  const username = String(formData.get('username'));
  const errors = { email: false, password: false, passwordConfirm: false, username: false };
  if (!validateEmail(email)) errors.email = true;
  if (!validatePassword(password)) errors.password = true;
  if (passwordConfirm.length < 1 || password !== passwordConfirm) errors.passwordConfirm = true;
  if (username.length < 1) errors.username = true;
  if (Object.values(errors).filter((error) => error === true).length > 0) {
    return errors;
  }
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => error);
};

const Register = () => {
  const router = useRouter();

  const [state, formAction] = useFormState(signup, undefined);

  const { show } = useSnackbar();

  useEffect(() => {
    if (state) {
      if (state.code) show(state.code);
      if (state.user) {
        show('가입 완료.');
        router.replace('/');
      }
    }
  }, [state]);

  return (
    <div className={styles.register}>
      <h4>회원가입</h4>
      <form className={styles.form} action={formAction}>
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" name="email" className={state?.email === true ? `${styles.error}` : ''} />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          className={state?.password === true ? `${styles.error}` : ''}
        />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          className={state?.passwordConfirm === true ? `${styles.error}` : ''}
        />
        <label htmlFor="username">이름</label>
        <input
          type="text"
          id="username"
          name="username"
          className={state?.username === true ? `${styles.error}` : ''}
        />
        <button>가 입</button>
      </form>
    </div>
  );
};

export default Register;
