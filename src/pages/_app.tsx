import type { AppProps } from "next/app";
import PageBase from "../commons/pages/PageBase";

function MyApp(props: AppProps) {
  return (
    <>
      <PageBase {...props} />
    </>
  );
}

export default MyApp;
