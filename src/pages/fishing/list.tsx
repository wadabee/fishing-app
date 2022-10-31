import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { RtdbSchema } from "../../@types/rtdb";
import IconFiveLevel from "../../commons/components/IconFiveLevel";
import IconWeather from "../../commons/components/IconWeather";
import LabeledContent from "../../commons/components/LabeledContent";
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

  const router = useRouter();
  const onClickEnd = useCallback(() => {
    router.push("/fishing/end");
  }, [router]);

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
                  <Card key={itemKey} sx={{ mt: 2 }}>
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
                        <Grid item xs={3}>
                          <LabeledContent label="Weather">
                            <IconWeather weather={item.weather} />
                          </LabeledContent>
                        </Grid>
                        <Grid item xs={3}>
                          <LabeledContent label="Wind">
                            <IconFiveLevel level={item.wind} />
                          </LabeledContent>
                        </Grid>
                        <Grid item xs={3}>
                          <LabeledContent label="Wave">
                            <IconFiveLevel level={item.wave} />
                          </LabeledContent>
                        </Grid>
                        <Grid item xs={3}>
                          <LabeledContent label="Turbidity">
                            <IconFiveLevel level={item.turbidity} />
                          </LabeledContent>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="primary">
                        Catch
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          onClickEnd();
                        }}
                      >
                        End
                      </Button>
                    </CardActions>
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
