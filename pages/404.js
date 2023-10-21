import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Photo404 from '/public/404/404-photo.jpg';

import Container from '../components/Container';
import LayoutHead from '../components/LayoutHead';
import Section from '../components/Section/Section';

import s from '../styles/404.module.scss';
import { useEffect } from 'react';

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => router.push('/'), 500000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <Section>
      <Container>
        <LayoutHead title="404" />

        <div className={s.wrapper}>
          <Image
            className={s.img}
            src={Photo404}
            fill
            sizes="100%"
            alt="404 error image"
          />

          <div className={s.contentWrap}>
            <h2 className={s.title}>404</h2>
            <p className={s.text}>Такої сторінки не існує!</p>
            <Link href="/" className={s.link}>
              <KeyboardBackspaceIcon
                sx={{ fontSize: 'inherit', marginRight: '5px' }}
              />
              Повернутися на головну
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ErrorPage;
