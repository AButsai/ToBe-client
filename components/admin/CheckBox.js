import Checkbox from '@mui/material/Checkbox';

import firstCharToUpperCase from '../../utils/firstCharToUpperCase';

import s from './styles/CheckBox.module.scss';

const CheckBox = ({ checked, setChecked, label }) => {
  const ariaLabel = { inputProps: { 'aria-label': `Choose ${label}` } };
  const handleChange = e => {
    setChecked(e.target.checked);
  };
  return (
    <div className={s.checkBoxWrap}>
      <Checkbox
        {...ariaLabel}
        sx={{
          color: 'var(--color-tabs)',
          '&.Mui-checked': {
            color: 'var(--color-tabs)',
          },
        }}
        checked={checked}
        onChange={handleChange}
      />
      <span className={s.label}>{firstCharToUpperCase(label)}</span>
    </div>
  );
};

export default CheckBox;
