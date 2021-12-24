<template>
  <div class="box">
    <cat :listdata="foods" title="美食">
      <!-- <img src="../assets/ids.png"> -->
      <!-- 默认插槽 -->
      <template slot-scope="{shuju}"><!-- 可加slot="插槽name" -->
            <ul v-for="(list,index) in shuju" :key="index">
              <li>{{list}}</li>
            </ul>
      </template><!-- 作用域插槽 -->
      <p slot="two">美食</p><!-- 具名插槽 -->
    </cat>
    <cat :listdata="games" title="游戏"></cat>
    <cat :listdata="moves" title="电影"></cat>
  </div>
</template>

<script>
import cat from './category.vue'

export default {
  components: {
    cat
  },
  data() {
      return {
        foods:['烧烤','741','852','963'],
        games:['qwe','asd','zxc','rty'],
        moves:['poi','lkj','mnb','uyt']
      }
  },
}
</script>

<style>
.box{
  display: flex;
  justify-content: space-around;
}
</style>
