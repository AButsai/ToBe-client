import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineHome } from 'react-icons/ai';
import { BiDish } from 'react-icons/bi';
import { TfiGallery } from 'react-icons/tfi';
import { TfiComments } from 'react-icons/tfi';
import { BsKey } from 'react-icons/bs';
import { BsTornado } from 'react-icons/bs';
import { BsTelephone } from 'react-icons/bs';
import { Link as Scroll } from 'react-scroll';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

import s from './Navigation.module.scss';

const Navigation = ({ userStatus, handleMenu }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(true);
  const router = useRouter();

  const mob = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setIsMobileScreen(mob);

    let mounted = true;

    if (mounted && userStatus !== 'admin') {
      router.push('/');
    }

    return () => {
      mounted = false;
    };
  }, [mob, userStatus]);

  return (
    <>
      {isMobileScreen ? (
        <AnimatePresence>
          <motion.nav
            className={s.navigation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {router.pathname === '/' ? (
              <Scroll
                to="up"
                href="#up"
                className={s.item}
                offset={-250}
                onClick={handleMenu}
              >
                <AiOutlineHome />
                <span className={s.text}>Головна</span>
              </Scroll>
            ) : (
              <Link href={'/'} className={s.item} onClick={handleMenu}>
                <AiOutlineHome />
                <span className={s.text}>Головна</span>
              </Link>
            )}

            <Link
              href={'https://toberestaurant.choiceqr.com/'}
              className={s.item}
              target="_blank"
            >
              <BiDish />
              <span className={s.text}>Меню</span>
            </Link>
            <Link href={'/gallery'} className={s.item} onClick={handleMenu}>
              <TfiGallery />
              <span className={s.text}>Події</span>
            </Link>
            {router.pathname === '/' && (
              <>
                <Scroll
                  to="about"
                  href="#about"
                  className={s.item}
                  offset={-240}
                  onClick={handleMenu}
                >
                  <BsTornado />
                  <span className={s.text}>О нас</span>
                </Scroll>
                <Scroll
                  to="footer"
                  href="#footer"
                  className={s.item}
                  offset={-240}
                  onClick={handleMenu}
                >
                  <BsTelephone />
                  <span className={s.text}>Контакти</span>
                </Scroll>
              </>
            )}
            <Link
              href={'https://toberestaurant.choiceqr.com/feedback'}
              className={s.item}
              target="_blank"
            >
              <TfiComments />
              <span className={s.text}>Залишити відгук</span>
            </Link>

            {userStatus === 'admin' ? (
              <Link href={'/admin'} className={s.item}>
                <BsKey />
                <span className={s.text}>Admin page</span>
              </Link>
            ) : null}
          </motion.nav>
        </AnimatePresence>
      ) : (
        <nav className={s.navigation}>
          {router.pathname === '/' ? (
            <Scroll
              to="up"
              href="#up"
              className={s.item}
              offset={-250}
              onClick={handleMenu}
            >
              <span className={s.text}>Головна</span>
            </Scroll>
          ) : (
            <Link href={'/'} className={s.item} onClick={handleMenu}>
              <span className={s.text}>Головна</span>
            </Link>
          )}
          <Link
            href={'https://toberestaurant.choiceqr.com/'}
            className={s.item}
            target="_blank"
          >
            <span className={s.text}>Меню</span>
          </Link>
          <Link href={'/gallery'} className={s.item}>
            <span className={s.text}>Події</span>
          </Link>
          {router.pathname === '/' && (
            <>
              <Scroll to="about" href="#about" className={s.item} offset={-240}>
                <span className={s.text}>О нас</span>
              </Scroll>
              <Scroll
                to="footer"
                href="#footer"
                className={s.item}
                offset={-240}
              >
                <span className={s.text}>Контакти</span>
              </Scroll>
            </>
          )}

          <Link
            href={'https://toberestaurant.choiceqr.com/feedback'}
            className={s.item}
            target="_blank"
          >
            <span className={s.text}>Залишити відгук</span>
          </Link>
          {userStatus === 'admin' ? (
            <Link href={'/admin'} className={s.item}>
              <span className={s.text}>Admin page</span>
            </Link>
          ) : null}
        </nav>
      )}
    </>
  );
};

export default Navigation;
