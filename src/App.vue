<template>
	<!-- <navbar v-if="!isLoginPage"></navbar> -->
	<div style="width: 100%; height: 100%;">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
// import navbar from '@/components/layouts/component/navbar.vue';
export default {
	name: 'App',
	components: {
		// navbar
	},
	computed: {
		// 计算属性，根据当前路由路径判断是否是登录页面
		// isLoginPage() {
		// 	return this.$route.path === '/login';
		// }
	}
};
</script>

<style lang="scss">
html,
body {
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
	
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	width: 100%;
	margin: 0 !important;
	padding: 0 !important;
	display: flex !important;
	max-width: 100% !important;
}
</style>