import axios from "../../utils/axios";
export const getAttend = async () => {
  const response = await axios.get("attendStudents");
  console.log(response);
  return response.data;
};
