import axios from "axios";

const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllVideos = async () => {
  try {
    const res = await axios.get(`${baseURL}api/videos/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllStorybooks = async () => {
  try {
    const res = await axios.get(`${baseURL}api/storybooks/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/changeUserRole`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const removeUser = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/removeUser`);
    return res.data;
  } catch (error) {
    return null;
  }
};
