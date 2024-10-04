import { DigitoTipo, TelaTipo } from "../@types/calculadora";

export class Tela implements TelaTipo {
  constructor() {}
  mostre(digito: DigitoTipo): void {}
  limpe(): void {}
}
