import Axios from "axios";

const host = "your_host";

export function RegisterUser(username, password) {
  return new Promise((resolve, reject) => {
    Axios.post(host + "/api/registration", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.status === 201) {
          // console.log(response.data.token);
          resolve(response.data.token);
        } else {
          reject(new Error("Registration failed"));
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          reject(new Error("Conflict"));
        } else {
          reject(error);
        }
      });
  });
}

export function LoginUser(username, password) {
  return new Promise((resolve, reject) => {
    Axios.post(host + "/api/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.token);
        } else {
          reject(new Error("Login failed"));
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          reject(new Error("Unauthorized"));
        } else {
          reject(error);
        }
      });
  });
}

export function LogoutUser() {
  return new Promise((resolve, reject) => {
    Axios.post(host + "/api/logout")
      .then((response) => {
        if (response.status === 200) {
          resolve(true);
        } else {
          reject(new Error("Logout failed"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getDashboardData(lat, lon) {
  return new Promise((resolve, reject) => {
    Axios.post(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=your_app_id`
    )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Logout failed"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getCoordinates(cityName) {
  const resArr = [];
  return new Promise((resolve, reject) => {
    Axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=your_app_id`
    )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length != 0) {
            // console.log(`Lat --> ${response.data[0].lat}`);
            // console.log(`Long --> ${response.data[0].lon}`);
            resArr.push(response.data[0].lat);
            resArr.push(response.data[0].lon);
            resolve(resArr);
          } else {
            reject(new Error("citynotFound"));
          }
        } else {
          reject(new Error("failed"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
