import s from './styles/List.module.scss';

const List = ({ children }) => {
  return <ul className={s.list}>{children}</ul>;
};

export default List;
