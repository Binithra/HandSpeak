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
    //API call
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

export const getCatoVideos = async (cato) => {
  try {
    const res = await axios.get(`${baseURL}api/videos/getCato/${cato}`);
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

export const getAllQuiz = async () => {
  try {
    const res = await axios.get(`${baseURL}api/quiz/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};


export const changingUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const saveNewVideo = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/videos/save`, { ...data });
    return (await res).data.savedVideo;
  } catch (error) {
    return null;
  }
};

export const saveNewStorybook = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/storybooks/save`, { ...data });
    return (await res).data.savedstorybooks;
  } catch (error) {
    return null;
  }
};

export const saveNewQuiz = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/quiz/save`, { ...data });
    return (await res).data.savedQuiz;
  } catch (error) {
    return null;
  }
};

export const deleteVideoById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/videos/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteStorybookById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/storybooks/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteQuizById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/quiz/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
