import axios from "../../utils/axios";

export const getCourseTeacher = async (email) => {
  const response = await axios.get(`courseTeacher/:${email}`);
  return response.data;
};
