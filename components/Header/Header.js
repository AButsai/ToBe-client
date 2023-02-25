import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { motion, useTransform, useScroll } from 'framer-motion';

import Logo from '../Header/Logo/Logo';
import Navigation from './Navigation/Navigation';
import Phone from '../Header/Phone/Phone';
import Login from '../../components/Header/Login/Login';

import { getRole } from 'auth/authSelectors';

import s from '../../styles/Header.module.scss';

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const Header = () => {
  const userRole = useSelector(getRole);
  const [isLogin, setIsLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const mob = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setIsMobileScreen(mob);
  }, [mob]);

  const { scrollY } = useScroll();
  const offsetY = [0, 174.5];
  const mobHeightSizes = [112, 0];
  const phoneHeight = [35, 0];

  const mobHeight = useTransform(scrollY, offsetY, mobHeightSizes);
  const phHeight = useTransform(scrollY, offsetY, phoneHeight);
  const headerOpacity = useTransform(scrollY, [115, 150], [1, 0.8]);
  const phoneOpacity = useTransform(scrollY, [35, 112], [1, 0]);
  const phoneContainerOpacity = useTransform(scrollY, [0, 35], [1, 0]);

  return (
    <motion.header
      className={s.header}
      variants={variants}
      animate={openModal ? 'open' : 'closed'}
      style={{
        opacity: headerOpacity,
      }}
    >
      {isMobileScreen ? (
        <motion.div
          style={{
            height: mobHeight,
            opacity: phoneContainerOpacity,
          }}
        >
          <motion.div
            className={s.topContainer}
            style={{
              height: phHeight,
              opacity: phoneOpacity,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Phone isMobileScreen={isMobileScreen} />
            <Login />
          </motion.div>
          <Logo
            openModal={openModal}
            setOpenModal={setOpenModal}
            isMobileScreen={isMobileScreen}
            isLogin={isLogin}
            userStatus={userRole}
          />
        </motion.div>
      ) : (
        <>
          <motion.div
            style={{
              height: mobHeight,
              opacity: phoneContainerOpacity,
            }}
          >
            <Phone />
            <Logo isLogin={isLogin} />
          </motion.div>
          <Navigation userStatus={userRole} />
        </>
      )}
    </motion.header>
  );
};

export default Header;
