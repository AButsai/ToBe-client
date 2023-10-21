import { useEffect, useState } from 'react';

import Input from './Input';
import List from './List';
import ContactItem from './ContactItem';

import { normalizePhoneNumber } from '../../utils/normalizePhoneNumber';
import {
  useGetAllUsersQuery,
  useUpdateRoleUserMutation,
} from '../../redux/admin/adminAPI';

import s from './styles/Contacts.module.scss';

const Contacts = () => {
  const [value, setVelue] = useState('');
  const [role, setRole] = useState('');
  const [filterContact, setFilterContact] = useState([]);
  const [updateRoleUser] = useUpdateRoleUserMutation();
  const { data = [], isSuccess } = useGetAllUsersQuery();

  useEffect(() => {
    const contacts = data.users?.filter(contact =>
      normalizePhoneNumber(contact.phone).includes(normalizePhoneNumber(value))
    );
    setFilterContact(contacts);
  }, [value, data]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await updateRoleUser({ id, role: role });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.inputWrap}>
        <Input
          value={value}
          setValue={setVelue}
          type="phone"
          label="Search user by phone number"
        />
      </div>
      <div className={s.listWrap}>
        <List>
          {filterContact?.map(contact => (
            <ContactItem
              key={contact._id}
              contact={contact}
              handleSubmit={handleSubmit}
              setRole={setRole}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export default Contacts;
