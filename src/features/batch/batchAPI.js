import axios from "../../utils/axios";
export const getBatches= async () => {
  const response = await axios.get("batch");
  return response.data;
};
