<template>
    <div>
    <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#startGameModal">
            Start a game
        </button>

        <!-- Modal -->
        <div class="modal fade" id="startGameModal" tabindex="-1" role="dialog" aria-labelledby="startGameModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="startGameModalLabel">Start a game</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input v-model="username" class="form-control" name="username" id="username" type="text" placeholder="Enter a username" aria-describedby="usernameHelp" autocomplete="off">
                                <small id="usernameHelp" class="form-text text-muted">This is just a name to display in the game.</small>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-dismiss="modal" @click.prevent="createGame">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: 'StartGameModal',
    store,
    data() {
        return {
            username: ''
        }
    },
    methods: {
        createGame() {
            var room = this.getRandomInt(1, 1000001);
            this.$store.state.roomid = room;
            this.$store.state.socket.emit('createRoom', {
                username: this.username,
                roomid: room
            });
            this.$router.push({ path: 'room/' + room });
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