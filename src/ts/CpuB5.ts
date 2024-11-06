import { Controle, Cpu, Digito, Operação, Tela } from "../@types/calculadora";
import { NumeroB5 } from "./NumeroB5";

export class CpuB5 implements Cpu {
  tela: Tela | undefined;

  primeiroNumero: NumeroB5;
  segundoNumero: NumeroB5;
  ePrimeiroNumero: boolean;
  operando: string;
  ligado: boolean;
  memoria: NumeroB5;
  resultado: NumeroB5;

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

    this.memoria = new NumeroB5();
    this.resultado = new NumeroB5();

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
    const num1 = this.primeiroNumero.paraNumero();
    const num2 = this.segundoNumero.paraNumero();

    this.resultado.deNumero(eval(`${num1}${this.operando}${num2}`));
  }

  private valorParaPrimeiroNumero(valor: NumeroB5) {
    this.limparAoDigitar = true;
    this.primeiroNumero = valor;

    this.tela?.mostreSinal(this.primeiroNumero.sinal);
    this.primeiroNumero.digitos.forEach((valor) => this.tela?.mostre(valor));
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
      this.valorParaPrimeiroNumero(this.resultado);
    }
  }

  private desativacao() {
    this.tela?.limpe();
    this.ligado = false;
    this.memoria = new NumeroB5();
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

  private memoriaAlteracao(tipo: "soma" | "subtração") {
    if (!this.ePrimeiroNumero) {
      this.calcularResultado();

      this.memoria.deNumero(
        this.memoria.paraNumero() + this.resultado?.paraNumero()
      );

      this.limpar();
      this.valorParaPrimeiroNumero(this.resultado);
    } else {
      console.log(this.memoria, this.primeiroNumero);
      this.memoria.deNumero(
        eval(
          `${this.memoria.paraNumero()} 
           ${tipo === "soma" ? "+" : "-"}
           ${this.primeiroNumero?.paraNumero()}`
        )
      );
      this.primeiroNumero = new NumeroB5();
    }
    this.limparAoDigitar = true;
  }

  private memoriaLeituraLimpeza() {
    // Limpando memória
    if (this.limparMemoria) {
      this.memoria = new NumeroB5();
      this.limparMemoria = false;
    }

    // Mostrando memória
    this.tela?.limpe();
    this.valorParaPrimeiroNumero(this.memoria);
    this.segundoNumero = new NumeroB5();
    this.limparMemoria = true;
  }

  // ** Métodos de operações
  private mostrarSinal(): boolean {
    if (this.ePrimeiroNumero && !this.primeiroNumero.digitos.length) {
      this.primeiroNumero.sinal = 1;
      return true;
    } else if (!this.ePrimeiroNumero && this.operando) {
      this.segundoNumero.sinal = 1;
      return true;
    }
    return false;
  }

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
        this.tela?.mostreSinal(0);
        this.limparAoDigitar = false;
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

      if (operação !== Operação.SUBTRAÇÃO) this.ePrimeiroNumero = false;

      switch (operação) {
        case Operação.SOMA:
          this.operando = "+";
          break;
        case Operação.SUBTRAÇÃO:
          if (!this.mostrarSinal()) {
            this.ePrimeiroNumero = false;
            this.operando = "-";
          }
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
        this.memoriaAlteracao("soma");
        break;
      case Controle.MEMÓRIA_SUBTRAÇÃO:
        this.memoriaAlteracao("subtração");
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
