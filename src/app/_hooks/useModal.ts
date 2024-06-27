import { useCallback, useState } from 'react';

const useModal = () => {
  const [popup, setPopup] = useState(false);

  const openModal = useCallback(() => setPopup(true), []);

  const closeModal = useCallback(() => setPopup(false), []);

  return { popup, openModal, closeModal };
};

export default useModal;
