import { Digito, Sinal, Tela } from "../@types/calculadora";

export class TelaB5 implements Tela {
  lista: (string | number)[];
  sinal: boolean;
  memoria: boolean;

  constructor() {
    this.lista = ["0"];
    this.sinal = false;
    this.memoria = false;
  }
  mostreSeparadorDecimal(): void {
    this.lista.push(".");
  }
  mostreSinal(sinal: Sinal): void {
    if (sinal === 0) this.sinal = false;
    else this.sinal = true;
  }

  mostreMemoria(): void {
    this.memoria = !this.memoria;
  }
  mostreErro(): void {
    throw new Error("Method not implemented.");
  }

  mostre(digito: Digito): void {
    this.lista.push(digito);
  }

  limpe(): void {
    this.lista = [];
    this.sinal = false;
  }
}
