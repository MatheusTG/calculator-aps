import { Digito } from "./Teclas";

export interface Tela {
  mostrarDigito(digito: Digito): void;

  limpa(): void;
}
