import React, { ReactNode } from 'react';
import styles from './index.less';
interface Props {
  name: string;
  children: ReactNode;
}
const HeaderLayous: React.FC<Props> = (props) => {
  return (
    <div className={styles.normal}>
      <div className={styles.title}>页头</div>
      <div>{props.children}</div>
      <div className={styles.footer}>页脚</div>
    </div>
  );
};
export default HeaderLayous;
