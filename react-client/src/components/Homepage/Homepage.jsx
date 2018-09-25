import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Weather from "../Weather&Launch-Apis/Weather.jsx";
import SavedList from "../SavedArticles/Saved.jsx";
import List from "../Articles/List.jsx";
import axios from "axios";
import $ from "jquery";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      articles: [],
      searchTerm: "",
      saved: [],
      launchInfo: []
    };

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getPublisherArticles = this.getPublisherArticles.bind(this);
    this.goToAllSaved = this.goToAllSaved.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
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
    this.titleWords = [
      "nasa",
      "asteroids",
      "meteor",
      "space",
      "galaxy",
      "alpha centauri",
      "intergalactic",
      "mars'",
      "mercury",
      "mercury's",
      "venus",
      "jupiter",
      "jupiter's",
      "venus's",
      "james webb",
      "cosmic",
      "comet",
      "earth's",
      "saturn",
      "saturn's",
      "beoing",
      "appollo",
      "orion",
      "hubble",
      "planet's",
      "astronomers",
      "astronomy",
      "space station",
      "telescope",
      "light year",
      "space shuttle",
      "space junk",
      "shooting star",
      "alien",
      "cosmos",
      "star system",
      "universe",
      "spaceship",
      "ufo",
      "cosmonaut",
      "earth's",
      "galactic",
      "rocket",
      "black hole",
      "lunar",
      "neutron star",
      "pulsar",
      "exoplanet",
      "astronaut",
      "spacex",
      "satellite",
      "launch",
      "launches",
      "moon",
      "planet",
      "mars",
      "sun",
      "nasa's",
      "interstellar",
      "spacex's",
      "blue origin",
      "blue origin's",
      "venus",
      "mercury",
      "jupiter",
      "europa",
      "iapetus",
      "uranus",
      "uranus rings",
      "neptune",
      "meteorite",
      "pluto"
    ];
    this.descriptionWords = [
      "nasa",
      "asteroid",
      "meteor",
      "galaxy",
      "light year",
      "alpha centauri",
      "mercury",
      "mercury's",
      "pulsar",
      "mars'",
      "jupiter",
      "jupiter's",
      "venus",
      "venus's",
      "outer space",
      "james webb",
      "cosmic",
      "passengers",
      "hubble",
      "appollo",
      "orion",
      "planet's",
      "astronomers",
      "space station",
      "astronomy",
      "comet",
      "space shuttle",
      "space junk",
      "universe",
      "cosmos",
      "spaceship",
      "star system",
      "earth's",
      "ufo",
      "cosmonaut",
      "galactic",
      "black hole",
      "lunar",
      "neutron star",
      "exoplanet",
      "astronaut",
      "spacex",
      "satellite",
      "moon",
      "planet",
      "mars",
      "nasa's",
      "interstellar",
      "spacex's",
      "blue origin",
      "blue origin's"
    ];
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.setState({
        articles: this.props.location.state.articles
      });
    }

    function getArticles(cb) {
      $.ajax({
        url:
          "https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=95ad6aec37fa45cbbe17f5af095be7ee",
        dataType: "json",
        success: function(response) {
          cb(response);
        }
      });
    }

    getArticles(value => {
      var val = value.articles;
      const sortedArticles = [];

      val = this.deleteAnyEmptyArticles(val);
      val = this.deleteAnyRepetitiveArticles(val);

      for (var i = 0; i < val.length; i++) {
        let lowerCase = val[i].title.toLowerCase();
        for (var j = 0; j < this.titleWords.length; j++) {
          if (
            lowerCase.includes(this.titleWords[j]) ||
            lowerCase.includes(this.titleWords[j] + "s")
          ) {
            var desLowerCase = val[i].description.toLowerCase();
            for (var a = 0; a < this.descriptionWords.length; a++) {
              if (
                desLowerCase.includes(this.descriptionWords[a]) ||
                desLowerCase.includes(this.descriptionWords[a] + "s")
              ) {
                sortedArticles.push(val[i]);
                break;
              }
            }
            break;
          }
        }
      }

      this.setState({
        articles: this.convertTitlesToProperCase(sortedArticles)
      });
    });

    if (!this.state.saved.length) {
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
          console.log(
            "failed to get saved articles from within Homepage: ",
            err
          );
        }
      });
    }
  }

  deleteAnyEmptyArticles(val) {
    for (var x = 0; x < val.length; x++) {
      if (
        val[x].title === undefined ||
        val[x].description === undefined ||
        val[x].urlToImage === undefined ||
        val[x].url === undefined
      ) {
        val.splice(x, 1);
      } else if (
        val[x].title === null ||
        val[x].description === null ||
        val[x].urlToImage === null ||
        val[x].url === null
      ) {
        val.splice(x, 1);
      }
    }
    return val;
  }

  deleteAnyRepetitiveArticles(val) {
    var compareObj = {};
    for (var a = 0; a < val.length; a++) {
      if (
        compareObj[val[a].title] === 1 ||
        compareObj[val[a].urlToImage] === 1
      ) {
        val.splice(a, 1);
      }
      if (
        compareObj[val[a].title] === undefined ||
        compareObj[val[a].urlToImage] === undefined
      ) {
        compareObj[val[a].title] = 1;
        compareObj[val[a].urlToImage] = 1;
      }
    }
    return val;
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

  getPublisherArticles(publisher) {
    $.ajax({
      url: `https://newsapi.org/v2/everything?q=space&sources=${publisher}&apiKey=95ad6aec37fa45cbbe17f5af095be7ee`,
      dataType: "json",
      success: value => {
        var val = value.articles;

        const sortedArticles = [];

        if (typeof response === "string") {
          response = JSON.parse(response);
        }

        val = this.deleteAnyEmptyArticles(val);

        val = this.deleteAnyRepetitiveArticles(val);

        if (publisher !== "ars-technica") {
          for (var i = 0; i < val.length; i++) {
            let lowerCase = val[i].title.toLowerCase();
            for (var j = 0; j < this.titleWords.length; j++) {
              if (
                lowerCase.includes(this.titleWords[j]) ||
                lowerCase.includes(this.titleWords[j] + "s")
              ) {
                var desLowerCase = val[i].description.toLowerCase();
                for (var a = 0; a < this.descriptionWords.length; a++) {
                  if (
                    desLowerCase.includes(this.descriptionWords[a]) ||
                    desLowerCase.includes(this.descriptionWords[a] + "s")
                  ) {
                    sortedArticles.push(val[i]);
                    break;
                  }
                }
                break;
              }
            }
          }
        }

        if (publisher === "ars-technica") {
          for (var d = 0; d < val.length; d++) {
            let description = val[d].description.toLowerCase();
            let title = val[d].title.toLowerCase();
            if (
              !description.includes("trump") &&
              !description.includes("pence") &&
              !description.includes("space force") &&
              !title.includes("trump") &&
              !title.includes("pence") &&
              !title.includes("space force")
            )
              sortedArticles.push(val[d]);
          }
        }
        this.setState({
          articles: this.convertTitlesToProperCase(sortedArticles)
        });
      }
    });
  }

  searchQuery(query) {
    var here = this;
    $.ajax({
      url: `https://newsapi.org/v2/everything?q=${query}&sources?language=en&apiKey=95ad6aec37fa45cbbe17f5af095be7ee`,
      dataType: "json",
      success: function(response) {
        var filteredArticles = [];
        query = query.toLowerCase();

        response = this.deleteAnyEmptyArticles(response);
        response = this.deleteAnyRepetitiveArticles(response);

        for (var i = 0; i < response.articles.length; i++) {
          var title = response.articles[i].title.toLowerCase();
          var desc = response.articles[i].description.toLowerCase();
          if (title.includes(query) || desc.includes(query)) {
            for (var j = 0; j < here.titleWords.length; j++) {
              if (
                title.includes(here.titleWords[j]) ||
                desc.includes(here.titleWords[j])
              ) {
                filteredArticles.push(response.articles[i]);
                break;
              }
            }
          }
        }
        if (filteredArticles.length) {
          here.setState({
            articles: here.convertTitlesToProperCase(filteredArticles)
          });
        } else {
          window.alert(`could not find articles relating to ${query}.`);
        }
      },
      error: err => {
        console.log("error getting publisher articles in Homepage", err);
        window.alert("Failed to get search results. Please try again later");
      }
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

  goToAllSaved() {
    if (this.state.saved.length) {
      this.props.history.push({
        pathname: "/homepage/:saved",
        state: {
          articles: this.state.articles
        }
      });
    } else {
      window.alert("It looks like you don't have any saved articles yet!");
    }
  }

  reLoadDel(article) {
    var newArticleList = [];
    for (var i = 0; i < this.state.saved.length; i++) {
      if (this.state.saved[i].title === article.title) {
        newArticleList = this.state.saved;
        newArticleList.splice(i, 1);
        this.setState({ saved: newArticleList });
        break;
      }
    }
  }

  reLoadSav(article) {
    var newAr = {
      username: this.state.username,
      password: this.state.password,
      title: article.title,
      description: article.description,
      url: article.url,
      img1: article.urlToImage
    };
    var ar = [newAr];
    var old = this.state.saved;
    this.setState({ saved: [].concat(ar, old) });
  }

  save(savedArticle) {
    const here = this;
    let isNew = true;
    for (var i = 0; i < this.state.saved.length; i++) {
      if (
        this.state.saved[i].title === savedArticle.title ||
        this.state.saved[i].url === savedArticle.url ||
        this.state.saved[i].urlToImage === savedArticle.urlToImage
      ) {
        isNew = false;
      }
    }

    if (isNew) {
      axios
        .post("/api/savedArticles", {
          title: savedArticle.title,
          description: savedArticle.description,
          url: savedArticle.url,
          img1: savedArticle.urlToImage
        })
        .then(function(response) {
          if (response) {
            here.reLoadSav(savedArticle);
          }
        })
        .catch(function(err) {
          window.alert(
            "Sorry! Looks like your article failed to save. Please try again later."
          );
        });
    } else {
      window.alert("Looks like you've already saved that article!");
    }
    isNew = true;
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
        console.log("failed to delete article inside Homepage: ", err);
        window.alert("Failed to delete article. Please try again later.");
      });
  }

  render() {
    document.body.style.background =
      'url("https://i.pinimg.com/originals/f7/10/6d/f7106d404afdfafd6da26fdc3a3f8bd5.jpg")';
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "100%";
    return (
      <div>
        <div>
          <NavBar
            searchQuery={this.searchQuery}
            publisherFunc={this.getPublisherArticles}
            goToAllSaved={this.goToAllSaved}
            logout={this.logOut}
          />
        </div>
        <h4 className="titleish"> Most Recently Published Articles </h4>
        <Weather className="weather1" />
        <SavedList
          deleter={this.delete}
          article={this.state.saved.slice(0, 10)}
        />
        <List
          save={this.save}
          articles={this.state.articles}
          items={this.state.items}
        />
      </div>
    );
  }
}

export default Homepage;
