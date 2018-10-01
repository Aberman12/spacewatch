import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { RingLoader } from "react-spinners";
import ModalLoad from "../Modal/ModalLoad.jsx";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      show: false,
      login: false,
      displayNote: "Creating Your Profile..."
    };
    this.findLogIn = this.findLogIn.bind(this);
    this.createLogin = this.createLogin.bind(this);
  }

  findLogIn() {
    var username = this.state.username;
    if (!username.length || !this.state.password.length) {
      window.alert("Please fill out all forms below");
    } else {
      $.ajax({
        type: "GET",
        data: {
          username
        },
        url: "/api/finder",
        success: data => {
          if (data === "account found") {
            window.alert("You alread have an account with us");
          } else if (data === "create account") {
            this.setState({ loading: true, show: true });
            this.createLogin();
          }
        },
        error: err => {
          console.log("error finding login in sign-in: ", err);
          window.alert("failed to create profile, please try again later");
        }
      });
    }
  }

  createLogin() {
    this.setState({ displayNote: "Setting Up Your Account..." });
    var here = this;
    axios
      .post("/api/profiles", {
        username: here.state.username,
        password: here.state.password
      })
      .then(function(response) {
        if (response) {
          setTimeout(() => {
            here.setState({ loading: false, show: false });
            here.props.history.push({
              pathname: "/homepage"
            });
          }, 1500);
        }
      })
      .catch(function(err) {
        here.setState({
          loading: false,
          show: false
        });
        setTimeout(() => {
          window.alert("failed to create acount, please try again later");
        }, 200);
      });
  }

  render() {
    document.body.style.background =
      'url("http://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2018/08/11/0/0/694940094001_5820730921001_5820731717001-vs.jpg?ve=1")';
    document.body.style.backgroundSize = "100%";
    return (
      <div>
        <ModalLoad show={this.state.show} handleClose={this.hideModal}>
          <h2>{this.state.displayNote}</h2>
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
        <h3 className="button1">Sign Up</h3>
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
            className="hoverBtn log-sign"
            onClick={() => this.findLogIn()}
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <button type="submit" className="to-log-sign">
          <Link to="/">Go to Log-In --></Link>
        </button>
      </div>
    );
  }
}

export default SignIn;
