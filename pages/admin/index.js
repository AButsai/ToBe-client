import { useSelector } from 'react-redux';
import { getRole } from 'auth/authSelectors';
import { useEffect } from 'react';
import { useState } from 'react';

import LayoutAdmin from '../../components/admin/LayoutAdmin';
import TabsAdmin from '../../components/admin/Tabs';

import Banner from '../../components/admin/Banner';
import Gallery from '../../components/admin/Gallery';
import Contacts from '../../components/admin/Contacts';
import WhiteList from '../../components/admin/WhiteList';

import s from '../../styles/AdminPanel.module.scss';

export default function AdminPanel({ query }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const role = useSelector(getRole);

  useEffect(() => {
    if (role === 'admin') {
      setIsAdmin(!isAdmin);
    }
  }, [role]);

  return (
    isAdmin && (
      <LayoutAdmin>
        <h2 className={s.title}>Admin Panel</h2>
        <TabsAdmin initialTab={query}>
          <div label="Banner">
            <Banner />
          </div>
          <div label="Gallery">
            <Gallery />
          </div>
          <div label="Contacts">
            <Contacts />
          </div>
          <div label="White List">
            <WhiteList />
          </div>
        </TabsAdmin>
      </LayoutAdmin>
    )
  );
}

AdminPanel.getInitialProps = ({ query }) => {
  return { query };
};
