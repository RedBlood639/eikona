import React from "react";
import style from "./container.module.scss";

const Container = ({ children, container }: any) => {
  return (
    <>
      <div className={`${style.container} ${container}`}>{children}</div>
    </>
  );
};

export default Container;
