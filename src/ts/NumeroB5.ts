import { Digito } from "../@types/calculadora";

export class Numero {
  digitos: Digito[] = [];

  posiçãoSeparadorDecimal: number | null = 0;

  paraNumero(): number {
    return 0;
  }

  deNumero(numero: Number): void {}
}
