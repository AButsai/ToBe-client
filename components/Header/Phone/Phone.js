import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';
import DropDownPhone from '../DropDownPhone/DropDownPhone';

import s from './Phone.module.scss';

const Phone = ({ isMobileScreen }) => {
  return isMobileScreen ? (
    <DropDownPhone/>
  ) : (
    <div className={s.container} id="headerPhone">
      <Link href="tel:+380442228944" className={s.link}>
        <FaPhoneAlt className={s.phoneSvg} />
        <span className={s.phone}>+38(044)222-89-44</span>
      </Link>
      <Link href="tel:+380634496607" className={s.link}>
        <FaPhoneAlt className={s.phoneSvg} />
        <span className={s.phone}>+38(063)449-66-07</span>
      </Link>
    </div>
  );
};

export default Phone;
