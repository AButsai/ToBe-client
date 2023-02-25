import s from '../Style.module.scss';
import * as Yup from 'yup';

import { BsEyeSlash } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { useState } from 'react';
import FormInput from 'form';
import { useFormik } from 'formik';
import Button from '../../Button';
import InputMask from 'react-input-mask';
import { useLoginMutation } from 'auth/authAPI';
import { useAuth } from '../../../redux/auth/authSlice';
import PropTypes from 'prop-types';

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please Enter your password')
    .min(5, 'Must be 8 characters or more')
    .max(30, 'Must be no more than 30 characters ')
    .matches(/[a-z]+/, 'Must contain one lowercase character')
    .matches(/[A-Z]+/, 'Must contain one uppercase character')
    .matches(/\d+/, 'Must contain one number')
    .matches(
      /^(?![.-]+)(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}/,
      'Must not contain spaces, and starts with - or .'
    ),
  phone: Yup.string().required('Please enter your phone'),
});

function LoginModal({ onClose, title }) {
  const { credentialsUpdate } = useAuth();
  const [login] = useLoginMutation();
  const [eye, setEye] = useState('password');
  const [err, setErr] = useState(null);

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },

    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      const loginFetch = async loginData => {
        try {
          const response = await login(loginData);
          if (response?.error?.status === 400) {
            console.log(response?.error?.status);
            throw new Error(response?.error?.data);
          } else {
            credentialsUpdate({
              user: response.data.data.user,
              token: response.data.data.user.token,
            });
            onClose(false);
            actions.resetForm();
          }
        } catch (error) {
          setErr(error.message);
          console.log(error.message);
        }
      };

      loginFetch({
        phone: values.phone,
        password: values.password,
      });
    },
  });

  const { errors, touched } = formik;

  const handleChangeEye = () => {
    if (eye === 'password') {
      setEye('text');
      return;
    }
    setEye('password');
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <InputMask
          mask="+38(099)999-99-99"
          value={formik.values.phone}
          onChange={formik.handleChange}
        >
          {() => (
            <FormInput
              label={{
                id: 'phone',
                text: (
                  <>
                    <span className={s.formText}>Phone</span>
                    <span className={s.isRequiredField}> *</span>
                  </>
                ),
              }}
              input={{
                value: formik.values.phone,
                onChange: formik.handleChange,
              }}
              errorMessage={errors.phone && touched.phone ? errors.phone : ''}
            />
          )}
        </InputMask>

        <FormInput
          label={{
            id: 'password',
            text: (
              <>
                <span className={s.formText}>Password</span>
                <span className={s.isRequiredField}> *</span>
              </>
            ),
          }}
          modifClasses={{ input: s.inputForm }}
          input={{
            type: `${eye}`,
            value: formik.values.password,
            onChange: formik.handleChange,
          }}
          children={
            formik.values.password ? (
              <span className={s.eyeWrap} onClick={handleChangeEye}>
                {eye === 'password' ? (
                  <BsEyeSlash className={s.eye} />
                ) : (
                  <BsEye className={s.eye} />
                )}
              </span>
            ) : null
          }
          errorMessage={
            errors.password && touched.password ? errors.password : ''
          }
        />

        {err && <p className={s.errorText}>{err}</p>}

        <div className={s.buttonWrap}>
          <Button variant="filled" modifClass={s.Button} type="submit">
            Ввійти
          </Button>
          <Button
            variant="filled"
            modifClass={s.Button}
            onClick={() => onClose(false)}
          >
            Відмінити
          </Button>
        </div>
        <div className={s.wrapDiferentModal}>
          <p className={s.textDiferent}>Якщо Ви не має аккаунта?</p>
          <Button
            onClick={() => title('Зареєструватись')}
            variant="icon"
            modifClass={s.helpButton}
          >
            <span className={s.line}>Registration</span>
          </Button>
        </div>
      </form>
    </>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.func,
};
export default LoginModal;
