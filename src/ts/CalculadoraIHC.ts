import {
  Controle,
  Cpu,
  Digito,
  Operação,
  Teclado,
  Tela,
} from "../@types/calculadora";
import { CpuB5 } from "./CpuB5";
import { TecladoB5 } from "./TecladoB5";
import { TelaB5 } from "./TelaB5";

export type TeclaTipo<T> = HTMLButtonElement & {
  dataset: {
    value: T;
  };
};

function isDigito(botao: HTMLButtonElement): botao is TeclaTipo<Digito> {
  return botao.dataset.button === "NUMERICO";
}

function isOperacao(botao: HTMLButtonElement): botao is TeclaTipo<Operação> {
  return botao.dataset.button === "OPERACAO";
}

function isControle(botao: HTMLButtonElement): botao is TeclaTipo<Controle> {
  return botao.dataset.button === "CONTROLADOR";
}

export class CalculadoraIHC {
  botoes: HTMLButtonElement[];
  Teclado: Teclado;
  Tela: Tela & { lista: (string | number)[]; sinal: boolean };
  cpu: Cpu;

  telaElemento: HTMLDivElement | null;
  ligado: boolean;
  constructor(botaoSeletor: string, telaSelector: string) {
    const buttons = document.querySelectorAll<HTMLButtonElement>(botaoSeletor);
    this.telaElemento = document.querySelector<HTMLDivElement>(telaSelector);
    // Convertendo a NodeList para lista
    this.botoes = Array.from(buttons);

    this.ligado = false;

    this.Tela = new TelaB5();
    this.cpu = new CpuB5();
    this.cpu.definaTela(this.Tela);
    this.Teclado = new TecladoB5();
    this.Teclado.definaCpu(this.cpu);

    this.bindEvents();
    this.addKeyEvents();
  }

  aoPressionar(event: MouseEvent) {
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

    // Adicionando e remomendo sinal
    if (this.ligado) {
      if (this.Tela.sinal) this.telaElemento?.classList.add("activeSinal");
      else this.telaElemento?.classList.remove("activeSinal");
    }

    // ligando a calculadora caso ela esteja desligada
    if (!this.ligado && this.Tela.lista.length) {
      this.Tela.lista.pop();
      this.ligado = true;
      this.telaElemento?.classList.add("display-on");
    }

    if (this.ligado)
      if (this.telaElemento) {
        // Adicionando os números na tela
        if (
          this.Tela.lista.length === 1 &&
          Number(this.Tela.lista[0] === "0")
        ) {
          this.telaElemento.innerText = "0";
        } else if (Number(this.Tela.lista[0]) === 0) {
          this.Tela.lista.shift();
        }
        this.telaElemento.innerText = this.Tela.lista.join("");
      }
    if (botao instanceof HTMLButtonElement && botao.dataset.value === "0") {
      this.ligado = false;
      this.telaElemento?.classList.remove("display-on");
    }
  }

  bindEvents() {
    this.aoPressionar = this.aoPressionar.bind(this);
  }

  addKeyEvents() {
    // Colocando evento de click em todos os botões
    this.botoes.forEach((botao) => {
      botao.addEventListener("click", this.aoPressionar);
    });
  }
}
