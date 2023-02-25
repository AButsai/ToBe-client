import { TextField, styled } from '@mui/material';
import InputMask from 'react-input-mask';

import firstCharToUpperCase from '../../utils/firstCharToUpperCase';

import s from './styles/Input.module.scss';

const CssTextField = styled(TextField)({
  '&': {
    width: '100% ',
  },
  '& label': {
    color: 'var(--color-tabs)',
  },
  '& label.Mui-focused': {
    color: 'var(--color-tabs)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--color-tabs)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--color-tabs)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-tabs)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-tabs)',
    },
  },
});

const Input = ({
  value,
  setValue,
  name = '',
  label = '',
  type = 'text',
  className = 'input',
  mask = '+38(099)999-99-99',
}) => {
  const handleChange = e => {
    const { value } = e.target;
    setValue(value);
  };

  if (type === 'phone') {
    return (
      <div className={s[className]}>
        <InputMask
          mask={mask}
          value={value}
          type={type}
          onChange={handleChange}
        >
          {() => (
            <CssTextField
              name={name}
              required
              label={firstCharToUpperCase(label)}
            />
          )}
        </InputMask>
      </div>
    );
  }

  return (
    <div className={s[className]}>
      <CssTextField
        value={value}
        name={name}
        label={firstCharToUpperCase(label)}
        type={type}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default Input;
