import Navigation from '../Navigation/Navigation';
import s from './ModalNavigation.module.scss';

const ModalNavigation = ({ userStatus, handleMenu }) => {
  return (
    <section className={s.modal}>
      <div className={s.container}>
        <Navigation userStatus={userStatus} handleMenu={handleMenu}/>
      </div>
    </section>
  );
};

export default ModalNavigation;
