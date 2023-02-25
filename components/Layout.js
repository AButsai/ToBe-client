import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import { getToken } from 'redux/auth/authSelectors';
import { useAuth } from 'redux/auth/authSlice';
import { useCurrentUserQuery } from 'redux/auth/authAPI';
import { useGetAllProductsQuery } from '../redux/product/productAPI';
import { useGetTimeWorkQuery } from '../redux/timeWork/timeWorkAPI';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const {
    data: userData,
    isError,
    isSuccess,
    isLoading,
  } = useCurrentUserQuery();

  const products = useGetAllProductsQuery(undefined, {
    skip: router.isFallback,
  });
  const timeWork = useGetTimeWorkQuery(undefined, {
    skip: router.isFallback,
  });

  const token = useSelector(getToken);
  const { credentialsUpdate } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      credentialsUpdate({ user: userData?.data?.user, token });
    }

    if (isError) {
      credentialsUpdate({
        user: null,
        token: null,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
