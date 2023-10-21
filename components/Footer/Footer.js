import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Link as Scroll } from 'react-scroll';
import { useRouter } from 'next/router';

import LogoIMG from '/public/logo.svg';
import SocialLinks from './SocialLinks/SocialLinks';
import Container from '../Container';

import { getTimeWork } from '../../redux/timeWork/timeWorkSelectors';

import s from './Footer.module.scss';

export function Footer() {
  const [date, setDate] = useState({
    everyDay: 'Вс-Ср',
    everyTime: '00:00-00:00',
    weekends: 'Пт-Сб',
    weekendsTime: '00:00-00:00',
  });

  const router = useRouter();

  const { everyDay, weekends, weekendsTime, everyTime } =
    useSelector(getTimeWork);

  useEffect(() => {
    if (
      everyDay !== undefined &&
      weekends !== undefined &&
      weekendsTime !== undefined &&
      everyTime !== undefined
    ) {
      setDate({ everyDay, weekends, weekendsTime, everyTime });
    }
  }, [everyDay, weekends, weekendsTime, everyTime]);

  return (
    <>
      <footer className={s.footer} id="footer">
        <Container>
          <div className={s.footerLogo}>
            <Link
              className={s.logoLink}
              href="https://www.google.com.ua/maps/place/%D1%83%D0%BB.+%D0%92%D0%B5%D1%80%D1%85%D0%BD%D0%B8%D0%B9+%D0%92%D0%B0%D0%BB,+2%D0%90,+%D0%9A%D0%B8%D0%B5%D0%B2,+04071/@50.4627786,30.5057181,17z/data=!3m1!4b1!4m5!3m4!1s0x40d4ce69703c6fd3:0x10d3f246512fb57c!8m2!3d50.4627752!4d30.5079069?hl=ru"
              target="_blank"
              title="Карта"
            >
              <LogoIMG className={s.logo} />
              <span className={s.logoText}>Подивитися на карті</span>
            </Link>
          </div>
          <div className={s.content}>
            <div className={s.addressWrap}>
              <address className={s.address}>
                <span className={s.addressText}>Київ</span>
                <span className={s.addressText}>вул. Верхній Вал 2а</span>
                <span className={s.addressText}>ст.м. Контрактова площа</span>
                <span className={s.addressText}>
                  {date.everyDay} : {date.everyTime}
                </span>
                <span className={s.addressText}>
                  {date.weekends} : {date.weekendsTime}
                </span>
              </address>
              <nav className={s.nav}>
                {router.pathname === '/' ? (
                  <Scroll
                    to="up"
                    href="#up"
                    className={s.navItem}
                    offset={-250}
                  >
                    Головна
                  </Scroll>
                ) : (
                  <Link href={'/'} className={s.navItem}>
                    Головна
                  </Link>
                )}

                <Link
                  href={'https://toberestaurant.choiceqr.com/'}
                  className={s.navItem}
                  target="_blank"
                >
                  Меню
                </Link>
                <Link
                  href={'https://toberestaurant.choiceqr.com/feedback'}
                  className={s.navItem}
                  target="_blank"
                >
                  Залишити відгук
                </Link>
                <Link href={'/gallery'} className={s.navItem}>
                  Події
                </Link>
              </nav>
            </div>
            <div className={s.linksWrap}>
              <Link href="tel:+380442228944" className={s.addressPhone}>
                +38(044)222-89-44
              </Link>
              <Link href="tel:+380634496607" className={s.addressPhoneMB}>
                +38(063)449-66-07
              </Link>
              <SocialLinks />
            </div>
          </div>
        </Container>
      </footer>
      <div className={s.copyright}>
        <p className={s.copyrightText}>Зв'язатися з командою розробників</p>
        <Link href={'#'} className={s.copyrightLink}>
          Link
        </Link>
      </div>
    </>
  );
}

export default Footer;
