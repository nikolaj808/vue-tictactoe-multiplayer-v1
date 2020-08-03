<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from '@/store';
import io from 'socket.io-client';

export default {
  name: 'App',
  store,
  mounted() {
    this.$store.state.socket = io('http://localhost:3000/');

    this.$store.state.socket.on('board', (board) => {
      this.$store.state.board = board;
    });

    this.$store.state.socket.on('player', (player) => {
      this.$store.state.player = player;
    });

    this.$store.state.socket.on('playing', (playing) => {
      this.$store.state.playing = playing;
    });

    this.$store.state.socket.on('myPlayer', (myPlayer) => {
      this.$store.state.myPlayer = myPlayer;
    });

    this.$store.state.socket.on('errorPage', () => {
      this.$store.state.board = ['', '', '', '', '', '', '', '', ''];
      this.$store.state.player = '';
      this.$store.state.myPlayer = '';
      this.$store.state.playing = false;
      this.$store.state.roomid = null;
      this.$router.push({ path: '/error' });
    })
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    box-sizing: border-box;
    margin: 100px 50px;
  }

  body {
    background-color: azure;
  }

  @import '~bootstrap/dist/css/bootstrap.css';
</style>
