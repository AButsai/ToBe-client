import Clock from './Clock';
import TimeWork from './TimeWork';

import s from './styles/AsideAdmin.module.scss';

const AsideAdmin = () => {
  return (
    <aside className={s.aside}>
      <Clock />
      <TimeWork />
    </aside>
  );
};

export default AsideAdmin;
