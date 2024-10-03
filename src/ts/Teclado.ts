import { TecladoTipo } from "../@types/Teclado";
import { Controle, Digito, Operacao } from "../@types/Teclas";
import { Cpu } from "./Cpu";

export class Teclado implements TecladoTipo {
  cpu: Cpu;
  constructor(cpu: Cpu) {
    this.cpu = cpu;
  }

  digiteDigito(digito: Digito) {}

  digiteOperacao(operação: Operacao) {}

  digiteControle(controle: Controle) {}

  /* associação de Teclado -> Cpu */

  definaCpu(cpu: Cpu) {}

  obtenhaCpu(): Cpu {
    return this.cpu;
  }
}
