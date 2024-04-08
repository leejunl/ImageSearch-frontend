<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <el-menu-item index="0">
      <img style="width: 100px" src="https://element-plus.gitee.io/images/element-plus-logo.svg" alt="Element logo" />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">以图搜图</el-menu-item>
    <el-menu-item index="2">数据爬取</el-menu-item>
  </el-menu>
  <div v-show="activeIndex == '1'">
    <search />
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import search from './search.vue';
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
  console.log(key, keyPath)

}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
