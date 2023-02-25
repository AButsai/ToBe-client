import { Provider } from 'react-redux';
import { Roboto } from '@next/font/google';

import { store, wrapper } from '../redux/store';

import Layout from '../components/Layout';
import LayoutHead from '../components/LayoutHead';

import '../styles/globals.scss';

const roboto = Roboto({
  weight: ['400', '700'],
  preload: false,
});

const MyApp = ({ Component, ...rest }) => {
  const { props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Layout>
        <LayoutHead />
        <main id="up" className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </Provider>
  );
};

export default MyApp;
