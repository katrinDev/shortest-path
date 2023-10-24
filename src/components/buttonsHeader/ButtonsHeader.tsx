import { Box, Grid, Button, Typography } from "@material-ui/core";
import Position from "../../algorithm/basicClasses/positionClass";
import { StartEndProps } from "../layout/Layout";

export default function ButtonsHeader({
  startPoint,
  setStartPoint,
  endPoint,
  setEndPoint,
}: StartEndProps) {
  return (
    <Box style={{ margin: 15, marginTop: 30 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="body1"
            style={{
              display: "inline-block",
              marginRight: "30px",
            }}
          >
            Start Point: {`[${startPoint.x},${startPoint.y}]`}
          </Typography>
          <Button variant="contained" color="primary">
            Submit start
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="body1"
            style={{
              display: "inline-block",
              marginRight: "30px",
            }}
          >
            End Point: {`[${endPoint.x},${endPoint.y}]`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: "150px" }}
          >
            Submit end
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
