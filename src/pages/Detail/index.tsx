import { copy, fromNow, getGitUrl, getNpmUrl, getPreviewUrl } from '@/utils';
import {
  CloudOutlined,
  CopyOutlined,
  EyeOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import showdown from 'showdown';
import {
  componentItemType,
  getComponentItem,
  versionType,
} from './../../utils/service';
import styles from './index.less';
const { Option } = Select;
interface previewType {
  name: string;
  index: string;
  file: string;
}
const DetailPage: React.FC = () => {
  const [init, setInit] = useState(false);
  const [data, setData] = useState<componentItemType>();
  const [version, setVersion] = useState<string>('');
  const [, setVersionData] = useState<versionType>(); // 版本号对象
  const [previewIndex, setPreviewIndex] = useState(0);
  const [preview, setPreview] = useState<previewType[]>([]);
  const [readme, setReadme] = useState('');

  useEffect(() => {
    const query = window.location.search;
    let id = '';
    if (query) {
      id = query.slice(1).split('=')[1];
    }
    if (!init && id) {
      setInit(true);
      getComponentItem(id).then((data: componentItemType) => {
        setData(data);
        setVersion(data.version[0].version);
        const converter = new showdown.Converter(),
          text = data.readme,
          html = converter.makeHtml(text);
        setReadme(html);
      });
    }
  }, [init]);

  useEffect(() => {
    if (data && version) {
      const versionData = data.version.find(
        (item) => item.version === version,
      ) as versionType;
      let versionPreview = JSON.parse(versionData.example_list);
      versionPreview = versionPreview.map((file: string, index: number) => ({
        name: `预览${index + 1}`,
        index,
        file: getPreviewUrl({
          name: data.classname,
          version: versionData.version,
          path: versionData.example_path,
          file: versionPreview[index],
        }),
      }));
      console.log(version, versionData, versionPreview, previewIndex);
      setVersionData(versionData);
      setPreview(versionPreview);
      setPreviewIndex(previewIndex);
    }
  }, [data, version, previewIndex]);
  function handleVersionChange(value: string) {
    setVersion(value);
  }
  function handlePreviewChange(value: number) {
    setPreviewIndex(value);
  }
  return (
    <div className={styles.container}>
      {data ? (
        <>
          <div className={styles.detailContainer}>
            <div className={styles.detailName}>
              组件名称：<span>{data.name}</span>
            </div>
            <Select
              value={version}
              style={{ marginLeft: 10, width: 120 }}
              bordered={false}
              onChange={handleVersionChange}
            >
              {data.version.map((item) => (
                <Option key={item.version} value={item.version}>
                  {item.version}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.detailDescription}>
            组件描述：<span>{data.description}</span>
          </div>
          <Divider></Divider>
          <div className={styles.detailTextContainer}>
            <p className={styles.detailText}>代码托管： {data.git_type}</p>
            <p className={styles.detailText}>上传用户： {data.git_login}</p>
            <p className={styles.detailText}>
              创建时间： {fromNow(data.create_dt)}
            </p>
            <p className={styles.detailText}>
              创建时间： {fromNow(data.update_dt)}
            </p>
          </div>
          <div className={styles.detailButton}>
            <Button
              type="primary"
              icon={<FileOutlined />}
              onClick={() => {
                window.open(getGitUrl(data));
              }}
            >
              查看源码
            </Button>
            <div>
              <Button
                className={styles.detailBtn}
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => {
                  window.open(preview[previewIndex].file);
                }}
              >
                组件预览
              </Button>
              <Select
                className={styles.detailPreview}
                value={previewIndex}
                bordered={false}
                onChange={handlePreviewChange}
              >
                {preview.map((item) => (
                  <Option key={item.name} value={item.index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Button
              className={styles.detailBtn}
              type="primary"
              icon={<CloudOutlined />}
              onClick={() => {
                window.open(getNpmUrl(data, version));
              }}
            >
              NPM仓库
            </Button>
          </div>
          <div className={styles.detailUseContainer}>
            <div className={styles.detailUseTitle}>
              <h2>在项目中使用</h2>
              <Divider></Divider>
              <div style={{ display: 'flex' }}>
                <p className={styles.detailCommand}>
                  pnpm install {data.classname}
                </p>
                <Button
                  onClick={() => {
                    copy(`pnpm install ${data.classname}`);
                    message.success('命令复制成功');
                  }}
                  type="text"
                  icon={<CopyOutlined />}
                >
                  复制命令
                </Button>
              </div>
            </div>
          </div>
          <Divider></Divider>
          <div
            className={styles.detailReadme}
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        </>
      ) : null}
    </div>
  );
};
export default DetailPage;
