import jwt_decode from "jwt-decode";

export const saveToken = (token) => {
  localStorage.setItem("Aid-Auth", token);
};

export const setAuthToken = () => {
  return `Bearer ${localStorage.getItem("Aid-Auth")}`;
};

export const getToken = () => {
  return localStorage.getItem("Aid-Auth");
};

export const isLoggedIn = () => {
  if (getToken() === null || getToken() === undefined || getToken() === "") {
    return false;
  }

  try {
    let { exp } = jwt_decode(getToken());
    if (exp < Math.ceil(new Date().getTime() / 1000)) {
      localStorage.removeItem("Aid-Auth");
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

export const getUser = () => {
  const { user_id, firstname, lastname } = jwt_decode(getToken());
  return { user_id, firstname, lastname };
};

export const waitTime = (updated_at) => {
  const milliseconds = new Date().getTime() - new Date(updated_at);
  const hour = Number(Math.floor(milliseconds / 1000 / 60 / 60));
  if (hour > 24) {
    return true;
  } else {
    return false;
  }
};
