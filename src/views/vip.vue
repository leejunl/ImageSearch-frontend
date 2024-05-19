<style scoped>
.titles {
    font-size: 17px;
    color: #111;
    text-align: left;
    font-weight: bold;

}
</style>

<template>
    <el-card style="margin: 2%;">
        <div class="titles">
            会员中心
        </div>
        <div style="display: flex;justify-content: center;align-items: center;">
            <el-form :model="form" label-width="auto" style="width: 600px" >
                <el-form-item >
                    <span class="titles">会员将开启新特权，快扫码添加客服注册会员吧！</span>    
               </el-form-item>
               <el-form-item>
                <img style="width: 300px; margin-left: 10%;" src="../assets/code.jpg"  alt="vip" />
               </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    word: '',
    url: '',
    cookies: '',
    code: 1,
    istext: 'no'
})
</script>