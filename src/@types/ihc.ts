import { DigitoTipo } from "./calculadora";

export interface TelaB5Tipo {
  lista: DigitoTipo[];
  mostre(digito: DigitoTipo): void;
  limpe(): void;
}
