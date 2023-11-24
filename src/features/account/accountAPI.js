import axios from "../../utils/axios";
export const getAccount = async () => {
  const response = await axios.get("users");
  return response.data;
};
