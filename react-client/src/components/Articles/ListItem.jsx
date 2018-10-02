import React from "react";
import Modal from "../Modal/Modal.jsx";

const altImages = [
  "https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/hs-2016-13-a-large_web.jpg?itok=z-fRZ7ww&fc=50,50",
  "https://i.ytimg.com/vi/lt0WQ8JzLz4/maxresdefault.jpg",
  "https://www.vasc.org/wp-content/themes/meridian/video/video-bg.jpg",
  "https://ei.marketwatch.com/Multimedia/2018/04/17/Photos/ZH/MW-GH505_sun_20180417154454_ZH.jpg?uuid=cd09a15c-4277-11e8-ad95-ac162d7bc1f7"
];
let count = 0;

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      email: "",
      subject: ""
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ subject: "", email: "" });
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h2>Send Article via Email</h2>
          <input
            className="username2"
            type="text"
            placeholder="Enter email (optional)"
            onKeyUp={e => {
              this.setState({ email: e.target.value });
            }}
          />{" "}
          <input
            className="password2"
            type="text"
            placeholder="Enter subject line"
            onKeyUp={e => {
              this.setState({ subject: e.target.value });
            }}
          />{" "}
          <a
            id="emailMe"
            href={
              "mailto:" +
              this.state.email +
              "?subject=" +
              encodeURIComponent(this.state.subject) +
              "&body=" +
              this.props.article.url
            }
          >
            <button className="create-new-message" type="submit">
              Create new message
            </button>
          </a>
        </Modal>
        <div className="divItem">
          <a target="_blank" className="anchor" href={this.props.article.url}>
            <h2 className="articleTitle">{this.props.article.title}</h2>
            <img
              className="img"
              src={this.props.article.urlToImage}
              onError={e => {
                e.target.src = altImages[count];
                count++;
                if (count === 3) {
                  count = 0;
                }
              }}
              alt="img could not be found"
            />
            <div>
              <p className="description"> {this.props.article.description}</p>
            </div>
          </a>
          <hr className="hr-btn" />
          <div className="buttons">
            <button className="btn1" onClick={this.showModal}>
              <span className="icon">&#x260E;</span> Share
            </button>
            <button
              onClick={() => this.props.save(this.props.article)}
              className="btn2"
            >
              <span className="icon">&#x2714;</span> Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;
