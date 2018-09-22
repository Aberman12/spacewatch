import React from "react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  render() {
    return (
      <div className="nav">
        <ul>
          <div className="navOptions">
            <li>
              <div className="dropdown2">
                <button className="dropbtn2">
                  <div className="divv" />
                  <div className="divv" />
                  <div className="divv" />
                </button>
                <div className="dropdown-content2">
                  <a>Settings (tba)</a>
                  <a onClick={() => this.props.logout()}>Log Out</a>
                </div>
              </div>
            </li>

            <li
              className="altButtons allSaved"
              onClick={() => {
                this.props.goToAllSaved();
              }}
            >
              Saved
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn">News</button>
                <div className="dropdown-content">
                  <p
                    className="navList"
                    onClick={() =>
                      this.props.publisherFunc("the-new-york-times")
                    }
                  >
                    New York Times
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("independent")}
                  >
                    Independent
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("techcrunch")}
                  >
                    TechCrunch
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("wired")}
                  >
                    Wired
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("new-scientist")}
                  >
                    New Scientist
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("mashable")}
                  >
                    Mashable
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("the-verge")}
                  >
                    The Verge
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("next-big-future")}
                  >
                    Next Big Future
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("cnn")}
                  >
                    CNN
                  </p>
                  <p
                    className="navList"
                    onClick={() =>
                      this.props.publisherFunc("the-washington-post")
                    }
                  >
                    The Washington Post
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("usa-today")}
                  >
                    USA Today
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("techradar")}
                  >
                    TechRadar
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("cbs-news")}
                  >
                    CBS News
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("business-insider")}
                  >
                    Business Insider
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("ars-technica")}
                  >
                    Ars Technica
                  </p>
                  <p
                    className="navList"
                    onClick={() => this.props.publisherFunc("bbc-news")}
                  >
                    BBC News
                  </p>
                  <p
                    className="navList"
                    onClick={() =>
                      this.props.publisherFunc("al-jazeera-english")
                    }
                  >
                    Al Jazeera
                  </p>
                </div>
              </div>
            </li>
          </div>
          <div>
            <input
              onKeyUp={e => {
                this.setState({ term: e.target.value });
              }}
              className="search"
              type="text"
              placeholder="Search relevant keywords"
            />
            <button
              className="searchbtn"
              type="submit"
              onClick={() => this.props.searchQuery(this.state.term)}
            >
              Search
            </button>
            <h1 className="spaceNav" onClick={() => this.props.returnHome()}>
              SpaceWatch
            </h1>{" "}
          </div>
        </ul>
      </div>
    );
  }
}

export default NavBar;
