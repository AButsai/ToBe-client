import Button from './Button';
import RadioBox from './RadioBox';

import s from './styles/ContactItem.module.scss';

const roles = ['banned', 'user', 'super'];

const ContactItem = ({ contact, handleSubmit, setRole }) => {
  const { _id, name, phone, email, role } = contact;

  return (
    <li className={s.item}>
      <p className={s.text}>
        <span className={s.subText}>Name:</span> {name}
      </p>
      <p className={s.text}>
        <span className={s.subText}>Tel:</span> {phone}
      </p>
      <p className={s.text}>
        <span className={s.subText}>Email:</span> {email}
      </p>
      <p className={s.text}>
        <span className={s.subText}>Role:</span> {role}
      </p>
      <form className={s.form} onSubmit={e => handleSubmit(e, _id)}>
        <RadioBox setRole={setRole} roles={roles} title="Update Role" />
        <Button className="contactItemBtn" type="submit">
          Update Role
        </Button>
      </form>
    </li>
  );
};

export default ContactItem;
