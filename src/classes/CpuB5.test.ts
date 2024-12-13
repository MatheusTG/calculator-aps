import { CpuB5 } from "./CpuB5";
import { Controle, Digito, Operação, Sinal, Tela } from "../@types/calculadora";
import { TelaB5 } from "./TelaB5";

describe("CpuB5", () => {
  let cpu: CpuB5;
  let mockTela: jest.Mocked<Tela & { memoria: boolean }>;

  beforeEach(() => {
    mockTela = new TelaB5() as jest.Mocked<TelaB5 & { memoria: boolean }>;
    mockTela.mostre = jest.fn();
    mockTela.limpe = jest.fn();
    mockTela.mostreSeparadorDecimal = jest.fn();
    mockTela.mostreSinal = jest.fn();
    mockTela.mostreErro = jest.fn();
    mockTela.mostreMemoria = jest.fn(() => {
      mockTela.memoria = !mockTela.memoria;
    });
    mockTela.memoria = false;
    cpu = new CpuB5();
    cpu.definaTela(mockTela);
    cpu.recebaControle(Controle.ATIVAÇÃO_LIMPEZA_ERRO);
  });

  test("Soma de 55 + 20 deve resultar em 75", () => {
    cpu.recebaDigito(Digito.CINCO);
    cpu.recebaDigito(Digito.CINCO);
    cpu.recebaOperacao(Operação.SOMA);
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaControle(Controle.IGUAL);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(5);
    expect(mostreCalls[2]).toBe(5);

    expect(mostreCalls[3]).toBe(2);
    expect(mostreCalls[4]).toBe(0);

    expect(mostreCalls[5]).toBe(7);
    expect(mostreCalls[6]).toBe(5);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);
  });

  test("Subtração de 30 - 52 deve resultar em -22", () => {
    cpu.recebaDigito(Digito.TRÊS);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaOperacao(Operação.SUBTRAÇÃO);
    cpu.recebaDigito(Digito.CINCO);
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaControle(Controle.IGUAL);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(3);
    expect(mostreCalls[2]).toBe(0);

    expect(mostreCalls[3]).toBe(5);
    expect(mostreCalls[4]).toBe(2);

    expect(mostreCalls[5]).toBe(2);
    expect(mostreCalls[6]).toBe(2);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.NEGATIVO);
  });

  test("Multiplicação de 12 * 11 deve resultar em 132", () => {
    cpu.recebaDigito(Digito.UM);
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
    cpu.recebaDigito(Digito.UM);
    cpu.recebaDigito(Digito.UM);
    cpu.recebaControle(Controle.IGUAL);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(1);
    expect(mostreCalls[2]).toBe(2);

    expect(mostreCalls[3]).toBe(1);
    expect(mostreCalls[4]).toBe(1);

    expect(mostreCalls[5]).toBe(1);
    expect(mostreCalls[6]).toBe(3);
    expect(mostreCalls[7]).toBe(2);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);
  });

  test("Divisão de 10 / 50 deve resultar em 0.2", () => {
    cpu.recebaDigito(Digito.UM);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaOperacao(Operação.DIVISÃO);
    cpu.recebaDigito(Digito.CINCO);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaControle(Controle.IGUAL);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(1);
    expect(mostreCalls[2]).toBe(0);

    expect(mostreCalls[3]).toBe(5);
    expect(mostreCalls[4]).toBe(0);

    expect(mostreCalls[5]).toBe(0);
    expect(mockTela.mostreSeparadorDecimal).toHaveBeenCalled();
    expect(mostreCalls[6]).toBe(2);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);
  });

  test("Raiz quadrada de 121 deve resultar em 11", () => {
    cpu.recebaDigito(Digito.UM);
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaDigito(Digito.UM);
    cpu.recebaOperacao(Operação.RAIZ_QUADRADA);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(1);
    expect(mostreCalls[2]).toBe(2);
    expect(mostreCalls[3]).toBe(1);

    expect(mostreCalls[4]).toBe(1);
    expect(mostreCalls[5]).toBe(1);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);
  });

  test("100 Dividido por 20%", () => {
    cpu.recebaDigito(Digito.UM);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaOperacao(Operação.DIVISÃO);
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaOperacao(Operação.PERCENTUAL);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(1);
    expect(mostreCalls[2]).toBe(0);
    expect(mostreCalls[3]).toBe(0);

    expect(mostreCalls[4]).toBe(2);
    expect(mostreCalls[5]).toBe(0);

    expect(mostreCalls[6]).toBe(5);
    expect(mostreCalls[7]).toBe(0);
    expect(mostreCalls[8]).toBe(0);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);
  });

  test("Multiplicação de 2.5 por 3", () => {
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
    cpu.recebaDigito(Digito.CINCO);
    cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
    cpu.recebaDigito(Digito.TRÊS);
    cpu.recebaControle(Controle.IGUAL);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(2);
    expect(mostreCalls[2]).toBe(5);

    expect(mostreCalls[3]).toBe(3);

    expect(mostreCalls[4]).toBe(7);
    expect(mostreCalls[5]).toBe(5);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);
    expect(mockTela.mostreSeparadorDecimal).toHaveBeenCalledTimes(2);
  });

  test("Testando memória soma (professor)", () => {
    cpu.recebaDigito(Digito.QUATRO);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    cpu.recebaOperacao(Operação.SOMA);
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaControle(Controle.MEMÓRIA_SOMA);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(4);
    expect(mostreCalls[2]).toBe(0);

    expect(mostreCalls[3]).toBe(2);
    expect(mostreCalls[4]).toBe(0);

    expect(mostreCalls[5]).toBe(6);
    expect(mostreCalls[6]).toBe(0);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);

    expect(mockTela.memoria).toBe(true);
  });

  test("Testando memória soma com igual (professor)", () => {
    cpu.recebaDigito(Digito.QUATRO);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    cpu.recebaOperacao(Operação.SOMA);
    cpu.recebaDigito(Digito.DOIS);
    cpu.recebaDigito(Digito.ZERO);
    cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    cpu.recebaControle(Controle.IGUAL);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(4);
    expect(mostreCalls[2]).toBe(0);

    expect(mostreCalls[3]).toBe(2);
    expect(mostreCalls[4]).toBe(0);

    expect(mostreCalls[5]).toBe(6);
    expect(mostreCalls[6]).toBe(0);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.POSITIVO);

    expect(mockTela.memoria).toBe(true);
  });

  test("Testando memória subtração", () => {
    cpu.recebaDigito(Digito.QUATRO);
    cpu.recebaOperacao(Operação.SUBTRAÇÃO);
    cpu.recebaDigito(Digito.UM);
    cpu.recebaDigito(Digito.OITO);
    cpu.recebaControle(Controle.MEMÓRIA_SUBTRAÇÃO);

    expect(mockTela.limpe).toHaveBeenCalled();
    const mostreCalls = mockTela.mostre.mock.calls.map((call) => call[0]);

    expect(mostreCalls[1]).toBe(4);

    expect(mostreCalls[2]).toBe(1);
    expect(mostreCalls[3]).toBe(8);

    expect(mostreCalls[4]).toBe(1);
    expect(mostreCalls[5]).toBe(4);
    expect(mockTela.mostreSinal).toHaveBeenCalledWith(Sinal.NEGATIVO);
  });
});
