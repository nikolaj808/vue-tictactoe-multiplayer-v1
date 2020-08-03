<template>
  <div class="d-flex flex-column align-items-center">
      <div class="room-header">
          <h1>Welcome to room: {{ $store.state.roomid }}</h1>
      </div>
      <div class="turn-header">
          <h3 v-if="checkTurn()">Your turn ({{ $store.state.myPlayer}})</h3>
          <h3 v-if="!checkTurn()">Opponents turn ({{ $store.state.player }})</h3>
      </div>
      <div class="board">
          <Board />
      </div>
      <div>
          <br>
          <button class="btn btn-secondary" @click.prevent="leaveRoom">Leave</button>
      </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import store from '@/store';

export default {
    name: 'Game',
    store,
    components: {
        Board
    },
    methods: {
        checkTurn() {
            return this.$store.state.player === this.$store.state.myPlayer;
        },
        leaveRoom() {
            this.$store.state.socket.emit('leaveRoom');
            this.$store.state.board = ['', '', '', '', '', '', '', '', ''];
            this.$store.state.player = '';
            this.$store.state.myPlayer = '';
            this.$store.state.playing = false;
            this.$store.state.roomid = null;
            this.$router.push({ path: '/' });
        }
    }

}
</script>

<style scoped>

</style>