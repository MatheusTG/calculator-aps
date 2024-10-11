import {
  ControleTipo,
  CpuTipo,
  DigitoTipo,
  OperaçãoTipo,
  TelaTipo,
} from "../@types/calculadora";

export class Cpu implements CpuTipo {
  tela: TelaTipo | null;

  private ligado: boolean;
  constructor() {
    this.tela = null;
    this.ligado = false;
  }

  recebaDigito(digito: DigitoTipo) {
    if (this.ligado) {
      this.tela?.mostre(digito);
    }
  }

  recebaOperacao(operação: OperaçãoTipo) {
    if (this.ligado) {
      console.log(operação);
    }
  }

  recebaControle(controle: ControleTipo) {
    if (Number(controle) === ControleTipo.ATIVAÇÃO_LIMPEZA_ERRO) {
      this.tela?.mostre(0);
      this.ligado = true;
    }
  }

  reinicie() {
    console.log(Cpu);
  }
  definaTela(tela: TelaTipo): void {
    this.tela = tela;
  }

  obtenhaTela() {
    return this.tela;
  }
}
