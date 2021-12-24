<template>
    <div class="row">
        <div class="card" v-for="user in users" :key="user.id">
            <a :href="user.html_url" target="_blank">
                <img :src="user.avatar_url" style="width:100px"/>
            </a>
            <p class="card-text">{{user.login}}</p>
        </div>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    data() {
        return {
            users:[]
        }
    },
    mounted() {
        this.pubId = pubsub.subscribe('dataTodo',this.getusers)
    },
    beforeDestroy() {
        pubsub.unsubscribe(this.pubId)
    },
    methods: {
        getusers(_,some){
            
            this.users = some
            console.log("@",this.users)
            
        },
    },
}
</script>

<style scoped>
.row {
  margin-right: -15px;
  margin-left: -15px;
}
.album {
    min-height: 50rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
}
.card{
    float: left;
    width: 30.833%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #000;
    text-align: center;
}

.card > img{
    margin-bottom: .75rem;
    border-radius: 100px;
}
.card-text{
    font-size: 85%;
}
</style>