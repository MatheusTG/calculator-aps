import { Cpu } from "./Cpu";

export class Keyboard {
  buttons: HTMLButtonElement[];
  Cpu: Cpu;
  constructor(buttonSelector: string, Cpu: Cpu) {
    const buttons =
      document.querySelectorAll<HTMLButtonElement>(buttonSelector);
    // Convertendo a NodeList para lista
    this.buttons = Array.from(buttons);
    this.Cpu = Cpu;

    this.bindEvents();
    this.addKeyEvents();
  }

  onPress(event: MouseEvent) {
    let button = event.target;

    if (button instanceof SVGElement && button.dataset.img) {
      // Caso o item clicado seja na verdade o path de um svg ou um svg
      if (button.parentElement instanceof SVGElement) {
        button = button.parentElement.parentElement;
      } else {
        button = button.parentElement;
      }
    }

    if (button instanceof HTMLButtonElement && button.dataset.button) {
      // @ts-ignore
      this.Cpu.adicionarFuncoes(button);

      // console.log(button.dataset.button, "=>", button.dataset.value);
    }
  }

  bindEvents() {
    this.onPress = this.onPress.bind(this);
  }

  addKeyEvents() {
    // Colocando evento de click em todos os botões
    this.buttons.forEach((button) => {
      button.addEventListener("click", this.onPress);
    });
  }
}
