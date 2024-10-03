import {
  ControleTipo,
  CpuTipo,
  DigitoTipo,
  OperaçãoTipo,
  TecladoTipo,
} from "../@types/calculadora";

export class Teclado implements TecladoTipo {
  cpu: CpuTipo;
  constructor(cpu: CpuTipo) {
    this.cpu = cpu;
  }

  digiteDigito(digito: DigitoTipo) {
    console.log(digito);
  }

  digiteOperacao(operação: OperaçãoTipo) {
    console.log(operação);
  }

  digiteControle(controle: ControleTipo) {
    console.log(controle);
  }

  /* associação de Teclado -> Cpu */

  definaCpu(cpu: CpuTipo) {
    console.log(cpu);
  }

  obtenhaCpu() {
    return this.cpu;
  }
}
