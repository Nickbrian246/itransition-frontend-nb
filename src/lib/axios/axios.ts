import axios from "axios";
import { getAccessToken } from "@/utils/localstorage/localstorage";
axios.defaults.headers.common = { Authorization: `bearer ${getAccessToken()}` };
export default axios;
