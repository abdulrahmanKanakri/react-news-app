import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";

type BaseItemType = {
  id: number;
  name: string;
};

interface CheckMultipleFormProps<TItem extends BaseItemType> {
  items: TItem[];
  onSubmit: (ids: number[]) => void;
  loading?: boolean;
  initialValues?: number[];
}

export const CheckMultipleForm = <TItem extends BaseItemType>({
  items,
  onSubmit,
  loading,
  initialValues,
}: CheckMultipleFormProps<TItem>) => {
  const [values, setValues] = useState<{ [key: number | string]: boolean }>({});

  const handleCheckboxChange = (value: string) => {
    setValues((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  const handleSubmit = () => {
    const selectedValues = Object.entries(values)
      .map(([id, checked]) => (checked ? +id : 0))
      .filter((id) => id > 0);

    onSubmit(selectedValues);
  };

  useEffect(() => {
    if (Array.isArray(initialValues)) {
      setValues(
        initialValues.reduce((acc, id) => ({ ...acc, [id]: true }), {})
      );
    }
  }, [initialValues]);

  return (
    <>
      <div>
        <Typography variant="h6" gutterBottom>
          Prefered sources
        </Typography>
        <Divider />
        <Grid container>
          {items.map((item) => (
            <Grid item sm={6} key={item.id}>
              <FormControlLabel
                label={item.name}
                value={item.id}
                control={
                  <Checkbox
                    onChange={(e) => {
                      handleCheckboxChange(e.target.value);
                    }}
                    checked={!!values[item.id]}
                  />
                }
                disabled={loading}
              />
            </Grid>
          ))}
        </Grid>
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          loading={loading}
          onClick={handleSubmit}
        >
          Save
        </LoadingButton>
      </div>
    </>
  );
};
