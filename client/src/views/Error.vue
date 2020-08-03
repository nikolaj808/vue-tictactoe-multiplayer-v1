<template>
    <div>
        <h1 class="text-center">An error occurred..</h1>
        <h3 class="text-center">An error occurred while trying to start or join a game.</h3>
        <button class="btn btn-secondary" @click.prevent="back">Back to home</button>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.push('/');
        }
    },
    mounted() {
        console.log(this.$route.params);
    }
}
</script>

<style scoped>

</style>