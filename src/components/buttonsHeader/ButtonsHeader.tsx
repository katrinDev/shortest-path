import { Box, Grid, Button, Typography } from "@material-ui/core";
import Position from "../../algorithm/basicClasses/positionClass";
import startAndEndPoints from "../../store/startAndEndPoints";
import { observer } from "mobx-react-lite";

export default observer(function ButtonsHeader() {
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
            Start Point:{" "}
            {`[${startAndEndPoints.startPoint.x},${startAndEndPoints.startPoint.y}]`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => startAndEndPoints.submitStartPoint()}
          >
            {startAndEndPoints.isStartSubmitted
              ? "Reset start"
              : "Submit start"}
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
            End Point:{" "}
            {`[${startAndEndPoints.endPoint.x},${startAndEndPoints.endPoint.y}]`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: "150px" }}
            onClick={() => startAndEndPoints.sumbitEndPoint()}
          >
            {startAndEndPoints.isEndSubmitted ? "Reset end" : "Submit end"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});
