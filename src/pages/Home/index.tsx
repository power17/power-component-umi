import { getComponent } from '@/utils/service';
import { EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import { componentType } from '../../utils/service';
import styles from './index.less';
const { Meta } = Card;
const HomePage: React.FC = () => {
  const [init, setInit] = useState(false);
  const [list, setList] = useState<componentType[]>([]);

  useEffect(() => {
    if (!init) {
      setInit(true);
      getComponent()
        .then((data) => {
          setList(data);
          console.log(data);
        })
        .catch(() => {
          setList([]);
        });
    }
  }, [init]);

  function getAvatar(item: componentType) {
    if (item.git_type === 'gitee') {
      return {
        img: 'https://gitee.com/static/images/logo-black.svg',
        style: { height: '20px', cursor: 'pointer' },
      };
    } else {
      return {
        img: 'https://www.youbaobao.xyz/arch/img/github.jpeg',
        style: { height: '40px', cursor: 'pointer' },
      };
    }
  }
  return (
    <div className={styles.container}>
      <Row gutter={16}>
        {list.map((item) => (
          <Col className={styles.col} key={item.id} span={24 / list.length}>
            <Card
              style={{ height: 150 }}
              actions={[
                <EyeOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <img
                    alt={item.name}
                    src={getAvatar(item).img}
                    style={getAvatar(item).style}
                  />
                }
                title={item.name}
                description={item.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Divider orientation="right">共四个组件</Divider>
    </div>
  );
};

export default HomePage;
