import {
  ControleTipo,
  CpuTipo,
  DigitoTipo,
  OperaçãoTipo,
  TecladoTipo,
} from "../@types/calculadora";

export class Teclado implements TecladoTipo {
  cpu: CpuTipo | null;
  constructor() {
    this.cpu = null;
  }

  digiteDigito(digito: DigitoTipo) {
    this.cpu?.recebaDigito(digito);
  }

  digiteOperacao(operação: OperaçãoTipo) {
    this.cpu?.recebaOperacao(operação);
  }

  digiteControle(controle: ControleTipo) {
    this.cpu?.recebaControle(controle);
  }

  /* associação de Teclado -> Cpu */

  definaCpu(cpu: CpuTipo) {
    this.cpu = cpu;
  }

  obtenhaCpu() {
    return this.cpu;
  }
}
