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

  // ** Métodos Gerais
  private limpar() {
    this.tela?.limpe();
    this.primeiroNumero = new NumeroB5();
    this.segundoNumero = new NumeroB5();
    this.ePrimeiroNumero = true;
    this.operando = "";
    this.limparAoDigitar = false;
    this.limparMemoria = false;
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

    console.log(`${num1}${this.operando}${num2}`);
    this.resultado = eval(`${num1}${this.operando}${num2}`) as number;
  }

  // ** Métodos de Controle
  private ativacaolimpezaErro() {
    if (this.ligado === false) this.tela?.mostre(0);
    if (this.ligado === true) this.reinicie();

    this.ligado = true;
  }

  private igual() {
    this.calcularResultado();

    this.limpar();
    if (this.resultado !== null) {
      this.limparAoDigitar = true;
      this.primeiroNumero.deNumero(Number(this.resultado));
      this.tela?.mostre(this.resultado);
    }
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
    if (!this.ePrimeiroNumero) {
      this.calcularResultado();
      this.memoria += Number(this.resultado);

      this.limpar();
      if (this.resultado !== null) {
        this.limparAoDigitar = true;
        this.primeiroNumero.deNumero(Number(this.resultado));
        this.tela?.mostre(this.resultado);
      }
    } else if (this.ePrimeiroNumero) {
      this.memoria += this.primeiroNumero.paraNumero();
    }

    this.limparAoDigitar = true;
  }

  private memoriaSubtracao() {
    if (!this.ePrimeiroNumero || this.resultado) {
      this.calcularResultado();
      this.memoria -= Number(this.resultado);

      this.tela?.limpe();
      this.tela?.mostre(Number(this.resultado));
    } else if (this.ePrimeiroNumero) {
      this.memoria -= this.primeiroNumero.paraNumero();
    }

    this.limparAoDigitar = true;
  }

  private memoriaLeituraLimpeza() {
    // Limpando memória
    if (this.limparMemoria) {
      this.memoria = 0;
      this.limparMemoria = false;
    }

    // Mostrando memória
    this.tela?.limpe();
    this.tela?.mostre(this.memoria);
    this.primeiroNumero.deNumero(this.memoria);
    this.segundoNumero = new NumeroB5();
    this.limparMemoria = true;
    this.limparAoDigitar = true;
  }

  // ** Métodos de operações
  private calcularRaizQuadrada() {
    this.tela?.limpe();
    this.tela?.mostre(
      eval(`${Number(this.primeiroNumero.digitos.join(""))}**0.5`)
    );
  }

  private calcularPorcentual() {
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
    this.segundoNumero.posiçãoSeparadorDecimal = listaResultado.indexOf(".");
    listaResultado = listaResultado.filter((value) => value !== ".");

    // @ts-ignore
    this.segundoNumero.digitos = listaResultado;

    this.tela?.limpe();

    // Cópia da lista de caracteres do primeiro número
    let listaNumero: (Digito | ".")[] = this.primeiroNumero.digitos.slice();

    // Posição do separadorDecimal
    const posicaoSeparadorDecimal = this.primeiroNumero.posiçãoSeparadorDecimal;

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
          this.segundoNumero.digitos[0] + "." + this.segundoNumero.digitos[1]
        }`
      )
    );
  }

  recebaDigito(digito: Digito) {
    if (this.ligado) {
      if (this.limparAoDigitar) {
        this.tela?.limpe();
        this.limparAoDigitar = false;

        if (this.ePrimeiroNumero) {
          this.primeiroNumero = new NumeroB5();
        }
      }

      this.limparMemoria = false;

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
      this.limparAoDigitar = true;
      this.ePrimeiroNumero = false;

      switch (operação) {
        case Operação.SOMA:
          this.operando = "+";
          break;
        case Operação.SUBTRAÇÃO:
          this.operando = "-";
          break;
        case Operação.MULTIPLICAÇÃO:
          this.operando = "*";
          break;
        case Operação.DIVISÃO:
          this.operando = "/";
          break;
        case Operação.RAIZ_QUADRADA:
          this.calcularRaizQuadrada();
          break;
        case Operação.PERCENTUAL:
          this.calcularPorcentual();
          break;
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
