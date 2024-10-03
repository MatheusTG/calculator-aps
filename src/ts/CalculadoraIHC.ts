import { Cpu } from "./Cpu";

export class CalculadoraIHC {
  botoes: HTMLButtonElement[];
  Cpu: Cpu;
  constructor(botaoSeletor: string, Cpu: Cpu) {
    const buttons = document.querySelectorAll<HTMLButtonElement>(botaoSeletor);
    // Convertendo a NodeList para lista
    this.botoes = Array.from(buttons);
    this.Cpu = Cpu;

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
      // @ts-ignore
      this.Cpu.adicionarFuncoes(botao);

      // console.log(button.dataset.button, "=>", button.dataset.value);
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
