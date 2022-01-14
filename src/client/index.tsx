import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ThemeProvider } from "styled-components";

import { App } from "client/App";
import { theme } from "client/theme";

declare let window: { __REACT_QUERY_STATE__: DehydratedState };
const dehydratedState = window.__REACT_QUERY_STATE__;
const queryClient = new QueryClient();

ReactDOM.hydrate(
  <QueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Hydrate>
  </QueryClientProvider>,
  document.getElementById("app-root")
);
