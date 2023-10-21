import { useState } from 'react';
import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

import s from './DropDownPhone.module.scss';

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const DropDownPhone = () => {
  const [phone, setPhone] = useState(false);

  const handleChange = e => {
    setPhone(!phone);
  };
  return (
    <>
      <div className={s.dropdown}>
        <button onClick={handleChange} className={s.phoneButton}>
          Зателефонуй нам
        </button>
        {phone && (
          <motion.div
            className={s.child}
            variants={variants}
            animate={phone ? 'open' : 'closed'}
          >
            <Link href="tel:+380634496607" className={s.link}>
              <FaPhoneAlt className={s.phoneSvg} />
              <span className={s.phone}>+38(063)449-66-07</span>
            </Link>
            <Link href="tel:+380442228944" className={s.link}>
              <FaPhoneAlt className={s.phoneSvg} />
              <span className={s.phone}>+38(044)222-89-44</span>
            </Link>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default DropDownPhone;
