<template>
  <div class="cat">
    <h3>{{title}}分类</h3>
    <slot :shuju="name">
    <ul v-for="(list,index) in listdata" :key="index">
      <li>{{list}}</li>
    </ul>
    </slot>
    <slot name="two"></slot><!-- 具名插槽 -->
    <!-- <slot :shuju="name" name="haha"></slot> 作用域插槽     也可以拥有name -->
  </div>
</template>

<script>
export default {
  props:['listdata','title'],
  data() {
    return {
      name:['张三','李四','王五']
    }
  },
}
</script>

<style scoped>
.cat{
  background: aqua;
  width: 200px;
  height: 300px;
}
h3{
  background: bisque;
  text-align: center;
}
img{
  width: 100%;
}
</style>