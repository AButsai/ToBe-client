import Image from 'next/image';

import ModalNavigation from '../ModalNavigation/ModalNavigation';

import s from './MobileMenu.module.scss';

const MobileMenu = ({ userStatus, openModal, setOpenModal }) => {
  const handleMenu = () => {
    setOpenModal(!openModal);
    openModal
      ? (document.body.style.overflow = 'visible')
      : (document.body.style.overflow = 'hidden');
  };

  return (
    <>
      {openModal ? (
        <>
          <div className={s.container}>
            {openModal ? (
              <>
                <Image
                  onClick={handleMenu}
                  src="/close.svg"
                  alt="closeModal"
                  width="50"
                  height="40"
                  className={s.iconMenu}
                />
                <ModalNavigation
                  userStatus={userStatus}
                  handleMenu={handleMenu}
                />
              </>
            ) : (
              <Image
                onClick={handleMenu}
                src="/menu.svg"
                alt="menu"
                width="50"
                height="45"
                className={s.iconClose}
              />
            )}
          </div>
        </>
      ) : (
        <Image
          onClick={handleMenu}
          src="/menu.svg"
          alt="menu"
          width="50"
          height="45"
          className={s.iconClose}
        />
      )}
    </>
  );
};

export default MobileMenu;
