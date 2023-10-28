import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Button,
  Typography,
  CssBaseline,
  Grid,
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import BuildIcon from "@material-ui/icons/Build";
import obstacles from "../../store/obstacles";
import { buildPath, clearObstacles, resetGrid } from "../mainGrid/MainGrid";
import { AlertsContext } from "../../context/alertsContext";

const useStyles = makeStyles({ button: { fontWeight: 500, margin: "15px" } });

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props: Props) {
  const classes = useStyles();

  const { snackbarProps, setSnackbarProps } = useContext(AlertsContext);

  const onClickResetObstacles = () => {
    if (obstacles.obstacles.length === 0) {
      setSnackbarProps(() => ({
        open: true,
        severity: "info",
        message: "There are no obstacles on the grid",
      }));
    } else {
      clearObstacles();

      setSnackbarProps(() => ({
        open: true,
        severity: "success",
        message: "Obstacles were reset successfully",
      }));
    }
  };

  const onClickResetGrid = () => {
    resetGrid();
    setSnackbarProps(() => ({
      open: true,
      severity: "success",
      message: "Grid was reset successfully",
    }));
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item xs={5} md={3}>
                <Typography variant="h6">The Shortest Path Searcher</Typography>
              </Grid>

              <Grid item xs={7} md={5}>
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={onClickResetObstacles}
                >
                  Reset Obstacles
                </Button>
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={onClickResetGrid}
                >
                  Reset Grid
                </Button>
                <Button
                  color="inherit"
                  className={classes.button}
                  style={{ marginRight: 0 }}
                  onClick={() => buildPath()}
                >
                  Build Path
                </Button>
                <BuildIcon style={{ marginTop: 20, fontSize: "small" }} />
              </Grid>
            </Grid>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </React.Fragment>
    </>
  );
}
