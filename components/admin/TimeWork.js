import { useState } from 'react';

import Input from './Input';
import Button from './Button';

import { useUpdateTimeWorkMutation } from '../../redux/timeWork/timeWorkAPI';

import s from './styles/TimeWork.module.scss';
import { useSelector } from 'react-redux';
import { getTimeWork } from '../../redux/timeWork/timeWorkSelectors';

const TimeWork = () => {
  const time = useSelector(getTimeWork);
  const [everyTime, setEveryTime] = useState('');
  const [weekendsTime, setWeekendsTime] = useState('');
  const [updateTimeWork] = useUpdateTimeWorkMutation();

  const handleClick = async () => {
    await updateTimeWork({ everyTime, weekendsTime });
    setEveryTime('');
    setWeekendsTime('');
  };

  return (
    <div className={s.wrap}>
      <div className={s.currentTime}>
        <p className={s.title}>Current working time</p>
        <p className={s.title}>Вс-Чт: {time.everyTime}</p>
        <p className={s.title}>Пт-Сб: {time.weekendsTime}</p>
      </div>

      <p className={s.title}>Update time work</p>
      <Input
        value={everyTime}
        setValue={setEveryTime}
        type="phone"
        mask="99:99-99:99"
        className="timeWork"
        label="Every time"
      />
      <Input
        value={weekendsTime}
        setValue={setWeekendsTime}
        type="phone"
        mask="99:99-99:99"
        className="timeWork"
        label="Weekends time"
      />
      <Button className="btnProduct" onClick={handleClick}>
        Update
      </Button>
    </div>
  );
};

export default TimeWork;
