<template>
    <div>
    <!-- Button trigger modal -->
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#joinGameModal">
        Join a game
        </button>

        <!-- Modal -->
        <div class="modal fade" id="joinGameModal" tabindex="-1" role="dialog" aria-labelledby="joinGameModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title text-center" id="joinGameModalLabel">Start a game</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form>
            <div class="modal-body">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="username" class="form-control" name="username" id="username" type="text" placeholder="Enter a username" aria-describedby="usernameHelp" autocomplete="off" autofocus>
                        <small id="usernameHelp" class="form-text text-muted">This is just a name to display in the game.</small>
                    </div>
                    <div class="form-group">
                        <label for="roomid">Room link</label>
                        <input v-model="roomid" class="form-control" name="roomid" id="roomid" type="text" placeholder="Enter the room link" aria-describedby="roomHelp" autocomplete="off">
                        <small id="roomHelp" class="form-text text-muted">Copy and paste the full room id.</small>
                    </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success" data-dismiss="modal" @click="joinGame">Join</button>
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
    name: 'JoinGameModal',
    store,
    data() {
        return {
            username: '',
            roomid: null,
        }
    },
    methods: {
        joinGame() {
            this.$store.state.roomid = this.roomid;
            this.$store.state.socket.emit('joinRoom', {
                username: this.username,
                roomid: this.roomid
            });
            this.$router.push({ path: 'room/' + this.roomid });
        }
    }
}
</script>

<style scoped>

</style>