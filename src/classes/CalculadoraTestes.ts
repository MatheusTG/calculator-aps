import {
  Controle,
  Cpu,
  Digito,
  Operação,
  Sinal,
  Tela,
} from "../@types/calculadora";

import { TelaB5 } from "./TelaB5";

export class TestadorTela {
  private tela: Tela;

  constructor(tela: Tela) {
    this.tela = tela;
  }

  testeTodosNúmeros() {
    this.tela.limpe();
    console.log("= Testando todos os dígitos ===========================");
    Object.keys(Digito).forEach((element) => {
      if (Number(element)) this.tela.mostre(Number(element));
    });
  }

  testeTodosSímbolo() {
    this.tela.limpe();
    console.log("= Testando todos os símbolos ===========================");
    for (let i = 0; i < 8; i++) {
      this.tela.mostre(Digito.OITO);
      this.tela.mostreSeparadorDecimal();
    }
    this.tela.mostreMemoria();
    this.tela.mostreSinal(Sinal.NEGATIVO);
    this.tela.mostreErro();
  }
}

export class TestadorCpu {
  private cpu: Cpu;
  private tela: TelaB5 & { lista: any[] } = new TelaB5();
  private reinicieEntreTestes: boolean = true;

  constructor(
    cpu: Cpu,
    // debug: boolean = false,
    reinicieEntreTestes: boolean = true
  ) {
    this.cpu = cpu;
    this.cpu.definaTela(this.tela);
    this.cpu.recebaControle(Controle.ATIVAÇÃO_LIMPEZA_ERRO);
    // this.tela.debug = debug;
    this.reinicieEntreTestes = reinicieEntreTestes;
  }

  executeTodosTestes(): void {
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeMemoria01();
  }

  private assert(
    esperado: string,
    sinal: Sinal,
    memoria: boolean,
    erro: boolean
  ) {
    const resultado: string = this.tela.lista.join("");

    if (resultado == esperado) console.log("OK");
    else console.log("ERROR: esperado=" + esperado + " resultado=" + resultado);

    const sinalTela = this.tela.sinal ? Sinal.NEGATIVO : Sinal.POSITIVO;
    if (sinalTela !== sinal) {
      console.log("ERROR: sinal=" + sinal + " resultado=" + sinalTela);
    }

    if (this.tela.memoria != memoria)
      console.log(
        "ERROR: memoria=" + memoria + " resultado=" + this.tela.memoria
      );

    if (this.tela.erro != erro)
      console.log("ERROR: erro=" + erro + " resultado=" + this.tela.erro);
  }

  /** Matheus */
  testeMemoria01() {
    console.log("= Testando 40 M+ SOMA 20 M+ ===========================");
    [Digito.QUATRO, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    this.cpu.recebaOperacao(Operação.SOMA);

    [Digito.DOIS, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    console.log("= Testando 40 M+ SOMA 20 M+ ===========================");

    this.assert("60", Sinal.POSITIVO, true, false);
  }
}
