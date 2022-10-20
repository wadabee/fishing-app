import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RtdbSchema, TackleType } from "../../@types/rtdb";
import TackleRepo from "../../repository/tackleRepo";

const TackleRegister: NextPage = () => {
  const tackleTypes = useMemo(() => {
    return [
      {
        method: "Method",
      },
      {
        rod: "Rod",
      },
      {
        reel: "Reel",
      },
      {
        line: "Main Line",
      },
      {
        leader: "Leader",
      },
      {
        weight: "Weight",
      },
      {
        needle: "Needle",
      },
      {
        float: "Float",
      },
      {
        lure: "Lure",
      },
    ];
  }, []);

  const [tackles, setTackles] = useState<RtdbSchema["tackle"] | undefined>(
    undefined
  );

  useEffect(() => {
    TackleRepo.getAll().then((data) => {
      setTackles(data);
    });
  }, []);

  const onChange = useCallback(
    (type: TackleType, index: number, key: string, value: string) => {
      // return if data not fetch yet
      if (!tackles) {
        return;
      }

      const temp = _.cloneDeep(tackles[type]) ?? [];
      temp[index] = { [key]: value };

      setTackles({ ...tackles, [type]: temp });
    },
    [tackles]
  );

  const onAdd = useCallback(
    (type: TackleType) => {
      // return if data not fetch yet
      if (!tackles) {
        return;
      }

      const key = TackleRepo.getKey(type);
      const temp = _.cloneDeep(tackles[type]) ?? [];
      temp.push({
        [key]: "",
      });

      setTackles({ ...tackles, [type]: temp });
    },
    [tackles]
  );

  const onRegister = useCallback(
    (type: TackleType) => {
      // return if data not fetch yet
      if (!tackles) {
        return;
      }

      TackleRepo.register(type, tackles[type] ?? []);
    },
    [tackles]
  );

  return (
    <>
      {tackleTypes.map((tackleType) => {
        const [key, label]: [TackleType, string] = Object.entries(
          tackleType
        )[0] as [TackleType, string];

        const tackelsByKey = tackles ? tackles[key] ?? [] : [];

        return (
          <Card key={key} sx={{ mb: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {label}
              </Typography>

              {tackelsByKey.map((value, idx) => {
                const [itemKey, itemName] = Object.entries(value)[0];
                return (
                  <TextField
                    key={itemKey}
                    value={itemName}
                    onChange={(e) => {
                      onChange(key, idx, itemKey, e.target.value);
                    }}
                  />
                );
              })}
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                onClick={() => {
                  onAdd(key);
                }}
              >
                ADD
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  onRegister(key);
                }}
              >
                REGISTER
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default TackleRegister;