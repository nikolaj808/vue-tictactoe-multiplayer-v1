<template>
    <div class="d-flex flex-column align-items-center">
        <h1>Welcome to Tic Tac Toe - Multiplayer</h1>
        <br>
        <div>
            <StartGameModal />
            <br>
            <JoinGameModal />
        </div>
    </div>
</template>

<script>
import store from "@/store";
import StartGameModal from "./StartGameModal";
import JoinGameModal from "./JoinGameModal";

export default {
  name: 'App',
  store,
  components: {
      StartGameModal,
      JoinGameModal
  },
  data() {
      return {
          username: ''
      }
  },
  methods: {
      startGame() {
          this.$store.state.socket.emit('joinRoom', {
              username: this.username,
              room: this.getRandomInt(1, 10001)
          });
      },
      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }
  }
}
</script>

<style scoped>

</style>