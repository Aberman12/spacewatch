import React from "react";

const AllSavedIndividual = props => (
  <div className="savedArticleHole2">
    <a target="_blank" className="savedArticle" href={props.article.url}>
      <h4 className="articleTitle2">{props.article.title}</h4>
      <div className="letsTryThis">
        <img className="savedImg" src={props.article.img1} />
      </div>
    </a>
    <button
      className="remove"
      type="submit"
      onClick={() => props.deleter(props.article)}
    >
      <span className="icon">&#x2613;</span> Remove
    </button>
  </div>
);

export default AllSavedIndividual;
