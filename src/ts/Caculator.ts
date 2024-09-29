import { Controle, Digito, Operação, Teclado } from "./calculadora";

export class Calculadora implements Teclado {
  digite(digito: Digito): void
  digite(operação: Operação): void;
  digite(controle: Controle): void;
  digite(controle: unknown): void {
    throw new Error("Method not implemented.");
  }
}
