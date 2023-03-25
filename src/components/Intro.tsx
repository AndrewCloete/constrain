import { Button } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

import styles from "./Arena.module.css";
export function Intro(props: {
  hintOpen: boolean;
  play: () => void;
  hintClick: () => void;
}) {
  return (
    <div className={styles.root}>
      <div className="flex justify-center">
        <article className="prose prose-slate lg:prose-2xl">
          <h1>
            <i>"How long will it take?"</i>
          </h1>
          <p>
            This silly little "game" was hacked together for a presentation to
            illustrate intuitively the reasoning behind{" "}
            <a href="https://agilemanifesto.org/">Agile</a> software development
            practices meant to address the dreaded question above.
          </p>
          <p>
            Your challenge is to find a hidden goal in the shortest amount of
            distance traveled. Use the "temperature gauge" to guide you.
          </p>
          <p>
            (Note. You will have a bad time on <b>mobile</b>)
          </p>
          <div className="flex flex-col items-center">
            <div className="w-full sm:w-1/2 m-2">
              <Button
                variant="contained"
                onClick={props.play}
                fullWidth={true}
                startIcon={<DirectionsWalkIcon />}
              >
                Play
              </Button>
            </div>
            <div className="w-full sm:w-1/2 m-2">
              <Button
                variant={props.hintOpen ? "contained" : "outlined"}
                onClick={props.hintClick}
                color="warning"
                fullWidth={true}
              >
                I'm lazy, just tell me
              </Button>
            </div>
          </div>
          {props.hintOpen && (
            <>
              <p>OK, but you probably will forget this advice...</p>
              <h3>Number of steps does not matter</h3>
              <p>
                You are only judged by the <b>distance</b> traveled, not the
                number of steps taken. The most efficient path is to set the
                step size to 1 and do lots of clicks. People tend to make one of
                two mistakes:
              </p>
              <ol>
                <li>
                  take increasingly larger steps as their "confidence" grows, or
                </li>
                <li>
                  take increasingly smaller steps as they try to "fine tune"
                  their path
                </li>
              </ol>

              <p>
                Both of these lead to a longer path traveled. The best way is
                take small steps, quickly, all the time.
              </p>

              <h3>Lessons from analogy the</h3>
              <ul>
                <li>
                  Playing is not possible without real-time, concrete{" "}
                  <b>feedback</b>. Define your goals in <b>quantifiable</b>{" "}
                  terms so you have a mental "temperature gauge" to guide you.
                  You'll know what this looks like in your domain.
                </li>
                <li>
                  Do whatever to keep your SDLC as short as possible. This will
                  motivate you to take smaller and smaller steps, more
                  frequently.
                </li>
              </ul>
              <p>
                In a future version of the game I also want add a variable
                timeout between steps to show how this naturally leads you to
                wanting to take larger steps.
              </p>

              <h3>Inspiration</h3>
              <ul>
                <li>
                  The principles of{" "}
                  <a href="https://en.wikipedia.org/wiki/Extreme_programming">
                    Extreme Programming
                  </a>{" "}
                  aim to solve for both of the above problems: <i>feedback</i>{" "}
                  and <i>iteration time</i> (which are really two sides of the
                  same coin).
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=RhdlBHHimeM">
                    Software Art Thou: Glenn Vanderburg - Real Software
                    Engineering
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=5eW6Eagr9XA">
                    Veritasium: The 4 things it takes to be an expert (not just
                    10,000 hours)
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=GnK_n9Udhhs">
                    Agile Adria 2013 keynote / Gojko Adzic: Make Impacts Not
                    Software
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=ln4WnxX-wrw">
                    TDD Is The Best Design Technique
                  </a>
                </li>
                <li>
                  <a href="https://www.amazon.com/Competing-Against-Luck-Innovation-Customer/dp/0062435612">
                    Competing Against Luck, by Clayton Christensen
                  </a>
                </li>
              </ul>
            </>
          )}

          <i>
            By{" "}
            <a href="https://github.com/AndrewCloete/constrain">
              Andrew Cloete
            </a>
            . Feel free to use.
          </i>
        </article>
      </div>
    </div>
  );
}
