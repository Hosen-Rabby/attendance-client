import axios from "../../utils/axios";

export const getRoutine = async () => {
  const response = await axios.get("routine");
  return response.data;
};

