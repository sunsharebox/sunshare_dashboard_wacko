import axios from "axios";

// API Related Information
const BASE_URL = "https://api.sunshare.simonphilouze.fr/";
const QUIZ_BASE_URL = "http://192.168.184.111:8000/api/";
const endpoints = {
  REAL_TIME: "realtime",
  PREVISION: "prevision",
  QUIZ: "quizzes",
  TIPS: "tips"
};

const dummyTip = "In this post, you will discover 78 great quotes from successful people.  This can help you capture a little bit of their wisdom and get some great insight​s along the way."

/**
 * Perform a GET request using the [axios api]{@link https://github.com/axios/axios}
 * @param {string} path The URL path to be appended to the base server URL.
 * @param {object} params Optional: The URL parameters to be sent with the request.
 */
const fetchData = async (path, params = {}) => {
  // axios config options for making network requests
  const config = {
    baseURL: BASE_URL,
    params: {
      ...params
    }
  };

  return await axios.get(path, config);
};

/**
 * Perform a GET request using the [axios api]{@link https://github.com/axios/axios}
 * @param {string} path The URL path to be appended to the base server URL.
 * @param {object} params Optional: The URL parameters to be sent with the request.
 */
const fetchQuizData = async (path, params = {}) => {
  // axios config options for making network requests
  const config = {
    baseURL: QUIZ_BASE_URL,
    params: {
      ...params
    }
  };

  return await axios.get(path, config);
};

/**
 * Get real time data
 * @param {function} callback A Function to execute on the network response.
 */
export const getRealTimeData = async callback => {
  try {
    const raw = await fetchData(endpoints.REAL_TIME);
    const realtime = raw.data;
    const size = realtime.length - 1;
    callback(raw.data[size]);
  } catch (error) {
    //When there is an error send an empty array.
    callback([]);
  }
};

/**
 * Get prevision time data
 * @param {function} callback A Function to execute on the network response.
 */
export const getPrevisionData = async callback => {
  try {
    const raw = await fetchData(endpoints.PREVISION);
    callback(raw.data);
  } catch (error) {
    //When there is an error send an empty array.
    callback([]);
  }
};

/**
 * Get all quiz
 * @param {function} callback A Function to execute on the network response.
 */
export const getQuiz = async callback => {
  try {
    const raw = await fetchQuizData(endpoints.QUIZ);
    callback(raw.data["hydra:member"]);
  } catch (error) {
    //When there is an error send an empty array.
    callback([]);
  }
};

/**
 * Get a single quiz
 * @param {function} callback A Function to execute on the network response.
 */
export const getSingleQuiz = async (quizId, callback) => {
  const path = `endpoints.QUIZ/${quizId}`;
  try {
    const raw = await fetchQuizData(path);
    callback(raw.data["hydra:member"]);
  } catch (error) {
    //When there is an error send an empty array.
    callback([]);
  }
};

/**
 * Get all tips
 * @param {function} callback A Function to execute on the network response.
 */
export const getTips = async callback => {
  try {
    const raw = await fetchQuizData(endpoints.TIPS);
    callback(raw.data["hydra:member"]);
  } catch (error) {
    //When there is an error send an empty array.
    callback([{ content: dummyTip }]);
  }
};

/**
 * Get a single tip
 * @param {function} callback A Function to execute on the network response.
 */
export const getSingleTip = async (tipId, callback) => {
  const path = `endpoints.TIPS/${tipId}`;
  try {
    const raw = await fetchQuizData(path);
    callback(raw.data["hydra:member"]);
  } catch (error) {
    //When there is an error send an empty array.
    callback([]);
  }
};

