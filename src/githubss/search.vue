<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">搜素github用户名</h3>
        <div>
            <input type="text" placeholder="search" v-model="keyval"/>&nbsp;
            <button @click="getusers">搜素</button>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import pubsub from 'pubsub-js'
export default {
    data() {
        return {
            keyval:'',
            tabledata:[]
        }
    },
    methods: {
        getusers(){
            this.$loading.show('拼命加载中。。。')
            axios.get(`https://api.github.com/search/users?q=${this.keyval}`).then(
                (res) => {
                    this.tabledata = res.data.items
                    // console.log(this.tabledata)
                    pubsub.publish('dataTodo',this.tabledata)
                    this.$loading.hide()
                },
                error => {
                    this.$loading.hide()
                    console.log(error.message)
                }
            )
        }
    },
}
</script>

<style>
/* .jumbotron {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eeeeee;
}
.jumbotron h1,
.jumbotron .h1 {
  color: inherit;
}
.jumbotron p {
  margin-bottom: 15px;
  font-size: 21px;
  font-weight: 200;
}
.jumbotron > hr {
  border-top-color: #d5d5d5;
}
.container .jumbotron,
.container-fluid .jumbotron {
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 6px;
}
.jumbotron .container {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .jumbotron {
    padding-top: 48px;
    padding-bottom: 48px;
  }
  .container .jumbotron,
  .container-fluid .jumbotron {
    padding-right: 60px;
    padding-left: 60px;
  }
  .jumbotron h1,
  .jumbotron .h1 {
    font-size: 63px;
  }
} */
</style>