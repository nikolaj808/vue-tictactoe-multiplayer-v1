<template>
  <div class="room">
      
  </div>
</template>

<script>
import Game from '@/components/Game.vue';
import io from 'socket.io-client';
import store from "@/store";

export default {
    name: 'Room',
    store,
    components: {
        Game
    },
    created() {
        this.$store.state.socket = io('http://localhost:3000');
    },
    mounted() {
        this.$store.state.socket.on('board', (board) => {
            this.$store.state.board = board;
        });
        this.$store.state.socket.on('player', (player) => {
            this.$store.state.player = player;
        });
        this.$store.state.socket.on('playing', (playing) => {
            this.$store.state.playing = playing;
        });
    }
}
</script>

<style scoped>

</style>