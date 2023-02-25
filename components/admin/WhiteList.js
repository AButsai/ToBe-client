import { useEffect, useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Input from './Input';
import Button from './Button';

import {
  useAddToListMutation,
  useDeleteFromListMutation,
  useGetWhiteListQuery,
} from '../../redux/admin/adminAPI';
import { normalizePhoneNumber } from '../../utils/normalizePhoneNumber.js';

import s from './styles/WhiteList.module.scss';

const WhiteList = () => {
  const [number, setNumber] = useState('');
  const [filterPhone, setFilterPhone] = useState([]);
  const { data = [], isSuccess } = useGetWhiteListQuery();
  const [addToList] = useAddToListMutation();
  const [deleteFromList] = useDeleteFromListMutation();

  useEffect(() => {
    const phones = data?.filter(phone =>
      normalizePhoneNumber(phone).includes(normalizePhoneNumber(number))
    );
    setFilterPhone(phones);
  }, [number, data]);

  const handleAdd = async () => {
    await addToList({ phone: number });
    setNumber('');
  };

  const handleDel = async number => {
    await deleteFromList({ phone: number });
    setNumber('');
  };

  return (
    <div className={s.wrapper}>
      <div className={s.inputWrap}>
        <Input
          value={number}
          setValue={setNumber}
          type="phone"
          label="Add/delete phone number for white list"
        />
        <Button className="add" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className={s.listWrap}>
        <ul className={s.list}>
          {filterPhone?.map(phone => (
            <li key={phone} className={s.item}>
              <p className={s.phone}>{phone}</p>
              <DeleteOutlineOutlinedIcon
                className={s.icon}
                onClick={() => handleDel(phone)}
              />
            </li>
          ))}
        </ul>
        <p className={s.totalContacts}>Контактов {filterPhone.length} шт.</p>
      </div>
    </div>
  );
};

export default WhiteList;
