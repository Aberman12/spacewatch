import React from "react";
import $ from "jquery";
import { RingLoader } from "react-spinners";
import ModalLoad from "../Modal/ModalLoad.jsx";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      show: false,
      displayInLoading: "Logging In..."
    };
    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    var username = this.state.username;
    var password = this.state.password;
    var here = this;
    if (!username.length || !password.length) {
      window.alert("Please fill out all forms below");
    } else {
      $.ajax({
        type: "GET",
        data: {
          username,
          password
        },
        url: "/api/profiles",
        success: data => {
          this.setState({ show: true, loading: true });
          setTimeout(() => {
            here.setState({ show: false, loading: false });
            here.props.history.push({
              pathname: "/homepage"
            });
          }, 1500);
        },
        error: err => {
          window.alert("Incorrect password or username");
        }
      });
    }
  }

  render() {
    document.body.style.background =
      'url("http://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2018/08/11/0/0/694940094001_5820730921001_5820731717001-vs.jpg?ve=1")';
    document.body.style.backgroundSize = "100%";
    return (
      <div>
        <ModalLoad show={this.state.show} handleClose={this.hideModal}>
          <h2>{this.state.displayInLoading}</h2>
          <hr className="hr-saved" />
          <div className="sweet-loading">
            <RingLoader
              className="ringloader"
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
        </ModalLoad>
        <h1 className="buttonera">SpaceWatch</h1>
        <h3 className="button1">Log In</h3>
        <div>
          <input
            className="username"
            onKeyUp={e => {
              this.setState({ username: e.target.value });
            }}
            type="text"
            placeholder="Username"
            required
          />{" "}
          <input
            className="password"
            onKeyUp={e => {
              this.setState({ password: e.target.value });
            }}
            type="password"
            placeholder="Password"
            required
          />{" "}
          <button
            className=" hoverBtn log-sign"
            onClick={() => this.logIn()}
            type="submit"
          >
            Log In
          </button>
        </div>
        <button className="hoverBtn to-log-sign" type="submit">
          <a onClick={() => this.props.history.push("/sign-up")}>
            {" "}
            Go to Sign-up -->{" "}
          </a>
        </button>
      </div>
    );
  }
}

export default LogIn;
