import { DigitoTipo, TelaTipo } from "../@types/calculadora";

export class Tela implements TelaTipo {
  constructor() {
    
}
  mostre(digito: DigitoTipo): void {
    throw new Error("Method not implemented.");
  }
  limpe(): void { 
    throw new Error("Method not implemented.");
  }
}