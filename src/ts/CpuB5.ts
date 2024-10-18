import { Controle, Cpu, Digito, Operação, Tela } from "../@types/calculadora";

export class CpuB5 implements Cpu {
  tela: Tela | undefined;
  primeiraLista: Digito[];
  segundaLista: Digito[];
  primeiroNumero: boolean;
  operando: string;

  ligado: boolean;
  constructor() {
    this.tela = undefined;
    this.ligado = false;

    this.primeiraLista = [];
    this.segundaLista = [];
    this.primeiroNumero = true;
    this.operando = "";
  }

  private limpar() {
    this.tela?.limpe();
    this.primeiraLista = [];
    this.segundaLista = [];
    this.primeiroNumero = true;
  }

  recebaDigito(digito: Digito) {
    if (this.ligado) {
      if (!this.primeiroNumero && this.segundaLista.length === 0) {
        this.tela?.limpe();
      }

      this.tela?.mostre(digito);

      if (this.primeiroNumero) {
        this.primeiraLista.push(digito);
      } else {
        this.segundaLista.push(digito);
      }
    }
  }

  recebaOperacao(operação: Operação) {
    if (this.ligado) {
      this.primeiroNumero = false;

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
            eval(`${Number(this.primeiraLista.join(""))}**0.5`)
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
      console.log(this.operando);
      const num1 = Number(this.primeiraLista.join(""));
      const num2 = Number(this.segundaLista.join(""));

      console.log(`${num1}${this.operando}${num2}`);

      if (num1 && num2) {
        this.limpar();
        this.tela?.mostre(eval(`${num1}${this.operando}${num2}`));
      }
    }

    if (Number(controle) === Controle.DESATIVAÇÃO) {
      this.tela?.limpe();
      this.ligado = false;
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
