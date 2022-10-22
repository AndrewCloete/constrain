import { useState } from "react";
import { Game, GameState, newGoal } from "../models/game/game";
import styles from "./Arena.module.css";

export function Arena() {
  const [distance, setDistance] = useState<string>("");
  const [directionDeg, setDirectionDeg] = useState<string>("");
  const [game, setGame] = useState<Game>(new Game(newGoal()));
  const [player, setPlayer] = useState<GameState>(game.state());

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
    </div>
  );
}
