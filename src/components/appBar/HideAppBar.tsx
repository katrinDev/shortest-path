import React from "react";
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
import { buildPath } from "../mainGrid/MainGrid";

const useStyles = makeStyles({ button: { fontWeight: 550, margin: "15px" } });

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
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Typography variant="h6">
                    The Shortest Path Searcher
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Button
                    color="inherit"
                    className={classes.button}
                    onClick={() => obstacles.clearObstacles()}
                  >
                    Clear Obstacles
                  </Button>
                  <Button color="inherit" className={classes.button}>
                    Clear Grid
                  </Button>
                  <Button
                    color="inherit"
                    className={classes.button}
                    style={{ marginRight: 0 }}
                    onClick={() => buildPath()}
                  >
                    Build Path
                  </Button>
                  <BuildIcon style={{ marginTop: 18, fontSize: "small" }} />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </React.Fragment>
    </>
  );
}
