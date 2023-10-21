import s from './Error.module.scss';

const Error = () => {
  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <p className={s.title}>Щось пішло не так. Спробуйте пізніше!</p>
      </div>
    </section>
  );
};

export default Error;
