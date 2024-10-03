import { CpuTipo, TecladoTipo } from "../@types/calculadora";
import { Cpu } from "./Cpu";
import { Tela } from "./Tela";
import { Teclado } from "./Teclado";

export class CalculadoraIHC {
  botoes: HTMLButtonElement[];
  Teclado: TecladoTipo;
  constructor(botaoSeletor: string) {
    const buttons = document.querySelectorAll<HTMLButtonElement>(botaoSeletor);
    // Convertendo a NodeList para lista
    this.botoes = Array.from(buttons);

    const tela = new Tela();
    const cpu = new Cpu(tela) as CpuTipo;
    this.Teclado = new Teclado(cpu);

    this.bindEvents();
    this.addKeyEvents();
  }

  aoPrecionar(event: MouseEvent) {
    let botao = event.target;

    if (botao instanceof SVGElement && botao.dataset.img) {
      // Caso o item clicado seja na verdade o path de um svg ou um svg
      if (botao.parentElement instanceof SVGElement) {
        botao = botao.parentElement.parentElement;
      } else {
        botao = botao.parentElement;
      }
    }

    if (botao instanceof HTMLButtonElement && botao.dataset.button) {
    }
  }

  bindEvents() {
    this.aoPrecionar = this.aoPrecionar.bind(this);
  }

  addKeyEvents() {
    // Colocando evento de click em todos os botões
    this.botoes.forEach((botao) => {
      botao.addEventListener("click", this.aoPrecionar);
    });
  }
}
