import axios from "../../utils/axios";

export const getIndiAttend = async () => {
  const response = await axios.get("individualAttend");
  return response.data;
};

