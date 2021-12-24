<template>
  <el-table
    border
    style="width: 100%"
    :data="table"
    v-loading="loading"
    element-loading-text="拼命加载中"
    :header-cell-style="headClass"
    :cell-style="rowClass"
  >
    <el-table-column prop="id" label="编号" width="180"> </el-table-column>
    <el-table-column prop="name" label="商品名称" width="280">
    </el-table-column>
    <el-table-column prop="price" label="单价"> </el-table-column>
    <el-table-column prop="number" label="库存"> </el-table-column>
  </el-table>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Commodity",

  data() {
    return {
      loading: false,
    };
  },
  methods: {
    headClass() { //表头居中显示
        return "text-align:center;background-color: #E0FFFF;"
    },
    rowClass() { //表格数据居中显示
        return "text-align:center;background-color: #E0FFFF;"
    }
  },
  mounted() {
    this.loading = true;
    // clearTimeout(clear)
    // var clear = setTimeout(() => {
       this.$axios.get("/commodity").then((v) => {
        const com = v.data;
        this.$store.commit("record", com);
        this.loading = false
      })
    // }, 300);
  //   setTimeout(() => {
  //     this.$axios.get("https://www.fastmock.site/mock/746b3ac0671b15ec7dbaa430e4297d2c/ditu1/commodity").then((res) => {
  //     const com = res.data;
  //     this.$store.commit("record", com);
  //     this.loading = false;
  //   });
  //  }, 500);    
  },
  computed: {
    ...mapState(["table"]),
  },
};
</script>

<style>

</style>
