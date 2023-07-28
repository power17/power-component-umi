import request from './request';

interface siteInfoType {
  slogan: string;
  copyright: string;
}
export interface versionType {
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

export interface componentItemType {
  classname: string;
  create_by: string;
  create_dt: string;
  description: string;
  git_login: string;
  git_owner: string;
  git_remote: string;
  git_type: 'github';
  id: number;
  name: string;
  npm_name: string;
  npm_version: string;
  readme: string;
  status: number;
  update_by: string;
  update_dt: string;
  version: versionType[];
}
const getSiteInfo = async (): Promise<siteInfoType> => {
  return request({
    url: '/api/v1/componentSite',
  });
};
const getComponent = async (params: {
  name: string;
}): Promise<componentType[]> => {
  return request({
    url: '/api/v1/components',
    params,
  });
};
const getComponentItem = async (id: string): Promise<componentItemType> => {
  return request({
    url: `/api/v1/components/${id}`,
  });
};
export { getSiteInfo, getComponent, getComponentItem };
