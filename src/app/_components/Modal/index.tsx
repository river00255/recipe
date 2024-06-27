'use client';
import { ReactNode } from 'react';
import styles from './modal.module.scss';
import { createPortal } from 'react-dom';

const Modal = ({ children, isOpen, close }: { children: ReactNode; isOpen: boolean; close: () => void }) => {
  return isOpen
    ? createPortal(
        <div className={styles.modal} onClick={() => close()}>
          <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.querySelector('#modalRoot')!
      )
    : null;
};

export default Modal;
