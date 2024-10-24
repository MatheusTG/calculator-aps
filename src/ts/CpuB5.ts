import { Controle, Cpu, Digito, Operação, Tela } from "../@types/calculadora";
import { NumeroB5 } from "./NumeroB5";

export class CpuB5 implements Cpu {
  tela: Tela | undefined;
  primeiroNumero: NumeroB5;
  segundoNumero: NumeroB5;
  ePrimeiroNumero: boolean;
  operando: string;

  ligado: boolean;
  constructor() {
    this.tela = undefined;
    this.ligado = false;

    this.primeiroNumero = new NumeroB5();
    this.segundoNumero = new NumeroB5();
    this.ePrimeiroNumero = true;
    this.operando = "";
  }

  private limpar() {
    this.tela?.limpe();
    this.primeiroNumero.digitos = [];
    this.segundoNumero.digitos = [];
    this.ePrimeiroNumero = true;
  }

  recebaDigito(digito: Digito) {
    if (this.ligado) {
      if (!this.ePrimeiroNumero && this.segundoNumero?.digitos.length === 0) {
        this.tela?.limpe();
      }

      this.tela?.mostre(digito);

      if (this.ePrimeiroNumero) {
        this.primeiroNumero.digitos.push(digito);
      } else {
        this.segundoNumero.digitos.push(digito);
      }
    }
  }

  recebaOperacao(operação: Operação) {
    if (this.ligado) {
      this.ePrimeiroNumero = false;

      switch (operação) {
        case Operação.SOMA:
          this.operando = "+";
          return;
        case Operação.SUBTRAÇÃO:
          this.operando = "-";
          return;
        case Operação.MULTIPLICAÇÃO:
          this.operando = "*";
          return;
        case Operação.DIVISÃO:
          this.operando = "/";
          return;
        case Operação.RAIZ_QUADRADA:
          this.tela?.limpe();
          this.tela?.mostre(
            eval(`${Number(this.primeiroNumero.digitos.join(""))}**0.5`)
          );
          return;
        case Operação.PERCENTUAL:
          this.operando = "/100 ";
          return;
      }
    }
  }

  recebaControle(controle: Controle) {
    if (Number(controle) === Controle.ATIVAÇÃO_LIMPEZA_ERRO) {
      if (this.ligado === false) this.tela?.mostre(0);
      if (this.ligado === true) this.reinicie();

      this.ligado = true;
    }

    if (Number(controle) === Controle.IGUAL) {
      const num1Lista: (Digito | ".")[] = [...this.primeiroNumero.digitos];
      const posicaoDecimal1 = this.primeiroNumero.posiçãoSeparadorDecimal;
      if (posicaoDecimal1) num1Lista.splice(posicaoDecimal1, 0, ".");

      const num2Lista: (Digito | ".")[] = [...this.segundoNumero.digitos];
      const posicaoDecimal2 = this.segundoNumero.posiçãoSeparadorDecimal;
      if (posicaoDecimal2) num2Lista.splice(posicaoDecimal2, 0, ".");

      console.log(num2Lista);
      const num1 = Number(num1Lista.join(""));
      const num2 = Number(num2Lista.join(""));

      if (num1 && num2) {
        this.limpar();
        this.tela?.mostre(eval(`${num1}${this.operando}${num2}`));
      }
    }

    if (Number(controle) === Controle.DESATIVAÇÃO) {
      this.tela?.limpe();
      this.ligado = false;
    }

    if (Number(controle) === Controle.SEPARADOR_DECIMAL) {
      if (this.ePrimeiroNumero) {
        this.primeiroNumero.posiçãoSeparadorDecimal =
          this.primeiroNumero.digitos.length;
      } else {
        this.segundoNumero.posiçãoSeparadorDecimal =
          this.segundoNumero.digitos.length;
      }
      this.tela?.mostreSeparadorDecimal();
    }
  }

  reinicie() {
    this.limpar();
  }

  definaTela(tela: Tela): void {
    this.tela = tela;
  }

  obtenhaTela() {
    return this.tela;
  }
}
