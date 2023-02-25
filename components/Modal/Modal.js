import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import s from './Modal.module.scss';

const Modal = ({ title, children, onClose, modifClass = '' }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleKeyDown = useCallback(
    evt => {
      if (evt.code === 'Escape') {
        setIsBrowser(false);
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    ({ target, currentTarget }) => {
      if (target === currentTarget) {
        setIsBrowser(false);
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    setIsBrowser(true);
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const modalContent = (
    <div className={s.modOvelay} onClick={handleOverlayClick}>
      <div
        className={classNames({
          [s.styleMod]: true,
          [modifClass]: Boolean(modifClass),
        })}
      >
        <p className={s.title}>{title}</p>
        {children}
      </div>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

export default Modal;
