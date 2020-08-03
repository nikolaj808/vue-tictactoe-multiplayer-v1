<template>
  <div>
      <button @click.prevent="move(spot)">{{ $store.state.board[spot - 1] }}</button>
  </div>
</template>

<script>
import store from "@/store";

export default {
    name: 'Square',
    store,
    props: {
        spot: Number
    },
    methods: {
        move(spot) {
            if (this.myTurn()) {
                this.$store.state.socket.emit('move', {spot: spot - 1, roomid: this.$store.state.roomid});
            }
        },
        myTurn() {
            return this.$store.state.player === this.$store.state.myPlayer;
        }
    }
}
</script>

<style scoped>
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #C0D6DF;
        font-size: 40px;
        margin: 2px;
        width: 100px;
        height: 100px;
        border-radius: 5%;
        border: 2px solid black;
    }

    button:hover {
        background-color: #d8e2e6;
    }
</style>