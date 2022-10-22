import { useState, useRef } from "react";
import { Game, GameState, newGoal, Line } from "../models/game/game";
import styles from "./Arena.module.css";

function lineToSvgLine(line: Line, id: string) {
  var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  newLine.setAttribute("id", id);
  newLine.setAttribute("x1", "" + line.a.x);
  newLine.setAttribute("y1", "" + line.a.y*-1);
  newLine.setAttribute("x2", "" + line.b.x);
  newLine.setAttribute("y2", "" + line.b.y*-1);
  newLine.setAttribute("stroke", "black");
  return newLine;
}

function pathToSvg(lines: Line[]): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  for (let i = 0; i < lines.length; i++) {
    const id = "line" + i;
    const svgLine = lineToSvgLine(lines[i], id);
    svg.append(svgLine);
  }
  return svg;
}

export function Arena() {
  const [distance, setDistance] = useState<string>("");
  const [directionDeg, setDirectionDeg] = useState<string>("");
  const [game, setGame] = useState<Game>(new Game(newGoal()));
  const [player, setPlayer] = useState<GameState>(game.state());
//   const [svg, setSvg] = useState<SVGSVGElement>(pathToSvg(game.getLines()));
  const svg = useRef(pathToSvg(game.getLines()))

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

  function step() {
    game.step(parseFloat(distance), parseFloat(directionDeg));
    setPlayer(game.state());
    svg.current = pathToSvg(game.getLines()) 
    console.log(svg);
    setGame(game);
  }

  return (
    <div className={styles.root}>
      <span>Distance</span>
      <input
        className={styles.form}
        type="text"
        onChange={onDistanceInput}
        value={distance}
      />
      <span>Direction</span>
      <input
        className={styles.form}
        type="text"
        onChange={onDirectionInput}
        value={directionDeg}
      />
      <button className={styles.form} onClick={step}>
        Walk
      </button>
      <button className={styles.form} onClick={reset}>
        Reset
      </button>
      <div> Steps: {player.steps} </div>
      <div> Traveled: {player.traveled} </div>
      <div> From home: {player.fromHome} </div>
      <div> Efficiency: {player.efficiency} </div>
      <div> Temperature: {player.temperature} </div>
      <svg dangerouslySetInnerHTML={{__html: pathToSvg(game.getLines()).innerHTML}} />
    </div>
  );
}
