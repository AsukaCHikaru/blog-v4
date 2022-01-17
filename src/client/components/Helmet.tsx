import * as React from "react";
import { Helmet as ReactHelmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { PostSummary } from "client/types";

interface OwnProps {
  postSummary?: PostSummary;
}

export const Helmet: React.VFC<OwnProps> = ({ postSummary }) => {
  const location = useLocation();

  const title =
    (postSummary ? `${postSummary.title} | ` : "") + "The work is undone.";
  const link = "https://asukachikaru.com" + location.pathname + location.search;
  // todo: description

  return (
    <ReactHelmet>
      <title>{title}</title>
      <link rel="canonical" href={link} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
    </ReactHelmet>
  );
};
