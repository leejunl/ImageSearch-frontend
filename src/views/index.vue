<template>
  <el-menu :default-active="menu" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <!-- https://element-plus.gitee.io/images/element-plus-logo.svg -->
      <img style="width: 100px" src="../assets/element-plus-logo.svg"  alt="Element logo" />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="menu = '1'">以图搜图</el-menu-item>
    <el-menu-item index="2" @click="menu = '2'">文字搜图</el-menu-item>
    <el-menu-item index="3" @click="menu = '3'">数据爬取</el-menu-item>
    <el-menu-item index="5" @click="menu = '5'">历史记录</el-menu-item>
    <el-menu-item index="6" @click="menu = '6'">会员中心</el-menu-item>
    <el-menu-item index="4" @click="menu = '4'">个人中心</el-menu-item>
    
  </el-menu>

  <div v-show="menu === '1'">
    <search />
  </div>

  <div v-show="menu === '2'">
    <textsearch />
  </div>

  <div v-show="menu === '3'">
    <spyder />
  </div>
  <div v-show="menu === '4'">
    <userinfo />
  </div>
  <div v-show="menu === '5'">
    <history />
  </div>
  <div v-show="menu === '6'">
    <vip />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import search from './search.vue';
import spyder from './spyder.vue';
import userinfo from './userinfo.vue';
import textsearch from './textsearch.vue';
import history from './history.vue';
import vip from './vip.vue';
const menu = ref('1');
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
