import { getComponent } from '@/utils/service';
import { EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Card, Col, Divider, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getGitUrl } from '../../utils';
import { componentType } from '../../utils/service';
import styles from './index.less';

const { Meta } = Card;
const { Search } = Input;
const HomePage: React.FC = () => {
  const [init, setInit] = useState(false);
  const [list, setList] = useState<componentType[]>([]);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (!init) {
      setInit(true);
      getComponent({ name })
        .then((data) => {
          setList(data);
          console.log(data);
        })
        .catch(() => {
          setList([]);
        });
    }
  }, [init, name]);

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

  function getPreviewUrl({
    name,
    version,
    path,
    file,
  }: {
    name: string;
    version: string;
    path: string;
    file: string;
  }) {
    console.log(name, version, path, file);
    return '';
  }
  function getLastPreviewUrl(item: componentType) {
    const lastVersion = item.version[0];
    const examplePath = lastVersion.example_path;
    let exampleFile = JSON.parse(`"${lastVersion.example_list}"`);
    exampleFile = Array.isArray(exampleFile) ? exampleFile[0] : exampleFile;
    return getPreviewUrl({
      name: item.classname,
      version: lastVersion.version,
      path: examplePath,
      file: exampleFile,
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Search
          placeholder="请输入组件名称"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={(value) => {
            setInit(false);
            setName(value);
          }}
        />
      </div>
      <Row gutter={16}>
        {list.map((item) => (
          <Col className={styles.col} key={item.id} span={6}>
            <Card
              style={{ height: 150 }}
              actions={[
                <EyeOutlined
                  key="setting"
                  onClick={() => {
                    window.open(getLastPreviewUrl(item));
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    history.push(
                      {
                        pathname: '/detail',
                        search: `?id=${item.id}`,
                      },
                      {
                        id: item.id,
                      },
                    );
                  }}
                />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <img
                    alt={item.name}
                    src={getAvatar(item).img}
                    style={getAvatar(item).style}
                    onClick={() => window.open(getGitUrl(item))}
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
