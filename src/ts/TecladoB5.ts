import {
  Controle,
  Cpu,
  Digito,
  Operação,
  Teclado,
} from "../@types/calculadora";

export class TecladoB5 implements Teclado {
  cpu: Cpu | null;
  constructor() {
    this.cpu = null;
  }

  digiteDigito(digito: Digito) {
    this.cpu?.recebaDigito(digito);
  }

  digiteOperacao(operação: Operação) {
    // @ts-ignore
    this.cpu?.recebaOperacao(Operação[operação]);
  }

  digiteControle(controle: Controle) {
    this.cpu?.recebaControle(controle);
  }

  /* associação de Teclado -> Cpu */

  definaCpu(cpu: Cpu) {
    this.cpu = cpu;
  }

  obtenhaCpu() {
    return this.cpu;
  }
}
