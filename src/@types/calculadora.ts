export enum DigitoTipo {
  ZERO = 0,
  UM,
  DOIS,
  TRÊS,
  QUATRO,
  CINCO,
  SEIS,
  SETE,
  OITO,
  NOVE,
}

export enum OperaçãoTipo {
  SOMA,
  SUBTRAÇÃO,
  MULTIPLICAÇÃO,
  DIVISÃO,
  RAIZ_QUADRADA,
  PERCENTUAL,
}

export enum ControleTipo {
  DESATIVAÇÃO,
  ATIVAÇÃO_LIMPEZA_ERRO,
  MEMÓRIA_LEITURA_LIMPEZA,
  MEMÓRIA_SOMA,
  MEMÓRIA_SUBTRAÇÃO,
  SEPARADOR_DECIMAL,
  IGUAL,
}

export interface TelaTipo {
  mostre(digito: DigitoTipo): void;
  limpe(): void;
}

export interface TecladoTipo {
  digiteDigito(digito: DigitoTipo): void;
  digiteOperacao(operação: OperaçãoTipo): void;
  digiteControle(controle: ControleTipo): void;

  definaCpu(cpu: CpuTipo): void;
  obtenhaCpu(): CpuTipo | null;
}

export interface CpuTipo {
  recebaDigito(digito: DigitoTipo): void;
  recebaOperacao(operação: OperaçãoTipo): void;
  recebaControle(controle: ControleTipo): void;
  reinicie(): void;

  definaTela(tela: TelaTipo): void;
  obtenhaTela(): TelaTipo | null;
}

export interface CalculadoraTipo {
  definaTela(tela: TelaTipo): void;
  obtenhaTela(): TelaTipo;

  definaCpu(cpu: CpuTipo): void;
  obtenhaCpu(): CpuTipo;

  definaTeclado(teclado: TecladoTipo): void;
  obtenhaTeclado(): TecladoTipo;
}
