<template>
	<div>
		<!-- leftbackground  跟  leftcolor是我自定义设置的 -->
		<div :style="{backgroundColor: $store.state.background,color:$store.state.textcolor}" class='DivClass'>
			演示
		</div>
		<!-- element-ui 颜色选择器 -->
		<el-color-picker v-model="$store.state.background"></el-color-picker>
		<el-color-picker v-model="$store.state.textcolor"></el-color-picker>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			this.$store.state.background='#fff'  //设置默认背景颜色
			this.$store.state.textcolor='#606266'//设置默认字体颜色
		}
	}
</script>
<style>
	.DivClass{
		height:200px;
		width:200px;
	}
</style>
