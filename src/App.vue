<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">Jogo da Velha</h1>
    <div v-if="winner" class="mb-4 text-xl">
      {{ winner === 'draw' ? 'Empate!' : `Jogador ${winner} venceu!` }}
    </div>
    <div class="mb-4 text-lg">Jogador atual: {{ currentPlayer }}</div>
    <div class="grid grid-cols-3 gap-2 w-64">
      <button
        v-for="(cell, index) in board"
        :key="index"
        class="w-20 h-20 bg-white border border-gray-300 text-2xl font-bold flex items-center justify-center"
        :disabled="cell !== '' || winner"
        @click="makeMove(index)"
      >
        {{ cell }}
      </button>
    </div>
    <button
      v-if="winner"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-100"
      @click="resetGame"
    >
      Jogar Novamente
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: Array(9).fill(''),
      currentPlayer: 'X',
      winner: null,
    };
  },
  methods: {
    makeMove(index) {
      if (this.board[index] === '' && !this.winner) {
        this.board[index] = this.currentPlayer;
        if (this.checkWinner()) {
          this.winner = this.currentPlayer;
        } else if (this.board.every(cell => cell !== '')) {
          this.winner = 'draw';
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    },
    checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6], // Diagonais
      ];
      return winPatterns.some(pattern =>
        pattern.every(index => this.board[index] === this.currentPlayer)
      );
    },
    resetGame() {
      this.board = Array(9).fill('');
      this.currentPlayer = 'X';
      this.winner = null;
    },
  },
};
</script>