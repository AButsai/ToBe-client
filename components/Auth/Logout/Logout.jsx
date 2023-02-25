import { useLazyLogoutQuery } from 'auth/authAPI';
import Button from '../../Button';

import s from '../Style.module.scss';
import { useAuth } from '../../../redux/auth/authSlice';
const Logout = ({ onClose }) => {
  const [logout] = useLazyLogoutQuery();
  const { credentialsUpdate } = useAuth();

  const handleLogout = () => {
    logout();
    credentialsUpdate({ user: null, token: null, isLogin: false });

    onClose(false);
  };

  return (
    <div className={s.buttonWrap}>
      <Button onClick={handleLogout} variant="filled" modifClass={s.Button}>
        Logout
      </Button>
      <Button
        onClick={() => onClose(false)}
        variant="filled"
        modifClass={s.Button}
      >
        Cancel
      </Button>
    </div>
  );
};

export default Logout;
