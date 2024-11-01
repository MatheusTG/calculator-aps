import { Digito, Sinal, Tela } from "../@types/calculadora";

export class TelaB5 implements Tela {
  lista: (string | number)[];

  constructor() {
    this.lista = ["0"];
  }
  mostreSeparadorDecimal(): void {
    this.lista.push(".");
  }
  mostreSinal(sinal: Sinal): void {
    throw new Error("Method not implemented.");
  }
  mostreMemoria(): void {
    throw new Error("Method not implemented.");
  }
  mostreErro(): void {
    throw new Error("Method not implemented.");
  }

  mostre(digito: Digito): void {
    this.lista.push(digito);
  }

  limpe(): void {
    this.lista = [];
  }
}
