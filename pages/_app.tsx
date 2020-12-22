import React from "react";
import { wrapper } from "../store";

import type { AppProps /*, AppContext */ } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
