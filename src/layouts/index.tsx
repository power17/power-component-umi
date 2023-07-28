import { getSiteInfo } from '@/utils/service';
import React, { ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'umi';
import styles from './index.less';
interface Props {
  children: ReactNode;
}

const HeaderLayous: React.FC<Props> = () => {
  const [init, setInit] = useState(false);
  const [slogan, setSlogan] = useState('');
  const [copyright, setCopyright] = useState('');
  useEffect(() => {
    if (!init) {
      setInit(true);
      getSiteInfo()
        .then((data) => {
          setSlogan(data.slogan);
          setCopyright(data.copyright);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [init]);
  return (
    <div className={styles.normal}>
      <div className={styles.title}>{slogan}</div>
      <Outlet />
      <div className={styles.footer}>{copyright}</div>
    </div>
  );
};
export default HeaderLayous;
