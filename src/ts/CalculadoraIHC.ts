import {
  ControleTipo,
  DigitoTipo,
  OperaçãoTipo,
  TecladoTipo,
} from "../@types/calculadora";
import { TelaB5Tipo } from "../@types/ihc";
import { Cpu } from "./Cpu";
import { Teclado } from "./Teclado";
import { TelaB5 } from "./TelaB5";

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
  Tela: TelaB5Tipo;

  telaElemento: HTMLDivElement | null;
  ligado: boolean;
  constructor(botaoSeletor: string, telaSelector: string) {
    const buttons = document.querySelectorAll<HTMLButtonElement>(botaoSeletor);
    this.telaElemento = document.querySelector<HTMLDivElement>(telaSelector);
    // Convertendo a NodeList para lista
    this.botoes = Array.from(buttons);

    this.ligado = false;

    this.Tela = new TelaB5();
    const cpu = new Cpu();
    cpu.definaTela(this.Tela);
    this.Teclado = new Teclado();
    this.Teclado.definaCpu(cpu);

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

    // ligando a calculadora caso ela esteja desligada
    if (!this.ligado && this.Tela.lista.length) {
      this.Tela.lista.pop();
      this.ligado = true;
      this.telaElemento?.classList.add("display-on");
    }

    // Adicionando os números na tela
    if (this.telaElemento) {
      console.log(this.Tela.lista);
      this.telaElemento.innerText = this.Tela.lista.join("");
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
