import { Cpu } from "../ts/Cpu";
import { Controle, Digito, Operacao } from "./Teclas";

export interface TecladoTipo {
  digiteDigito(digito: Digito): void;

  digiteOperacao(operação: Operacao): void;

  digiteControle(controle: Controle): void;

  /* associação de Teclado -> Cpu */

  definaCpu(cpu: Cpu): void;

  obtenhaCpu(): Cpu;
}
