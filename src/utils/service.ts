import request from './request';

interface siteInfoType {
  slogan: string;
  copyright: string;
}
interface versionType {
  version: string;
  build_path: string;
  example_path: string;
  example_list: string;
}
export interface componentType {
  id: number;
  name: string;
  classname: string;
  description: string;
  npm_name: string;
  git_type: string;
  git_remote: string;
  git_owner: string;
  git_login: string;
  create_dt: string;
  update_dt: string;
  version: versionType[];
}

const getSiteInfo = async (): Promise<siteInfoType> => {
  return request({
    url: '/api/v1/componentSite',
  });
};
const getComponent = async (): Promise<componentType[]> => {
  return request({
    url: '/api/v1/components',
  });
};
export { getSiteInfo, getComponent };
