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
  resultado: number | null;

  // Limpar tela ao digitar próximo número?
  limparAoDigitar: boolean;
  limparMemoria: boolean;
  constructor() {
    this.tela = undefined;
    this.ligado = false;

    this.primeiroNumero = new NumeroB5();
    this.segundoNumero = new NumeroB5();
    this.ePrimeiroNumero = true;
    this.operando = "";

    this.memoria = 0;
    this.resultado = null;

    this.limparAoDigitar = false;
    this.limparMemoria = false;
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

    this.resultado = eval(`${num1}${this.operando}${num2}`) as number;
  }

  private ativacaolimpezaErro() {
    if (this.ligado === false) this.tela?.mostre(0);
    if (this.ligado === true) this.reinicie();

    this.ligado = true;
  }

  private igual() {
    this.calcularResultado();

    if (this.resultado !== null) {
      this.limpar();
      this.tela?.mostre(this.resultado);
    }

    this.primeiroNumero.deNumero(Number(this.resultado));
    this.segundoNumero = new NumeroB5();

    this.limparAoDigitar = true;
  }

  private desativacao() {
    this.tela?.limpe();
    this.ligado = false;
    this.memoria = 0;
  }

  private separadorDecimal() {
    if (this.ePrimeiroNumero) {
      this.primeiroNumero.posiçãoSeparadorDecimal =
        this.primeiroNumero.digitos.length;
    } else {
      this.segundoNumero.posiçãoSeparadorDecimal =
        this.segundoNumero.digitos.length;
    }
    this.tela?.mostreSeparadorDecimal();
  }

  private memoriaSoma() {
    if (!this.ePrimeiroNumero || this.resultado) {
      this.calcularResultado();
      this.memoria += Number(this.resultado);
      this.tela?.limpe();
      this.tela?.mostre(Number(this.resultado));
    } else if (this.ePrimeiroNumero) {
      this.memoria += this.primeiroNumero.paraNumero();
    }
  }

  private memoriaSubtracao() {
    if (!this.ePrimeiroNumero || this.resultado) {
      this.calcularResultado();
      this.memoria -= Number(this.resultado);
    } else if (this.ePrimeiroNumero) {
      this.memoria -= this.primeiroNumero.paraNumero();
    }
    // this.limpar();

    this.limparAoDigitar = true;
  }

  private memoriaLeituraLimpeza() {
    if (this.limparMemoria) {
      this.memoria = 0;
      this.limparMemoria = false;
    }

    this.tela?.limpe();
    this.tela?.mostre(this.memoria);
    this.limparMemoria = true;
  }

  recebaDigito(digito: Digito) {
    if (this.ligado) {
      if (this.limparAoDigitar) {
        this.tela?.limpe();
        this.limparAoDigitar = false;
      }
      this.limparMemoria = false;

      this.resultado = 0;

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
    switch (Number(controle)) {
      case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
        this.ativacaolimpezaErro();
        break;
      case Controle.IGUAL:
        this.igual();
        break;
      case Controle.DESATIVAÇÃO:
        this.desativacao();
        break;
      case Controle.SEPARADOR_DECIMAL:
        this.separadorDecimal();
        break;
      case Controle.MEMÓRIA_SOMA:
        this.memoriaSoma();
        break;
      case Controle.MEMÓRIA_SUBTRAÇÃO:
        this.memoriaSubtracao();
        break;
      case Controle.MEMÓRIA_LEITURA_LIMPEZA:
        this.memoriaLeituraLimpeza();
        break;
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
