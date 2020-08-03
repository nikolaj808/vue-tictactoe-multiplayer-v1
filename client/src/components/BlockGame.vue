<template>
  <div>
    <canvas
      ref="game"
      width="640"
      height="480"
      style="border: 1px solid black;">
    </canvas>
    <p>
      <button @click.prevent="move('right')">Right</button>
      <button @click.prevent="move('left')">Left</button>
      <button @click.prevent="move('up')">Up</button>
      <button @click.prevent="move('down')">Down</button>
    </p>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'BlockGame',
  data() {
    return {
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    move(direction) {
      this.socket.emit('move', direction);
    }
  },
  created() {
    this.socket = io('http://localhost:3000');
  },
  mounted() {
    this.context = this.$refs.game.getContext('2d');
    this.socket.on('position', (pos) => {
      this.position = pos;
      this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  },
}
</script>

<style scoped>
</style>