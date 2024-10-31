import { Controle, Cpu, Digito, Operação, Tela } from "../@types/calculadora";
import { NumeroB5 } from "./NumeroB5";

export class CpuB5 implements Cpu {
  tela: Tela | undefined;

  primeiroNumero: NumeroB5;
  segundoNumero: NumeroB5;
  ePrimeiroNumero: boolean;
  operando: string;
  ligado: boolean;
  memoria: number;
  resultado: string;
  constructor() {
    this.tela = undefined;
    this.ligado = false;

    this.primeiroNumero = new NumeroB5();
    this.segundoNumero = new NumeroB5();
    this.ePrimeiroNumero = true;
    this.operando = "";

    this.memoria = 0;
    this.resultado = "";
  }

  private limpar() {
    this.tela?.limpe();
    this.primeiroNumero.digitos = [];
    this.segundoNumero.digitos = [];
    this.ePrimeiroNumero = true;
  }

  private calcularResultado() {
    const num1Lista: (Digito | ".")[] = [...this.primeiroNumero.digitos];
    const posicaoDecimal1 = this.primeiroNumero.posiçãoSeparadorDecimal;
    if (posicaoDecimal1) num1Lista.splice(posicaoDecimal1, 0, ".");

    const num2Lista: (Digito | ".")[] = [...this.segundoNumero.digitos];
    const posicaoDecimal2 = this.segundoNumero.posiçãoSeparadorDecimal;
    if (posicaoDecimal2) num2Lista.splice(posicaoDecimal2, 0, ".");

    const num1 = Number(num1Lista.join(""));
    const num2 = Number(num2Lista.join(""));

    this.resultado = eval(`${num1}${this.operando}${num2}`) as string;
  }

  recebaDigito(digito: Digito) {
    if (this.ligado) {
      this.resultado = "";

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
          if (this.ePrimeiroNumero) this.limpar();

          // Convertendo números
          const primeiroNumero = Number(this.primeiroNumero.digitos.join(""));
          const segundoNumero = Number(this.segundoNumero.digitos.join(""));

          let resultado;
          if (["+", "-"].includes(this.operando)) {
            // Calcula o primeiro número em %
            resultado = primeiroNumero * (segundoNumero / 100);
          } else if (["*", "/"].includes(this.operando)) {
            // Tranforma o segundo número em % decimal
            resultado = segundoNumero / 100;
          }

          // Converte o resultado em uma lista de strings (catacteres)
          let listaResultado = String(resultado).split("");

          // Encontra a posição do separador decimal e retira ele de lista de caracteres
          this.segundoNumero.posiçãoSeparadorDecimal =
            listaResultado.indexOf(".");
          listaResultado = listaResultado.filter((value) => value !== ".");

          // @ts-ignore
          this.segundoNumero.digitos = listaResultado;

          this.tela?.limpe();

          // Cópia da lista de caracteres do primeiro número
          let listaNumero: (Digito | ".")[] =
            this.primeiroNumero.digitos.slice();

          // Posição do separadorDecimal
          const posicaoSeparadorDecimal =
            this.primeiroNumero.posiçãoSeparadorDecimal;

          // Adicionando separador decimal na lista
          if (posicaoSeparadorDecimal) {
            listaNumero = [
              ...listaNumero.slice(0, posicaoSeparadorDecimal),
              ".",
              ...listaNumero.slice(posicaoSeparadorDecimal, listaNumero.length),
            ];
          }

          this.tela?.mostre(
            eval(
              `${Number(listaNumero.join(""))}${this.operando}${
                this.segundoNumero.digitos[0] +
                "." +
                this.segundoNumero.digitos[1]
              }`
            )
          );

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
      this.calcularResultado();

      if (this.resultado) {
        this.limpar();
        this.tela?.mostre(eval(this.resultado));
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

    if (Number(controle) === Controle.MEMÓRIA_SOMA) {
      if (!this.ePrimeiroNumero || this.resultado) {
        this.calcularResultado();
        this.memoria += Number(this.resultado);
      } else if (this.ePrimeiroNumero) {
        this.memoria += this.primeiroNumero.paraNumero();
      }
      this.limpar();
    }

    if (Number(controle) === Controle.MEMÓRIA_SUBTRAÇÃO) {
      if (!this.ePrimeiroNumero || this.resultado) {
        this.calcularResultado();
        this.memoria -= Number(this.resultado);
      } else if (this.ePrimeiroNumero) {
        this.memoria -= this.primeiroNumero.paraNumero();
      }
      this.limpar();
    }

    console.log(this.memoria);
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
