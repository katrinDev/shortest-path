import { useState } from "react";
import HideAppBar from "../appBar/HideAppBar";
import Position from "../../algorithm/basicClasses/positionClass";
import { Container } from "@material-ui/core";
import ButtonsHeader from "../buttonsHeader/ButtonsHeader";
import MainGrid from "../mainGrid/MainGrid";

export default function Layout() {
  const [startPoint, setStartPoint] = useState<Position>(new Position(0, 0));
  const [endPoint, setEndPoint] = useState<Position>(new Position(99, 99));

  return (
    <>
      <HideAppBar>
        <></>
      </HideAppBar>

      <Container style={{ margin: "30 0", padding: "0" }}>
        <ButtonsHeader />
        <MainGrid />
      </Container>
    </>
  );
}
