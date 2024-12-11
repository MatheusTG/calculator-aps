import { Controle, Cpu, Digito, Operação, Sinal } from "../@types/calculadora";

import { TelaB5 } from "./TelaB5";

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
    this.testeSoma();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeSubtraçãoSinal();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeMultiplicação();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeDivisão();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeRaizQuadrada121();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testePorcentual();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeMultiplicaçãoComSeparadorDecimal();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeMemoria01();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeMemoria02();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.testeMemoriaSubtração();
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

  /** Amanda Soares */
  testeSoma() {
    console.log("= Testando 55 SOMA 20 ===========================");
    [Digito.CINCO, Digito.CINCO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SOMA);

    [Digito.DOIS, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    console.log("= Testando 55 SOMA 20 ===========================");

    this.assert("75", Sinal.POSITIVO, false, false);
  }

  /** Matheus Teodoro */
  testeSubtraçãoSinal() {
    console.log("= Testando 30 SUBTRAÇÃO 52 ===========================");
    [Digito.TRÊS, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SUBTRAÇÃO);

    [Digito.CINCO, Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    console.log("= Testando 30 SUBTRAÇÃO 52 ===========================");

    this.assert("22", Sinal.NEGATIVO, false, false);
  }

  /** Amanda Soares */
  testeMultiplicação() {
    console.log("= Testando 12 MULTIPLICAÇÃO 11 ===========================");
    [Digito.UM, Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);

    [Digito.UM, Digito.UM].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    console.log("= Testando 12 MULTIPLICAÇÃO 11 ===========================");

    this.assert("132", Sinal.POSITIVO, false, false);
  }

  /** Matheus Teodoro */
  testeDivisão() {
    console.log("= Testando 10 DIVISÃO 50 ===========================");
    [Digito.UM, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.DIVISÃO);

    [Digito.CINCO, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    console.log("= Testando 10 DIVISÃO 50 ===========================");

    this.assert("0.2", Sinal.POSITIVO, false, false);
  }

  /** Amanda Soares */
  testeRaizQuadrada121() {
    console.log("= Testando RAIZ_QUADRADA 121 ===========================");
    [Digito.UM, Digito.DOIS, Digito.UM].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.RAIZ_QUADRADA);
    console.log("= Testando RAIZ_QUADRADA 121  ===========================");

    this.assert("11", Sinal.POSITIVO, false, false);
  }

  /** Matheus Teodoro */
  testePorcentual() {
    console.log(
      "= Testando CEM DIVISÃO VINTE PORCENTUAL ==========================="
    );
    [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.DIVISÃO);

    [Digito.DOIS, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.PERCENTUAL);
    console.log(
      "= Testando CEM DIVISÃO VINTE PORCENTUAL ==========================="
    );

    this.assert("500", Sinal.POSITIVO, false, false);
  }

  /** Amanda Soares */
  testeMultiplicaçãoComSeparadorDecimal() {
    console.log(
      "= Testando MULTIPLICAÇÃO COM SEPARADOR DECIMAL ==========================="
    );
    [Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
    [Digito.CINCO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);

    [Digito.TRÊS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });

    this.cpu.recebaControle(Controle.IGUAL);
    console.log(
      "= Testando MULTIPLICAÇÃO COM SEPARADOR DECIMAL ==========================="
    );

    this.assert("7.5", Sinal.POSITIVO, false, false);
  }

  /** Matheus Teodoro */
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

  /** Amanda Soares */
  testeMemoria02() {
    console.log(
      "= Testando 40 M+ SOMA 20 M+ IGUAL ==========================="
    );
    [Digito.QUATRO, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    this.cpu.recebaOperacao(Operação.SOMA);

    [Digito.DOIS, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    this.cpu.recebaControle(Controle.IGUAL);
    console.log(
      "= Testando 40 M+ SOMA 20 M+ IGUAL ==========================="
    );

    this.assert("60", Sinal.POSITIVO, true, false);
  }

  /** Matheus Teodoro */
  testeMemoriaSubtração() {
    console.log("= Testando MEMÓRIA SUBTRAÇÃO ===========================");
    [Digito.QUATRO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SUBTRAÇÃO);

    [Digito.UM, Digito.OITO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.MEMÓRIA_SUBTRAÇÃO);

    console.log("= Testando MEMÓRIA SUBTRAÇÃO ===========================");

    this.assert("14", Sinal.NEGATIVO, true, false);
  }
}
