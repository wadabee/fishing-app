import { Card, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { RtdbSchema } from "../../@types/rtdb";
import IconFiveLevel from "../../commons/components/IconFiveLevel";
import IconWeather from "../../commons/components/IconWeather";
import PageHeader from "../../commons/components/PageHeader";
import SubHeader from "../../commons/components/SubHeader";
import FishingRecordRepo from "../../repository/FishingRecordRepo";
import { formatDate } from "../../utils/DateUtils";

const FishingList: NextPage = () => {
  const [recordList, setRecordList] = useState<
    RtdbSchema["record"] | undefined
  >(undefined);

  useEffect(() => {
    FishingRecordRepo.getAll().then((data) => {
      setRecordList(data);
    });
  }, []);

  if (!recordList) {
    return <>Loading...</>;
  }

  return (
    <>
      <PageHeader>Fishing Record List</PageHeader>
      {Object.entries(recordList).map(([date, dateVal]) => {
        return (
          <Card key={date}>
            <CardContent>
              <SubHeader>{formatDate(date, "YYYYMMDD")}</SubHeader>

              {Object.entries(dateVal).map(([itemKey, item]) => {
                return (
                  <Card key={itemKey}>
                    <CardContent>
                      <SubHeader>
                        {formatDate(
                          item.startDatetime,
                          "YYYY-MM-DDTHH:mm:ss",
                          "HH:mm"
                        )}
                        &nbsp;-&nbsp;
                        {formatDate(
                          item.endDatetime,
                          "YYYY-MM-DDTHH:mm:ss",
                          "HH:mm"
                        )}
                      </SubHeader>

                      <Grid container alignItems="baseline">
                        <Grid item xs={12}>
                          <Box sx={{ display: "flex" }}>
                            Weather:
                            <IconWeather weather={item.weather} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: "flex" }}>
                            Wind:
                            <IconFiveLevel level={item.wind} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: "flex" }}>
                            Wave:
                            <IconFiveLevel level={item.wave} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: "flex" }}>
                            Turbidity:
                            <IconFiveLevel level={item.turbidity} />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default FishingList;
