import React from "react";

const ModalLoad = ({ show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="ModalLoad-main">{children}</section>
    </div>
  );
};

export default ModalLoad;
