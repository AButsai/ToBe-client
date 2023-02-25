import LayoutHead from '../LayoutHead';
import AsideAdmin from './AsideAdmin';

import s from './styles/LayoutAdmin.module.scss';

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <LayoutHead title="adminPanel" />
      <section className={s.section}>
        <div className={s.box}>{children}</div>
        <AsideAdmin />
      </section>
    </>
  );
};

export default LayoutAdmin;
