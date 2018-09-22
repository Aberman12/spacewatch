import React from "react";
import AllSaved from "./allSaved.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import axios from "axios";
import $ from "jquery";

class AllSavedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: [],
      articles: []
    };

    this.logOut = this.logOut.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.delete = this.delete.bind(this);
    this.reLoadDel = this.reLoadDel.bind(this);
    this.undercaseWords = [
      "a",
      "an",
      "the",
      "for",
      "and",
      "nor",
      "but",
      "or",
      "yet",
      "so",
      "at",
      "around",
      "by",
      "after",
      "along",
      "from",
      "of",
      "on",
      "to",
      "with",
      "without",
      "by",
      "down",
      "in",
      "into",
      "like",
      "near",
      "off",
      "on",
      "onto",
      "over",
      "past",
      "to",
      "upon",
      "with"
    ];
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.setState({
        articles: this.props.location.state.articles
      });
    }

    $.ajax({
      type: "GET",
      url: "/api/savedArticles",
      success: data => {
        for (var i = 0; i < data.length; i++) {
          if (!data[i].title || !data[i].url) {
            data.splice(i, 1);
          }
        }
        if (data.length) {
          data = data.reverse();
        }
        this.setState({ saved: this.convertTitlesToProperCase(data) });
      },
      error: err => {
        console.log("error getting saved articles in AllSavedPage: ", err);
      }
    });
  }

  convertTitlesToProperCase(sortedArticles) {
    for (var s = 0; s < sortedArticles.length; s++) {
      var editedTitle;
      var titleToEdit = sortedArticles[s].title.toLowerCase();
      titleToEdit = titleToEdit.split(" ");
      for (var v = 0; v < titleToEdit.length; v++) {
        var shouldBeUndercase = false;
        for (var u = 0; u < this.undercaseWords.length; u++) {
          if (titleToEdit[v] === this.undercaseWords[u] && v !== 0) {
            shouldBeUndercase = true;
            break;
          }
        }
        if (!shouldBeUndercase) {
          if (titleToEdit[v] === "nasa") {
            titleToEdit[v] = "NASA";
          } else if (titleToEdit[v] === "spacex") {
            titleToEdit[v] = "SpaceX";
          } else if (titleToEdit[v] === "nasa's") {
            titleToEdit[v] = "NASA's";
          } else if (titleToEdit[v] === "spacex's") {
            titleToEdit[v] = "SpaceX's";
          } else {
            var firstLetter = titleToEdit[v].slice(0, 1).toUpperCase();
            titleToEdit[v] =
              firstLetter + titleToEdit[v].slice(1, titleToEdit.length - 1);
          }
        }
      }
      editedTitle = titleToEdit.join(" ");
      sortedArticles[s].title = editedTitle;
    }
    return sortedArticles;
  }

  reLoadDel(article) {
    var newSavedList = [];
    for (var i = 0; i < this.state.saved.length; i++) {
      if (this.state.saved[i].title === article.title) {
        newSavedList = this.state.saved;
        newSavedList.splice(i, 1);
        console.log("newSavedList: ", newSavedList);
        this.setState({ saved: newSavedList });
        break;
      }
    }
  }

  delete(article) {
    var here = this;
    axios
      .delete("/api/savedArticles", {
        params: {
          username: article.username,
          title: article.title
        }
      })
      .then(function(response) {
        if (response) {
          here.reLoadDel(article);
        }
      })
      .catch(function(err) {
        console.log("failed to delete article in AllSavedPage: ", err);
      });
  }

  logOut() {
    if (window.confirm("Are you sure you want to log out?")) {
      $.ajax({
        type: "GET",
        url: "/api/logout",
        success: data => {
          this.props.history.push("/");
        },
        error: err => {
          window.alert(
            "Oops! Failed to log out. Please try again or reload the page."
          );
        }
      });
    }
  }

  returnHome() {
    this.props.history.push({
      pathname: "/homepage",
      state: {
        articles: this.state.articles
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar logout={this.logOut} returnHome={this.returnHome} />
        <AllSaved saved={this.state.saved} deleter={this.delete} />
      </div>
    );
  }
}

export default AllSavedPage;
