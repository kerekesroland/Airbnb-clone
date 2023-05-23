"use client";

import React, { useEffect } from "react";
import NoInfo from "./components/NoInfo/NoInfo";

interface IProps {
  error: Error;
}

const Error = ({ error }: IProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <NoInfo title="Something went wrong!" subtitle="Try reloading the page!" />
  );
};

export default Error;
