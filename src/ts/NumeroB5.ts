import { Digito } from "../@types/calculadora";

export class NumeroB5 {
  digitos: Digito[] = [];

  posiçãoSeparadorDecimal: number | null = 0;

  paraNumero(): number {
    let newDigitos: (Digito | ".")[] = [...this.digitos];
    if (this.posiçãoSeparadorDecimal) {
      newDigitos.splice(this.posiçãoSeparadorDecimal, 0, ".");
    }

    return Number(newDigitos.join(''));
  }

  deNumero(numero: Number): void {
    const numeroString = numero.toString();

    if (numeroString.indexOf(".") !== -1)
      this.posiçãoSeparadorDecimal = numeroString.indexOf(".");

    // @ts-ignore
    this.digitos = numeroString.split("").filter((valor) => valor !== ".");
  }
}
