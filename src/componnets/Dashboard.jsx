import React, { useState, useEffect } from "react";
import { LogoutUser, getCoordinates, getDashboardData } from "./APIHelper";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const [cityName, setCityName] = useState("");
  const [cityNameError, setCityNameError] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username") || "N/A";

  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  useEffect(() => {
    // First check localStorage contain token, if not then redirect to login page

    //
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    setLoading(true); // Set loading state to true when starting API call
    // Set deafult ahmedabad location.
    getDashboardData(23.0225, 72.5714)
      .then((res) => {
        setWeatherData(res);
      })
      .finally(() => setLoading(false)); // Set loading state to false when API call finishes
    var token = localStorage.getItem("token");
    if (token) {
      setLoading(true); // Set loading state to true when starting API call
      // Set deafult ahmedabad location.
      getDashboardData(23.0225, 72.5714)
        .then((res) => {
          setWeatherData(res);
        })
        .finally(() => setLoading(false)); // Set loading state to false when API call finishes
    } else {
      // token not found, rediret to login page.
      navigate("/");
    }
  }, []);

  // Logout Button Click
  const logoutUser = () => {
    LogoutUser().then((res) => {
      localStorage.removeItem("token");
      if (res) navigate("/", { replace: true });
      else return;
    });
  };

  // Search Result according to City Name
  const handleSearchCity = (e) => {
    e.preventDefault(); // Prevent form submission

    const trimmedCityName = cityName.trim();
    if (trimmedCityName) {
      setLoading(true); // Set loading state to true when starting API call
      getCoordinates(trimmedCityName)
        .then((res) => {
          setCityNameError("");
          getDashboardData(res[0], res[1]).then((res) => {
            setWeatherData(res);
          });
        })
        .catch((error) => {
          // console.error("Error getting coordinates:", error);
          if (
            error.message == "citynotFound" ||
            error.message == "Request failed with status code 400"
          ) {
            setCityNameError("Invalid City Name.");
            setWeatherData(null);
            console.log("Invalid City Name");
          }
        })
        .finally(() => setLoading(false)); // Set loading state to false when API call finishes
    }
  };

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const getWeatherIcon = (iconCode, size = "1x") => {
    return `http://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  };

  return (
    <div className="dashboard">
      {username ? (
        <div className="card">
          <div style={{ position: "relative" }}>
            <div className="card-header">
              {username && (
                <button
                  className="btnLogout"
                  title="Logout"
                  onClick={logoutUser}
                  style={{ position: "absolute", top: 35, right: 20 }}
                >
                  Logout
                </button>
              )}
              <h1>Hi, {username}</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSearchCity}>
                {/* Form for city search */}
                <input
                  onChange={(e) => setCityName(e.target.value)}
                  value={cityName}
                  className="searchCity"
                  type="text"
                  placeholder="Enter City Name"
                />
                <button type="submit" className="btnSearch">
                  Submit
                </button>
              </form>
              {cityNameError && <p style={{ color: "red" }}>{cityNameError}</p>}
              {loading ? (
                <div>Loading...</div> // Show loader while waiting for API response
              ) : (
                weatherData && (
                  <div>
                    <h2>
                      Weather in {weatherData.name}, {weatherData.sys.country}
                    </h2>
                    <h3> Date: {formattedDate}</h3>
                    <h3>
                      Day:{" "}
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </h3>
                    <div>
                      {weatherData.weather.map((weather) => (
                        <div key={weather.id}>
                          <img
                            src={getWeatherIcon(weather.icon, "2x")}
                            alt={weather.description}
                          />
                          <p>
                            Weather : <b> {weather.description} </b>
                          </p>
                        </div>
                      ))}
                    </div>
                    <p>
                      Temperature:{" "}
                      <b>{(weatherData.main.temp - 273.15).toFixed(2)} °C </b>
                    </p>
                    <p>
                      Feels Like:{" "}
                      <b>
                        {(weatherData.main.feels_like - 273.15).toFixed(2)} °C{" "}
                      </b>
                    </p>
                    <p>
                      Humidity: <b>{weatherData.main.humidity}% </b>{" "}
                    </p>
                    <p>
                      Wind Speed:{" "}
                      <b>{(weatherData.wind.speed * 3.6).toFixed(2)} km/h </b>
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <h2>Please Login First !!!</h2>
      )}
    </div>
  );
}

export default Dashboard;
