import {
  ControleTipo,
  CpuTipo,
  DigitoTipo,
  OperaçãoTipo,
  TecladoTipo,
} from "../@types/calculadora";
import { Cpu } from "./Cpu";
import { Tela } from "./Tela";
import { Teclado } from "./Teclado";

export type TeclaTipo<T> = HTMLButtonElement & {
  dataset: {
    value: T;
  };
};

function isDigito(botao: HTMLButtonElement): botao is TeclaTipo<DigitoTipo> {
  return botao.dataset.button === "NUMERICO";
}

function isOperacao(
  botao: HTMLButtonElement
): botao is TeclaTipo<OperaçãoTipo> {
  return botao.dataset.button === "OPERACAO";
}

function isControle(
  botao: HTMLButtonElement
): botao is TeclaTipo<ControleTipo> {
  return botao.dataset.button === "CONTROLADOR";
}

export class CalculadoraIHC {
  botoes: HTMLButtonElement[];
  Teclado: TecladoTipo;
  constructor(botaoSeletor: string) {
    const buttons = document.querySelectorAll<HTMLButtonElement>(botaoSeletor);
    // Convertendo a NodeList para lista
    this.botoes = Array.from(buttons);

    const tela = new Tela();
    // @ts-ignore
    const cpu = new Cpu(tela) as CpuTipo;
    this.Teclado = new Teclado();

    this.bindEvents();
    this.addKeyEvents();
  }

  aoPrecionar(event: MouseEvent) {
    let botao = event.target;

    if (botao instanceof SVGElement && botao.dataset.img) {
      // Caso o item clicado seja na verdade o path de um svg ou um svg
      if (botao.parentElement instanceof SVGElement) {
        botao = botao.parentElement.parentElement;
      } else {
        botao = botao.parentElement;
      }
    }

    if (botao instanceof HTMLButtonElement && botao.dataset.button) {
      if (isDigito(botao)) this.Teclado.digiteDigito(botao.dataset.value);
      if (isOperacao(botao)) this.Teclado.digiteOperacao(botao.dataset.value);
      if (isControle(botao)) this.Teclado.digiteControle(botao.dataset.value);
    }
  }

  bindEvents() {
    this.aoPrecionar = this.aoPrecionar.bind(this);
  }

  addKeyEvents() {
    // Colocando evento de click em todos os botões
    this.botoes.forEach((botao) => {
      botao.addEventListener("click", this.aoPrecionar);
    });
  }
}
