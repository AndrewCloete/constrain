import { useState, useRef } from "react";
import { Game, GameState, newGoal, Line, Point } from "../models/game/game";
import styles from "./Arena.module.css";

import { TextField, Button } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import RouteIcon from "@mui/icons-material/Route";
import HomeIcon from "@mui/icons-material/Home";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

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

export function Arena() {
  const [distance, setDistance] = useState<string>("");
  const [directionDeg, setDirectionDeg] = useState<string>("");
  const [showGoal, setShowGoal] = useState<boolean>(false);
  const [game, setGame] = useState<Game>(new Game(newGoal()));
  const [player, setPlayer] = useState<GameState>(game.state());
  const svg = useRef(renderSvg(game, showGoal));

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
          <div className={styles.form}>
            <TextField
              id="outlined-basic"
              label="Distance"
              variant="outlined"
              value={distance}
              onChange={onDistanceInput}
            />
          </div>
          <div className={styles.form}>
            <TextField
              id="outlined-basic"
              label="Direction"
              variant="outlined"
              value={directionDeg}
              onChange={onDirectionInput}
            />
          </div>
          <div className={styles.form}>
            <Button
              variant="contained"
              onClick={step}
              startIcon={<DirectionsWalkIcon />}
            >
              Step
            </Button>
          </div>
          <div className={styles.form}>
            <Button
              variant="outlined"
              onClick={reset}
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
              startIcon={<CrisisAlertIcon />}
            >
              Cheat!
            </Button>
          </div>
          <div>
            <div>Steps</div>
            <div>
              <DirectionsWalkIcon fontSize="large" />
              <span className={styles.stat}>{player.steps}</span>
            </div>
            <div> Traveled</div>
            <div>
              <RouteIcon fontSize="large" />
              <span className={styles.stat}>
                {player.traveled.toFixed(0)}m{" "}
              </span>
            </div>
            <div> From home</div>
            <div>
              <HomeIcon fontSize="large" />
              <span className={styles.stat}>
                {player.fromHome.toFixed(0)}m{" "}
              </span>
            </div>
            <div>
              <div> Temperature</div>
              <div className={styles.stat}>
                {(player.temperature * 100).toFixed()}%
              </div>
            </div>
            {player.complete && (
              <div>
                <div>Score</div>
                <div>
                  <SportsScoreIcon fontSize="large" />
                  <span className={styles.stat}>
                    {(player.efficiency * 100).toFixed()}%
                  </span>
                </div>
              </div>
            )}
            {/* <div> Complete </div>
            <div className={styles.stat}>
              {player.complete ? "Done" : "Keep going"}
            </div> */}
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
