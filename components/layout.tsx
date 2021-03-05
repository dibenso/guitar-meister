import React from "react";
import { APP_NAME } from "../constants";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <>
      <h2>{APP_NAME}</h2>
      {children}
    </>
  );
};

export default Layout;
