import LogoSvg from '/public/logo.svg';

import s from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={s.loader}>
      <div className={s.logoWrap}>
        <LogoSvg className={s.logo} />
      </div>
    </div>
  );
}
