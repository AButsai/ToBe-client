import s from './styles/Button.module.scss';

const Button = ({
  className = '',
  type = 'button',
  onClick = () => {},
  children,
  disabled = false,
}) => {
  return (
    <button
      className={s[className]}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
