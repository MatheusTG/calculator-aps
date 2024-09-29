import { Tela } from "./Display";

export class Cpu {
  tela: Tela;
  constructor(tela: Tela) {
    this.tela = tela;
  }

  adicionarFuncoes(button: HTMLButtonElement) {
    switch (button.dataset.button) {
      case "NUMERICO":
        console.log(button.dataset.value);
        return 2;
      default:
        return null;
    }
  }
}
