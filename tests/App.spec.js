import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';

describe('Jogo da Velha', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App);
  });

  it('inicializa com tabuleiro vazio e jogador X', () => {
    expect(wrapper.vm.board).toEqual(Array(9).fill(''));
    expect(wrapper.vm.currentPlayer).toBe('X');
    expect(wrapper.vm.winner).toBe(null);
  });

  it('permite jogada válida e alterna jogadores', async () => {
    const button = wrapper.findAll('button')[0];
    await button.trigger('click');
    expect(wrapper.vm.board[0]).toBe('X');
    expect(wrapper.vm.currentPlayer).toBe('O');
  });

  it('não permite jogada em célula ocupada', async () => {
    wrapper.vm.board[0] = 'X';
    const button = wrapper.findAll('button')[0];
    await button.trigger('click');
    expect(wrapper.vm.board[0]).toBe('X');
    expect(wrapper.vm.currentPlayer).toBe('X');
  });

   it('detecta vitória em linha', async () => {
    // Configura o tabuleiro com uma linha vencedora para X
    wrapper.vm.board = ['X', 'X', 'X', '', '', '', '', '', ''];
    wrapper.vm.currentPlayer = 'X';
    // Chama checkWinner diretamente para verificar a vitória
    const hasWinner = wrapper.vm.checkWinner();
    expect(hasWinner).toBe(true);
    // Simula uma jogada para atualizar o estado winner
    await wrapper.vm.makeMove(3); // Faz uma jogada em uma célula vazia para disparar a verificação
    expect(wrapper.vm.winner).toBe('X');
  });

  it('detecta empate', async () => {
    // Configura o tabuleiro com uma única célula vazia
    wrapper.vm.board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', ''];
    wrapper.vm.currentPlayer = 'O';
    await wrapper.vm.makeMove(8); // Preenche a última célula
    expect(wrapper.vm.winner).toBe('draw');
  });

  it('reseta o jogo corretamente', async () => {
    wrapper.vm.board = ['X', 'O', 'X', '', '', '', '', '', ''];
    wrapper.vm.winner = 'X';
    await wrapper.vm.resetGame();
    expect(wrapper.vm.board).toEqual(Array(9).fill(''));
    expect(wrapper.vm.currentPlayer).toBe('X');
    expect(wrapper.vm.winner).toBe(null);
  });
});