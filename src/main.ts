import "./style.css";
import { Cpu } from "./ts/Cpu";
import { Tela } from "./ts/Display";
import { Keyboard } from "./ts/Teclado";

const tela = new Tela();
const cpu = new Cpu(tela);
new Keyboard("[data-button]", cpu);

// const teclado =  new tecladoMahteu();

// teclado.

// DIGIT
// OPERATION
// CONTROLLER
