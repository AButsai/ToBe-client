import Link from 'next/link';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';

import s from './SocialLinks.module.scss';

const SocialLinks = () => {
  return (
    <div className={s.container}>
      <h2 className="visually-hidden">Соціальні мережі</h2>
      <ul className={s.list}>
        <li>
          <Link
            href={'https://www.instagram.com/tobe_ua/'}
            className={s.link}
            target="_blank"
          >
            <span className="visually-hidden">instagram</span>
            <AiFillInstagram className={s.icon} />
          </Link>
        </li>
        <li>
          <Link
            href={'https://www.facebook.com/ToBeRest/'}
            className={s.link}
            target="_blank"
          >
            <span className="visually-hidden">facebook</span>
            <AiFillFacebook className={s.icon} />
          </Link>
        </li>
        <li>
          <Link
            href={'https://t.me/tobekyiv'}
            className={s.link}
            target="_blank"
          >
            <span className="visually-hidden">telegram</span>
            <FaTelegramPlane className={s.icon} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
