import classNames from 'classnames';
import PropTypes from 'prop-types';
import s from './FormInput.module.scss';

const FormInput = ({
  label,
  input,
  errorMessage = '',
  modifClasses = {},
  children,
  ...restProps
}) => {
  return (
    <div className={classNames(s.wrapper, modifClasses.wrapper)}>
      <input
        autoComplete="off"
        required="required"
        id={label.id}
        name={label.id}
        className={
          errorMessage
            ? classNames(s.input, s.invalid, modifClasses.input)
            : classNames(s.input, modifClasses.input)
        }
        type={input?.type ?? 'text'}
        placeholder={input?.placeholder ?? ''}
        onChange={input.onChange}
        value={input.value}
        {...restProps}
      />
      <p htmlFor={label.id} className={classNames(s.label, modifClasses.label)}>
        {label.text}
      </p>
      <span className={s.line}></span>

      {children}
      {errorMessage ? <span className={s.error}>{errorMessage}</span> : null}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.exact({
    id: PropTypes.string.isRequired,
    text: PropTypes.node.isRequired,
  }).isRequired,
  input: PropTypes.exact({
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
  modifClasses: PropTypes.exact({
    wrapper: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.string,
  }),
  spanStar: PropTypes.string,
  children: PropTypes.node,
};

export default FormInput;
