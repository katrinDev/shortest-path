import { Box, Grid, Button, Typography } from "@material-ui/core";
import startAndEndPoints from "../../store/startAndEndPoints";
import obstacles from "../../store/obstacles";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { AlertsContext } from "../../context/alertsContext";

const useStyles = makeStyles({
  button: { fontWeight: 550, marginLeft: "30px" },
  typoButtons: { display: "inline-block" },
});

export default observer(function ButtonsHeader() {
  const classes = useStyles();

  const { snackbarProps, setSnackbarProps } = useContext(AlertsContext);

  const onClickStartButton = () => {
    if (startAndEndPoints.isEndSubmitted && obstacles.areObstaclesSubmitted) {
      startAndEndPoints.submitStartPoint();
    } else {
      showWarning();
    }
  };

  const onClickEndButton = () => {
    if (startAndEndPoints.isStartSubmitted && obstacles.areObstaclesSubmitted) {
      startAndEndPoints.sumbitEndPoint();
    } else {
      showWarning();
    }
  };

  const onClickObstaclesButton = () => {
    if (
      startAndEndPoints.isStartSubmitted &&
      startAndEndPoints.isEndSubmitted
    ) {
      obstacles.submitObstacles();
    } else {
      showWarning();
    }
  };

  const showWarning = () => {
    setSnackbarProps(() => ({
      open: true,
      severity: "warning",
      message: "Please submit your previous changes first",
    }));
  };

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
            onClick={onClickStartButton}
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
            onClick={onClickEndButton}
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
            onClick={onClickObstaclesButton}
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
