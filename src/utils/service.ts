import request from './request';
interface siteInfoType {
  slogan: string;
  copyright: string;
}

const getSiteInfo = async (): Promise<siteInfoType> => {
  return request({
    url: '/api/v1/componentSite',
  });
};
export default getSiteInfo;
