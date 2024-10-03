import {
  ControleTipo,
  CpuTipo,
  DigitoTipo,
  OperaçãoTipo,
  TelaTipo,
} from '../@types/calculadora';

export class Cpu implements CpuTipo {
  tela: TelaTipo;
  constructor(tela: TelaTipo) {
    this.tela = tela;
  }

  recebaDigito(digito: DigitoTipo) {
    console.log(digito);
  }

  recebaOperacao(operação: OperaçãoTipo) {
    console.log(operação);
  }

  recebaControle(controle: ControleTipo) {
    console.log(controle);
  }

  reinicie() {
    console.log(Cpu);
  }
  definaTela(tela: TelaTipo): void {
    console.log(tela);
  }

  obtenhaTela() {
    return this.tela;
  }
}
