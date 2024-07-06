import axios from "axios";
import axiosInstance from "./axiosInstance";
import { handleError } from "./apiErrors";

export const loginApi = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/login", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postSignUp = async (data) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const getJobs = async (params) => {
  try {
    const response = await axiosInstance.get(
      `/job?applicationStatus=${params?.applicationStatus || ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const addJob = async (data) => {
  try {
    const response = await axiosInstance.post("/job", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editJob = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/job/${id}`, data);

    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axiosInstance.delete(`/job/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getConsultant = async (params) => {
  try {
    const response = await axiosInstance.get("/job", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const addConsultant = async (data) => {
  try {
    const response = await axiosInstance.post("/access-consultant", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editConsultant = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/edit-access/${id}`, data);

    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editProfile = async (data) => {
  try {
    const response = await axiosInstance.put("/profile", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getProfile = async (data) => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUsers = async (data) => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getConsultantList = async (data) => {
  try {
    const response = await axiosInstance.get("/marketers");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getJobsActive = async (params) => {
  try {
    const response = await axiosInstance.get(
      `/getJobs?searchText=${params.searchText}&location=${params.location}`,
      params
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
