import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import PageBase from "../commons/pages/PageBase";

function MyApp(props: AppProps) {
  return (
    <>
      <RecoilRoot>
        <PageBase {...props} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
