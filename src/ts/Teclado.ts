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
    console.log("digito", digito);
  }

  digiteOperacao(operação: OperaçãoTipo) {
    console.log("operação", operação);
  }

  digiteControle(controle: ControleTipo) {
    console.log("controle", controle);
  }

  /* associação de Teclado -> Cpu */

  definaCpu(cpu: CpuTipo) {
    console.log(cpu);
  }

  obtenhaCpu() {
    return this.cpu;
  }
}
