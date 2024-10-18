import {
  ControleTipo,
  DigitoTipo,
  OperaçãoTipo,
  TelaTipo,
} from "./calculadora";

export interface TelaB5Tipo {
  lista: DigitoTipo[];
  mostre(digito: DigitoTipo): void;
  limpe(): void;
}

export interface CpuTipo {
  lista: DigitoTipo[];
  ligado: boolean;
  recebaDigito(digito: DigitoTipo): void;
  recebaOperacao(operação: OperaçãoTipo): void;
  recebaControle(controle: ControleTipo): void;
  reinicie(): void;

  definaTela(tela: TelaTipo): void;
  obtenhaTela(): TelaTipo | null;
}
