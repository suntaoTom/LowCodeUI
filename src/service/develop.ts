import { get, post } from "@/utils/fetch";
import title from "./main";

export function getProjectData(data: any) {
  return post(`${title}/getDevProjectData`, data);
}

export function getComponentInfoFetch(data: any) {
  return post(`http://192.168.18.41:8081/updateAnswer`, data);
}
