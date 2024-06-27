'use client';
import { useRef } from 'react';

const ModalRoot = () => {
  const ref = useRef<HTMLDivElement>(null);

  return <div id="modalRoot" ref={ref} />;
};

export default ModalRoot;
