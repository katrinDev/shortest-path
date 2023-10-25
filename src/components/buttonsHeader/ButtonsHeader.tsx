import { Box, Grid, Button, Typography } from "@material-ui/core";
import startAndEndPoints from "../../store/startAndEndPoints";
import obstacles from "../../store/obstacles";
import { observer } from "mobx-react-lite";
import PieChartIcon from "@material-ui/icons/PieChart";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: { fontWeight: 550, marginLeft: "30px" },
  typoButtons: { display: "inline-block" },
});

export default observer(function ButtonsHeader() {
  const classes = useStyles();

  return (
    <Box style={{ margin: 30 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.typoButtons}>
            Start Point:{" "}
            {`[${startAndEndPoints.startPoint.x},${startAndEndPoints.startPoint.y}]`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => startAndEndPoints.submitStartPoint()}
          >
            {startAndEndPoints.isStartSubmitted
              ? "Change start"
              : "Submit start"}
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classes.typoButtons}>
            End Point:{" "}
            {`[${startAndEndPoints.endPoint.x},${startAndEndPoints.endPoint.y}]`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ minWidth: "150px" }}
            onClick={() => startAndEndPoints.sumbitEndPoint()}
          >
            {startAndEndPoints.isEndSubmitted ? "Change end" : "Submit end"}
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ minWidth: "150px" }}
            onClick={() => obstacles.submitObstacles()}
          >
            {obstacles.areObstaclesSubmitted
              ? "Change Obstacles"
              : "Submit Obstacles"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});
