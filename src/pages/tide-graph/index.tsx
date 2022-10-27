import { NextPage } from "next";
import { useMemo } from "react";
import PageHeader from "../../commons/components/PageHeader";

import TideGraph from "../../commons/components/TideGraph";
import { getNowDatetime } from "../../utils/DateUtils";

const TideGraphPage: NextPage = () => {
  const now = useMemo(() => {
    return getNowDatetime();
  }, []);

  return (
    <>
      <PageHeader>Tide Graph</PageHeader>
      <TideGraph datetime={now} />
    </>
  );
};

export default TideGraphPage;
