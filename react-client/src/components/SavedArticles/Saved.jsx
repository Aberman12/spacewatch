import React from "react";
import Article from "./Article.jsx";

const SavedList = props => (
  <div className="savedList">
    <h3 className="savedTitle">Saved Articles</h3>
    {props.article.map(article => (
      <Article deleter={props.deleter} key={article._id} article={article} />
    ))}
  </div>
);

export default SavedList;
