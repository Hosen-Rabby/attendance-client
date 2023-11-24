import axios from "../../utils/axios";

export const getCourses = async () => {
  const response = await axios.get("courses");
  return response.data;
};

