import { get, post } from "@/utils/fetch";
import title from "./main";
import datajson from "./data.json";

export function fetch(data: any) {
  return post(`${title}/getPageDesign`, data);
}

export function getAssemblyFetch(data: any) {
  if (parseInt(data.element_type) === 3) {
    return getPersonRule(data);
  } else {
    return get(`http://192.168.18.41:8081/getList`, data);
  }
}

export function getComponentInfoFetch(data: any) {
  return post(`http://192.168.18.41:8081/updateAnswer`, data);
}

export function addElementName(data: any) {
  return post(`http://192.168.18.41:8081/addElementName`, data);
}

export function setPageRule(data: any) {
  return post(`${title}/setPageRule/`, data);
}

export function setPersonRule(data: any) {
  return post(`${title}/setWorkRule/`, data);
}

export function getPersonRule(data: any) {
  return post(`${title}/getWorkRule/`, data);
}

export function getVersion(data: any) {
  return post(`${title}/getVersion`, data);
}

export function getVersionTar(data: any) {
  return post(`${title}/getVersionTar`, data);
}

export function setDeploy(data: any) {
  return post(`${title}/setDeploy`, data);
}

export function setMerge(data: any) {
  return post(`${title}/setMerge`, data);
}

export function getVersionEnv(data: any) {
  return post(`${title}/getVersion`, data);
}

export function getOnlineVer(data: any) {
  return post(`${title}/getOnlineVer`, data);
}