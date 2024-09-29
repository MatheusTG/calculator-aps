export enum Digito {
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

export enum Operação {
  SOMA,
  SUBTRAÇÃO,
  MULTIPLICAÇÃO,
  DIVISÃO,
  RAIZ_QUADRADA,
  PERCENTUAL,
}

export enum Controle {
  DESATIVAÇÃO,
  ATIVAÇÃO_LIMPEZA_ERRO,
  MEMÓRIA_LEITURA_LIMPEZA,
  MEMÓRIA_SOMA,
  MEMÓRIA_SUBTRAÇÃO,
  SEPARADOR_DECIMAL,
}

export interface Tela {
  mostre(digito: Digito): void;
  limpe(): void;
}

export interface Teclado {
  digite(digito: Digito): void;
  digite(operação: Operação): void;
  digite(controle: Controle): void;
}

export interface Cpu {
  receba(digito: Digito): void;
  receba(operação: Operação): void;
  receba(controle: Controle): void;
  reinicie(): void;
}

export interface Calculadora {
  tela: Tela;
  teclado: Teclado;
  cpu: Cpu;
}
