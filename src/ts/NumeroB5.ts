import { Digito, Sinal } from "../@types/calculadora";

export class NumeroB5 {
  digitos: Digito[] = [];

  posiçãoSeparadorDecimal: number | null = 0;
  sinal: Sinal = 0;

  paraNumero(): number {
    let newDigitos: (Digito | ".")[] = [...this.digitos];
    if (this.posiçãoSeparadorDecimal) {
      newDigitos.splice(this.posiçãoSeparadorDecimal, 0, ".");
    }

    if (this.sinal === 1) return Number(newDigitos.join("")) * -1;
    else return Number(newDigitos.join(""));
  }

  deNumero(numero: number): void {
    if (numero < 0) this.sinal = 1;
    else this.sinal = 0;

    const numeroString = numero.toString();

    if (numeroString.indexOf(".") !== -1)
      this.posiçãoSeparadorDecimal = numeroString.indexOf(".");

    // @ts-ignore
    this.digitos = numeroString
      .split("")
      .filter((valor) => ![".", "-"].includes(valor));
  }
}
