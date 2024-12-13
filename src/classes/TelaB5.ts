import { Digito, Sinal, Tela } from "../@types/calculadora";

export class TelaB5 implements Tela {
  lista: (string | number)[];
  sinal: boolean;
  memoria: boolean;

  erro: boolean;

  constructor() {
    this.lista = ["0"];
    this.sinal = false;
    this.memoria = false;
    this.erro = false;
  }
  mostreSeparadorDecimal(): void {
    console.log("teste");
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
    this.erro = true;
  }

  mostre(digito: Digito): void {
    console.log(digito);
    this.lista.push(digito);
  }

  limpe(): void {
    this.lista = [];
    this.sinal = false;
  }
}
