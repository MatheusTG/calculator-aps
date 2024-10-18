import { Digito, Tela } from "../@types/calculadora";

export class TelaB5 implements Tela {
  lista: Digito[];
  constructor() {
    this.lista = [];
  }

  mostre(digito: Digito): void {
    this.lista.push(digito);
  }

  limpe(): void {
    this.lista = [];
  }
}
