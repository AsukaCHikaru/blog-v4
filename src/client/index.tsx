import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { App } from "client/App";

declare let window: { __REACT_QUERY_STATE__: DehydratedState };
const dehydratedState = window.__REACT_QUERY_STATE__;
const queryClient = new QueryClient();

ReactDOM.hydrate(
  <QueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Hydrate>
  </QueryClientProvider>,
  document.getElementById("app-root")
);
