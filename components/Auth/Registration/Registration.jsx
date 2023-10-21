import * as Yup from 'yup';
import { BsEyeSlash } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { useState } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';

import FormInput from 'form';
import Button from '../../Button/Button';

import { useAuth } from '../../../redux/auth/authSlice';
import { useRegisterMutation } from 'auth/authAPI';

import s from '../Style.module.scss';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your name')
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Please use only letters and numbers')
    .min(3, 'Must be 3 characters or more')
    .max(100, 'Must be no more than 100 characters '),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .min(10, 'Must be 10 characters or more')
    .max(63, 'Must be no more than 63 characters ')
    .matches(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]{2,}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Invalid email'
    ),
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

function Registration({ onClose, title }) {
  const { credentialsUpdate } = useAuth();
  const [register] = useRegisterMutation();
  const [eye, setEye] = useState('password');
  const [err, setErr] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
    },

    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      const loginFetch = async loginData => {
        try {
          const response = await register(loginData);
          if (response?.error?.status === 409) {
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
        name: values.name,
        phone: values.phone,
        email: values.email,
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
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <FormInput
          autoComplete="nope"
          label={{
            id: 'name',
            text: (
              <>
                <span className={s.formText}>Name</span>
                <span className={s.isRequiredField}> *</span>
              </>
            ),
          }}
          modifClasses={{ input: s.inputForm }}
          input={{
            type: 'text',
            value: formik.values.name,
            onChange: formik.handleChange,
          }}
          errorMessage={errors.name && touched.name ? errors.name : ''}
        />

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
            id: 'email',
            text: (
              <>
                <span className={s.formText}>Email</span>
                <span className={s.isRequiredField}> *</span>
              </>
            ),
          }}
          input={{
            value: formik.values.email,
            onChange: formik.handleChange,
          }}
          errorMessage={errors.email && touched.email ? errors.email : ''}
        />
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
            Зареєструвати
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
          <p className={s.textDiferent}>Якщо Ви зареєстровані? </p>
          <Button
            onClick={() => title('Вхід')}
            variant="icon"
            modifClass={s.helpButton}
          >
            <span className={s.line}>Login</span>
          </Button>
        </div>
      </form>
    </>
  );
}

export default Registration;
