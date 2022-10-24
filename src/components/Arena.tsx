import { useState, useRef } from "react";
import { Game, GameState, newGoal, Line, Point } from "../models/game/game";
import styles from "./Arena.module.css";
import circular from "./circular.png";

import { TextField, Button } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import RouteIcon from "@mui/icons-material/Route";
import HomeIcon from "@mui/icons-material/Home";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Divider from "@mui/material/Divider";

function lineToSvgLine(line: Line, id: string) {
  var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  newLine.setAttribute("id", id);
  newLine.setAttribute("x1", "" + line.a.x);
  newLine.setAttribute("y1", "" + line.a.y * -1);
  newLine.setAttribute("x2", "" + line.b.x);
  newLine.setAttribute("y2", "" + line.b.y * -1);
  newLine.setAttribute("stroke-width", "0.5");
  newLine.setAttribute("stroke-style", "dash");
  newLine.setAttribute("stroke-linecap", "round");
  newLine.setAttribute("stroke", "goldenrod");
  return newLine;
}

function pointToSvgCircle(point: Point, id: string, fill: string) {
  var svgPoint = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  svgPoint.setAttribute("id", id);
  svgPoint.setAttribute("cx", "" + point.x);
  svgPoint.setAttribute("cy", "" + point.y * -1);
  svgPoint.setAttribute("stroke", "black");
  svgPoint.setAttribute("stroke-width", "0.5");
  svgPoint.setAttribute("fill", fill);
  svgPoint.setAttribute("r", "1");
  return svgPoint;
}

function pathToSvg(lines: Line[]) {
  const svgLines = [];
  for (let i = 0; i < lines.length; i++) {
    const id = "line" + i;
    const svgLine = lineToSvgLine(lines[i], id);
    svgLines.push(svgLine);
  }
  return svgLines;
}

function renderSvg(game: Game, showGoal: boolean): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const svgLines = pathToSvg(game.getLines());
  svgLines.forEach((l) => {
    svg.append(l);
  });
  const startSvg = pointToSvgCircle(game.startPosition(), "start", "green");
  svg.append(startSvg);
  if (showGoal) {
    const goalSvg = pointToSvgCircle(game.goalPosition(), "goal", "goldenrod");
    svg.append(goalSvg);
  }

  return svg;
}

function State(props: { player: GameState }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DirectionsWalkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.player.steps.toFixed()}
          secondary="Steps"
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <RouteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.player.traveled.toFixed() + "m"}
          secondary="Traveled"
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.player.fromHome.toFixed() + "m"}
          secondary="From home"
        />
      </ListItem>
    </List>
  );
}

type UserInput = { value: string; onInput: (event: any) => void };

type GameInput = { distance: UserInput; direction: UserInput };

function Input1(props: { input: GameInput }) {
  return (
    <div>
      <img className={styles.form} src={circular} alt="guide" />
      <div className={styles.form}>
        <TextField
          id="outlined-basic"
          label="Distance"
          variant="outlined"
          value={props.input.distance.value}
          onChange={props.input.distance.onInput}
          fullWidth={true}
        />
      </div>
      <div className={styles.form}>
        <TextField
          id="outlined-basic"
          label="Direction (deg)"
          variant="outlined"
          value={props.input.direction.value}
          onChange={props.input.direction.onInput}
          fullWidth={true}
        />
      </div>
    </div>
  );
}

export function Arena() {
  const [distance, setDistance] = useState<string>("");
  const [directionDeg, setDirectionDeg] = useState<string>("");
  const [showGoal, setShowGoal] = useState<boolean>(false);
  const [game, setGame] = useState<Game>(new Game(newGoal()));
  const [player, setPlayer] = useState<GameState>(game.state());
  const svg = useRef(renderSvg(game, showGoal));

  function invalidInput(): boolean {
    if (distance == "" || directionDeg == "") {
      return true;
    }
    return isNaN(+distance) || isNaN(+directionDeg);
  }

  function reset() {
    const newGame = new Game(newGoal());
    setPlayer(newGame.state());
    setGame(newGame);
    setDistance("");
    setDirectionDeg("");
  }

  function onDistanceInput(event: any) {
    setDistance(event.target.value);
  }
  function onDirectionInput(event: any) {
    setDirectionDeg(event.target.value);
  }
  function cheat() {
    setShowGoal(!showGoal);
  }

  function step() {
    game.step(parseFloat(distance), parseFloat(directionDeg));
    setPlayer(game.state());
    svg.current = renderSvg(game, showGoal);
    console.log(svg);
    setGame(game);
  }

  return (
    <div className={styles.root}>
      <div className={styles.game}>
        <div className={styles.formRoot}>
          <Input1
            input={{
              distance: { value: distance, onInput: onDistanceInput },
              direction: { value: directionDeg, onInput: onDirectionInput },
            }}
          />
          <div className={styles.form}>
            <Button
              variant="contained"
              onClick={step}
              fullWidth={true}
              disabled={invalidInput()}
              startIcon={<DirectionsWalkIcon />}
            >
              Step
            </Button>
          </div>
          <div className={styles.form}>
            <Button
              variant="outlined"
              onClick={reset}
              fullWidth={true}
              startIcon={<AutorenewIcon />}
            >
              Reset
            </Button>
          </div>
          <div className={styles.form}>
            <Button
              variant={showGoal ? "contained" : "outlined"}
              onClick={cheat}
              color="warning"
              fullWidth={true}
              startIcon={<CrisisAlertIcon />}
            >
              Cheat!
            </Button>
          </div>
          <div className={styles.statBox}>
            <State player={player} />
          </div>
          <Divider />
          <div>
            <div className={styles.score}>
              <div className={styles.scoreText}> Temperature</div>
              <div>
                <span className={styles.stat}>
                  {(player.temperature * 100).toFixed()}%
                </span>
              </div>
            </div>
            {player.complete && (
              <div className={styles.score}>
                <div className={styles.scoreText}>Score</div>
                <div>
                  <span className={styles.stat}>
                    {(player.efficiency * 100).toFixed()}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <svg
          className={styles.map}
          viewBox="0 0 100 100"
          dangerouslySetInnerHTML={{
            __html: renderSvg(game, showGoal).outerHTML,
          }}
        />
      </div>
    </div>
  );
}
