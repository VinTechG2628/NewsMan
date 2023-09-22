import React from "react";
import loaded from "../img/spinner.gif";

const Spinner = () => {
  return (
    <>
      <div className="text-center">
        <img
          src={loaded}
          alt="loading"
          className="my-3"
          style={{ width: "2.5rem" }}
        />
      </div>
    </>
  );
};

export default Spinner;
