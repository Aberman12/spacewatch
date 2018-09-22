import React from "react";

const Article = props => (
  <div className="savedArticleHole">
    <a target="_blank" className="savedArticle" href={props.article.url}>
      <div>
        <h4 className="articleTitle">{props.article.title}</h4>
        <img className="savedImg" src={props.article.img1} />
      </div>
    </a>
    <button
      className="remove"
      type="submit"
      onClick={() => {
        props.deleter(props.article);
      }}
    >
      <span className="icon">&#x2613;</span> Remove
    </button>
    <hr className="hr-saved" />
  </div>
);

export default Article;
