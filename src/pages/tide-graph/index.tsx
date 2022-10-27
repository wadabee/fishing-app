import dayjs from "dayjs";
import { NextPage } from "next";
import PageHeader from "../../commons/components/PageHeader";

import TideGraph from "../../commons/components/TideGraph";

const TideGraphPage: NextPage = () => {
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <>
      <PageHeader>Tide Graph</PageHeader>
      <TideGraph date={today} />
    </>
  );
};

export default TideGraphPage;
