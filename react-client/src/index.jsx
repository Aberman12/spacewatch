import React from "react";
import ReactDOM from "react-dom";
import "./file.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogIn from "./components/Authentication/Log-in.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import SignIn from "./components/Authentication/Sign-In.jsx";
import AllSavedPage from "./components/AllSavedPage/AllSavedPage.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      articles: [],
      isLoggedIn: false,
      username: "",
      password: "",
      searchTerm: "",
      saved: [],
      weather: {},
      searchedForArticles: "",
      onPublisherPage: false
    };
  }

  render() {
    return (
      <div className="start background">
        {
          <div>
            <Switch>
              <Route exact path="/" component={LogIn} />
              <Route exact path="/sign-up" component={SignIn} />
              <Route exact path="/homepage" component={Homepage} />
              <Route exact path="/homepage/:saved" component={AllSavedPage} />
            </Switch>
          </div>
        }
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
