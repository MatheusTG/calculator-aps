import "./style.css";
import { Cpu } from "./ts/Cpu";
import { Keyboard } from "./ts/Keyboard";

const cpu = new Cpu();
new Keyboard("[data-button]", cpu);

// DIGIT
// OPERATION
// CONTROLLER
