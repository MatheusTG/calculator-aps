import "./style.css";
import { CalculadoraIHC } from "./ts/CalculadoraIHC";
import { Cpu } from "./ts/Cpu";
import { Tela } from "./ts/Tela";

const tela = new Tela();
const cpu = new Cpu(tela);
new CalculadoraIHC("[data-button]", cpu);
