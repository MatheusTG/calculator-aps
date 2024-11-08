import { Controle, Cpu, Digito, Operação, Tela } from "../@types/calculadora";
import { NumeroB5 } from "./NumeroB5";

export class CpuB5 implements Cpu {
  tela: Tela | undefined;

  private primeiroNumero: NumeroB5;
  private segundoNumero: NumeroB5;
  private ePrimeiroNumero: boolean;
  private operando: string;
  private ligado: boolean;
  private memoria: NumeroB5;
  private resultado: NumeroB5;

  // Limpar tela ao digitar próximo número?
  private limparAoDigitar: boolean;
  private limparMemoria: boolean;
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
    if (this.memoria.digitos.length) this.tela?.mostreMemoria();
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
    if (this.ligado === true) {
      this.reinicie();
      this.tela?.mostre(0);
    }

    this.ligado = true;
  }

  private igual() {
    this.calcularResultado();

    this.tela?.limpe();
    this.ePrimeiroNumero = true;
    this.limparAoDigitar = false;
    if (this.resultado !== null) {
      this.valorParaPrimeiroNumero(this.resultado);
    }
  }

  private desativacao() {
    this.ligado = false;
    this.limpar();
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

      if (!!this.resultado && !this.memoria.digitos.length)
        this.tela?.mostreMemoria();
    } else {
      const resultado = eval(
        `${this.memoria.paraNumero()} 
         ${tipo === "soma" ? "+" : "-"}
         ${this.primeiroNumero?.paraNumero()}`
      );

      if (resultado !== 0 && !this.memoria.digitos.length)
        this.tela?.mostreMemoria();
      this.memoria.deNumero(resultado);
      this.primeiroNumero = new NumeroB5();
    }
    this.limparAoDigitar = true;
  }

  private memoriaLeituraLimpeza() {
    // Limpando memória
    if (this.limparMemoria) {
      this.memoria = new NumeroB5();
      this.limparMemoria = false;
      if (!!this.resultado) this.tela?.mostreMemoria();
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
    const primeiroNumero = this.primeiroNumero.paraNumero();
    const segundoNumero = this.segundoNumero.paraNumero();

    let valor;
    if (["+", "-"].includes(this.operando)) {
      valor = primeiroNumero * (segundoNumero / 100);
    } else if (["*", "/"].includes(this.operando)) {
      valor = segundoNumero / 100;
    }

    this.tela?.limpe();
    const resultado = eval(`${primeiroNumero}${this.operando}${valor}`);
    this.resultado.deNumero(resultado);
    this.segundoNumero = this.primeiroNumero;
    this.valorParaPrimeiroNumero(this.resultado);
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

      if (
        this.segundoNumero.digitos.length &&
        ![Operação.RAIZ_QUADRADA, Operação.PERCENTUAL].includes(operação)
      ) {
        this.igual();
        this.ePrimeiroNumero = false;
      }
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
