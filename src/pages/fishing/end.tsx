import { Card, CardActions, CardContent, TextField } from "@mui/material";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import ButtonRegister from "../../commons/components/ButtonRegister";
import PageHeader from "../../commons/components/PageHeader";
import FishingRecordRepo from "../../repository/FishingRecordRepo";
import { getNowDatetime } from "../../utils/DateUtils";

const FishingEnd: NextPage = () => {
  const [endDatetime, setEndDatetime] = useState("");

  useEffect(() => {
    setEndDatetime(getNowDatetime());
  }, []);

  const onRegister = useCallback(() => {
    // FIXME:WIP
    FishingRecordRepo.registerEnd({
      key: "-NFTosujiqm5qz2TEdZA",
      startDatetime: "2022-10-28 22:41:18",
      endDatetime: endDatetime,
    });
  }, [endDatetime]);

  return (
    <>
      <PageHeader>Fishing End</PageHeader>

      <Card>
        <CardContent>
          <TextField
            label="end-datetime"
            type="datetime-local"
            value={endDatetime}
            onChange={(e) => {
              setEndDatetime(e.target.value);
            }}
          />
        </CardContent>
        <CardActions>
          <ButtonRegister onClick={onRegister} />
        </CardActions>
      </Card>
    </>
  );
};

export default FishingEnd;
