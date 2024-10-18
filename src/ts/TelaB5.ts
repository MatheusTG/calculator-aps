import { Digito, Sinal, Tela } from "../@types/calculadora";

export class TelaB5 implements Tela {
  lista: Digito[];

  constructor() {
    this.lista = [];
  }
  mostreSeparadorDecimal(): void {
    throw new Error("Method not implemented.");
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
