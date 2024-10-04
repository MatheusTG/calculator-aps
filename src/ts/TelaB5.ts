import { DigitoTipo } from "../@types/calculadora";
import { TelaB5Tipo } from "../@types/ihc";
import { Tela } from "./Tela";

export class TelaB5 extends Tela implements TelaB5Tipo {
  lista: DigitoTipo[];
  constructor() {
    super();
    this.lista = [];
  }

  mostre(digito: DigitoTipo): void {
    this.lista.push(digito);
  }

  limpe(): void {
    throw new Error("Method not implemented.");
  }
}
