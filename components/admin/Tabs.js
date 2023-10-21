import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { slugify } from '../../utils/slugify';

import s from './styles/Tabs.module.scss';

const TabsAdmin = ({ children, initialTab }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const router = useRouter();

  const handleClick = (e, newActiveClass) => {
    e.preventDefault();
    setActiveTab(slugify(newActiveClass));
  };

  useEffect(() => {
    if (initialTab.tab) {
      setActiveTab(initialTab.tab);
    }
  }, [initialTab.tab]);

  useEffect(() => {
    router.push(`${router.pathname}?tab=${slugify(activeTab)}`, undefined, {
      shallow: true,
    });
  }, [activeTab]);

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {children.map(tab => {
          const { label } = tab.props;
          return (
            <li
              className={slugify(label) === slugify(activeTab) ? s.current : ''}
              key={label}
            >
              <a href="#" onClick={e => handleClick(e, label)}>
                {' '}
                {label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className={s.content}>
        {children.map(one => {
          if (slugify(one.props.label) === slugify(activeTab)) {
            return <div key={one.props.label}>{one.props.children}</div>;
          }
        })}
      </div>
    </div>
  );
};

export default TabsAdmin;
