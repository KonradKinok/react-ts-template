import { RotatingLines } from "react-loader-spinner";
import React from "react";
import "./Loader.scss";

interface LoaderProps {
  isLoaderVisible: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoaderVisible }) => {
  return (
    <>
      <div className="container">
        <RotatingLines
          visible={isLoaderVisible}
          width="96"
          strokeColor="#3f51b5"
          strokeWidth="5"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    </>
  );
};
