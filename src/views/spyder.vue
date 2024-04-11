<template>
    <el-card style="margin: 2%;display: flex;justify-content: center;align-items: center">
        <el-form :model="form" label-width="auto" style="width: 600px">
            <el-form-item label="爬取关键字">
                <el-input v-model="form.word" />
            </el-form-item>
            <el-form-item label="URL" v-show="form.code == 500">
                <el-input v-model="form.url" />
            </el-form-item>
            <el-form-item label="COOKIES" v-show="form.code == 500">
                <el-input v-model="form.cookies" type="textarea" />
            </el-form-item>
            <el-button type="primary" class="ml-3" @click="onSubmit" v-loading.fullscreen.lock="loading"
                element-loading-text="正在全力加载中 ..." style="margin: auto;width: 48%;margin: 1%;">开始爬取</el-button>

            <el-button type="primary" @click="oninit" style="margin: auto;width: 48%;margin: 1%;">清空重置</el-button>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
// do not use same name with ref
const form = reactive({
    word: '',
    url: '',
    cookies: '',
    code: 1
})
const loading = ref(false)
const onSubmit = () => {
    const formData = new FormData();
    formData.append('word', form.word)
    formData.append('url', form.url.split('word=')[0].toString + 'word=')
    formData.append('cookies', form.cookies)
    if (form.word == '') {
        ElMessage.error('关键字不能为空！')
    } else {
        loading.value = true
        const url = '/api/spyder/';
        const method = 'post';
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        axios({
            method,
            url,
            data: formData,
            headers
        }).then(result => {
            if (result.data.code === 200) {
                form.code = 200
                ElMessage.success('爬取成功')
            }
            loading.value = false
        }).catch(error => {
            if (error.response && error.response.status === 403) {
                ElMessage.error('请求被拒绝，请检查您的访问权限！')
            } else if (error.response.status === 500) {
                form.code = 500
                ElMessage.error('身份过期')
            } else {
                ElMessage.error('发生了未知错误，请稍后重试！')
            }
            loading.value = false
        });
    }

};

const oninit = () => {
    form.word = ''
    form.url = ''
    form.cookies = ''
}
</script>