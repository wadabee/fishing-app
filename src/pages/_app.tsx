import type { AppProps } from "next/app";
import PageBase from "../commons/pages/pageBase";

function MyApp(props: AppProps) {
  return (
    <>
      <PageBase {...props} />
    </>
  );
}

export default MyApp;
