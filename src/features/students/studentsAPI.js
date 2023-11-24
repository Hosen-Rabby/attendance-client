import axios from "../../utils/axios";

export const getStudents = async () => {
  const response = await axios.get("users");
  return response.data;
};

