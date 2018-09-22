import React from "react";
import $ from "jquery";
import LaunchInfo from "./LaunchInfo.jsx";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      weather: [
        {
          time: "",
          summary: "",
          cloudCover: "",
          visibility: ""
        }
      ]
    };
  }

  componentDidMount() {
    function predictSky(cb) {
      var lat;
      var lon;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("could not connect to geolocation");
      }

      function showPosition(position) {
        lat = position.coords.latitude.toString();
        lon = position.coords.longitude.toString();
        lat = Number(lat.slice(0, 9));
        lon = Number(lon.slice(0, 10));

        $.ajax({
          type: "GET",
          url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/037a7d22f3cdab131e7ccaf8f8c7d314/${lat},${lon}?exclude=daily,flags`,
          success: function(response) {
            cb(response.hourly.data);
          }
        });
      }
    }

    predictSky(data => {
      this.setState({ weather: data });
    });
  }

  changeWeatherHour(direction) {
    if (direction === "n") {
      if (this.state.counter < this.state.weather.length) {
        this.setState({ counter: this.state.counter + 1 });
      }
    } else {
      if (this.state.counter > 0) {
        this.setState({ counter: this.state.counter - 1 });
      }
    }
  }

  render() {
    return (
      <div className="tryit">
        <div className="weather">
          <button
            className="back"
            onClick={() => {
              this.changeWeatherHour("b");
            }}
          >
            {" "}
            &#60;{" "}
          </button>
          <button
            className="next"
            onClick={() => {
              this.changeWeatherHour("n");
            }}
          >
            {" "}
            &#62;{" "}
          </button>
          <div>
            <strong>
              {new Date(this.state.weather[this.state.counter].time * 1000)
                .toString()
                .substring(3, 21)}
            </strong>
          </div>
          <div>
            <p className="inside">Current Weather: </p>
            {this.state.weather[this.state.counter].summary}
          </div>
          <div>
            <p className="inside">Cloud-cover: </p>
            {this.state.weather[this.state.counter].cloudCover}
            /10
          </div>
          <div>
            <p className="inside">Sky Visibility: </p>
            {this.state.weather[this.state.counter].visibility}
            /10
          </div>
        </div>
        <LaunchInfo className="launchInfo" />
      </div>
    );
  }
}

export default Weather;
