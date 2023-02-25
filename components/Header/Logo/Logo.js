import Link from 'next/link';
import MobileMenu from '../MobileMenu/MobileMenu';
import Login from '../Login/Login';
import LogoIMG from '/public/logo.svg';

import s from './Logo.module.scss';

const Logo = ({
  isMobileScreen,
  userStatus,
  isLogin,
  openModal,
  setOpenModal,
}) => {
  return (
    <div className={s.container}>
      <div className={s.logoWrap}>
        <Link href={'/'} className={s.logo}>
          <span className="visually-hidden">Logo</span>
          <LogoIMG className={s.logoSvg} />
        </Link>
      </div>
      <div className={s.nameWrap}>
        <Link href={'/'}>
          <span className={s.logoName}>to be</span>
        </Link>
      </div>
      <div className={s.loginWrap}>
        {!isMobileScreen ? (
          <Login isLogin={isLogin} />
        ) : (
          <MobileMenu
            userStatus={userStatus}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default Logo;
