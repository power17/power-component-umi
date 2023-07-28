import moment from 'moment';
import { componentType } from './service';
export function fromNow(timestamp: string) {
  const date = new Date(+timestamp);
  return moment(date).fromNow();
}
export function getGitUrl(item: componentType) {
  return `https://${item.git_type}.com/${item.git_login}/${item.classname}`;
}
interface previewType {
  name: string;
  version: string;
  path: string;
  file: string;
}
export function getPreviewUrl(preview: previewType) {
  console.log(preview);
}
/**
 * 获取npm地址
 * @param item
 * @param version
 * @returns
 */
export function getNpmUrl(item: componentType, version: string) {
  if (version) {
    return `https://www.npmjs.com/package/${item.classname}/v/${version}`;
  } else {
    return `https://www.npmjs.com/package/${item.classname}`;
  }
}

export async function copy(command: string) {
  if (navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(command);
  } else {
    // 旧
    const input = document.createElement('input');
    input.value = command;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    input.className = 'input';
    input.style.display = 'none';
  }
}
