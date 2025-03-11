import React from "react";
import Loader from "react-js-loader";

const Loaders = () => {
  return (
    <div className="App">
      <div className="content">
        <div className="zoom-out">
          <div className="item h-28">
            <Loader type="box-rectangular" bgColor="#008000" color="#008000" size={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loaders;
