import getSiteInfo from '@/utils/service';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './index.less';
interface Props {
  name: string;
  children: ReactNode;
}

const HeaderLayous: React.FC<Props> = (props) => {
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
      <div>{props.children}</div>
      <div className={styles.footer}>{copyright}</div>
    </div>
  );
};
export default HeaderLayous;
