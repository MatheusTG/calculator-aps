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
  private tela: TelaB5 = new TelaB5();
  private reinicieEntreTestes: boolean = true;

  constructor(
    cpu: Cpu,
    debug: boolean = false,
    reinicieEntreTestes: boolean = true
  ) {
    this.cpu = cpu;
    this.cpu.definaTela(this.tela);
    this.cpu.recebaControle(Controle.ATIVAÇÃO_LIMPEZA_ERRO);
    this.tela.debug = debug;
    this.reinicieEntreTestes = reinicieEntreTestes;
  }

  executeTodosTestes(): void {
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.teste123Soma456();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.teste12Divisão10();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.teste12Soma34Soma56();
  }

  private assert(
    esperado: string,
    sinal: Sinal,
    memoria: boolean,
    erro: boolean
  ) {
    const resultado: string = this.tela.digitos;
    console.log(7777, resultado);
    if (resultado == esperado) console.log("OK");
    else console.log("ERROR: esperado=" + esperado + " resultado=" + resultado);
    if (this.tela.sinal != sinal)
      console.log("ERROR: sinal=" + sinal + " resultado=" + this.tela.sinal);
    if (this.tela.memoria != memoria)
      console.log(
        "ERROR: memoria=" + memoria + " resultado=" + this.tela.memoria
      );
    if (this.tela.error != erro)
      console.log("ERROR: erro=" + erro + " resultado=" + this.tela.error);
  }

  teste123Soma456() {
    console.log("= Testando 123 + 456 ===========================");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SOMA);
    [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    console.log("= Testando 123 + 456 ===========================");
    this.assert("579", Sinal.POSITIVO, false, false);
  }

  teste12Soma34Soma56() {
    console.log("= Testando 12 + 34 + 56 ===========================");
    [Digito.UM, Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SOMA);
    [Digito.TRÊS, Digito.QUATRO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SOMA);
    [Digito.CINCO, Digito.SEIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    this.assert("102", Sinal.POSITIVO, false, false);
  }

  teste12Divisão10() {
    console.log("= Testando 12 / 10  ===========================");
    [Digito.UM, Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.DIVISÃO);
    [Digito.UM, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    this.assert("1.2", Sinal.POSITIVO, false, false);
  }
}
