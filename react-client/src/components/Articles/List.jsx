import React from "react";
import ListItem from "./ListItem.jsx";

const List = props => (
  <div className="button">
    {props.articles.map(article => (
      <ListItem
        key={article._id}
        save={props.save.bind(this)}
        article={article}
      />
    ))}
  </div>
);

export default List;
