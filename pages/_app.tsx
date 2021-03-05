import React from "react";
import "tailwindcss/tailwind.css";
import { wrapper } from "../store";

import type { AppProps } from "next/app";

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default wrapper.withRedux(App);
