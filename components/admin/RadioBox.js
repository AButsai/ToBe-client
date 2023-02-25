import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import firstCharToUpperCase from '../../utils/firstCharToUpperCase';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: 'var(--color-tabs)',
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'var(--color-tabs)',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      'radial-gradient(var(--bg-radio),var(--bg-radio) 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'var(--color-tabs)',
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const RadioBox = ({ setRole, roles, title }) => {
  const handleChange = event => {
    setRole(event.target.value);
  };
  return (
    <>
      <FormLabel sx={{ color: 'var(--color-tabs)' }}>{title}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        {roles.map(role => (
          <FormControlLabel
            key={role}
            value={role}
            control={<BpRadio />}
            label={firstCharToUpperCase(role)}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default RadioBox;
