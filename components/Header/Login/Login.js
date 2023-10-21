import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import Modal from '../../Modal/Modal';
import Logout from '../../Auth/Logout/Logout';
import Button from '../../Button/Button';
import Registration from '../../Auth/Registration/Registration';
import LoginModal from '../../Auth/LoginModal/LoginModal';

import { getIsLogin, getName } from '../../../redux/auth/authSelectors';

import s from './Login.module.scss';

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState(null);
  const isLogin = useSelector(getIsLogin);
  const name = useSelector(getName);
  const handleOpen = text => {
    setToggle(true);
    setTitle(text);
  };

  const RenderSwitch = useCallback(() => {
    switch (title) {
      case 'Зареєструватись':
        return <Registration onClose={setToggle} title={setTitle} />;
      case 'Вхід':
        return <LoginModal onClose={setToggle} title={setTitle} />;
      case 'Вийти':
        return <Logout onClose={setToggle} />;
      default:
        return null;
    }
  }, [title]);

  return (
    <>
      {toggle ? (
        <Modal title={title} onClose={setToggle} modifClass={s.modalWidth}>
          <RenderSwitch />
        </Modal>
      ) : null}

      {!isLogin ? (
        <div className={s.buttonWrap}>
          <Button
            onClick={() => handleOpen('Зареєструватись')}
            modifClass={s.button}
            variant="icon"
          >
            <span className={s.text}>Зареєструватись</span>
          </Button>
          <span className={s.text}>/</span>
          <Button onClick={() => handleOpen('Вхід')} variant="icon">
            <span className={s.text}>Вхід</span>
          </Button>
        </div>
      ) : (
        <div className={s.isLoginContainer}>
          <Button
            onClick={() => handleOpen('Вийти')}
            variant="icon"
            modifClass={s.logout}
          >
            <span className={s.text}>Вийти</span>
          </Button>
          <p className={s.login}>
            <span className={s.initialAvatar}>
              {name.slice(0, 1).toUpperCase()}
            </span>
            <span className={s.userName}>{name}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
