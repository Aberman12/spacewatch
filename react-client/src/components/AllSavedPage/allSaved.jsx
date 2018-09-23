import React from "react";
import AllSavedIndividual from "./AllSavedIndividual.jsx";

const AllSaved = props => (
  <div>
    <h4 className="titleish">Your Saved Articles</h4>
    <div className="allSavedArticles">
      {props.saved.map(article => {
        return (
          <AllSavedIndividual
            key={article._id}
            className="toTop"
            deleter={props.deleter.bind(this)}
            article={article}
          />
        );
      })}
    </div>
  </div>
);

export default AllSaved;
