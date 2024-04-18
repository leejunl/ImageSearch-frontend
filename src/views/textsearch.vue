<template>
    <div class="common-layout">
        <el-container>
            <el-main>
                <el-card class="card">
                    <div class="titles">
                        文字搜图
                    </div>

                    <el-form :model="form" label-width="auto" style="width: 600px;margin: auto;">
                        <el-form-item label="搜索关键字">
                            <el-input v-model="form.word" />
                        </el-form-item>
                        <el-button type="primary" @click="onSubmit" style="margin: auto;width: 48%;margin: 1%;"
                            v-loading.fullscreen.lock="loading" element-loading-text="正在全力加载中 ...">开始搜索</el-button>
                        <el-button type="primary" @click="oninit"
                            style="margin: auto;width: 48%;margin: 1%;">清空重置</el-button>
                    </el-form>
                </el-card>

                <el-card class="card">
                    <div class="titles">
                        搜索结果
                    </div>
                    <div v-if="!tempdatas.names[1]"
                        style="width: 100%;height: 50px; text-align: center;color: #a29e9e;">
                        查询图片后，此处将展示数据查询结果
                    </div>
                    <el-scrollbar v-else style="height: 400px; margin-top: 10px;">
                        <el-row :gutter="10">
                            <el-col v-for="image in images" :key="image.filename" :span="4">
                                <el-card :body-style="{ padding: '0' }" class="image-card">
                                    <div class="image-container">
                                        <img :src="image.source" :alt="image.title" class="image-item">
                                    </div>
                                    <div class="text item">{{ image.title }}</div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-scrollbar>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios';

const images = reactive<any>([]);
const tempdatas = reactive({
    names: <any>[],
    score: <any>[]
})


const form = reactive({
    word: '',
    url: '',
    cookies: '',
    code: 1,
    istext: 'yes'
})

const oninit = () => {
    form.word = ''
    form.url = ''
    form.cookies = ''
}

const loading = ref(false)
const onSubmit = () => {
    const formData = new FormData();
    formData.append('word', form.word)
    formData.append('url', form.url.split('word=')[0])
    formData.append('cookies', form.cookies)
    formData.append('istext', form.istext)
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
                images.value = []
                tempdatas.names = []
                tempdatas.score = []
                for (let i in result.data.data.data) {
                    console.log()
                    images.push({
                        title: result.data.data.data[i].filename,
                        link: '#',
                        source: result.data.data.data[i].source,
                        score: ''
                    })
                    tempdatas.names.push(result.data.data.data[i].filename)

                }

                ElMessage.success('搜索成功')
                loading.value = false
            } else if (result.data.code === 500) {
                ElMessage.error('搜索失败！当前网络波动大')
                loading.value = false
            }
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


</script>

<style scoped>
.titles {
    font-size: 17px;
    color: #111;
    text-align: left;
    font-weight: bold;
}

.text {
    margin-top: 10px;
    text-align: center;
}

.image-card {
    width: 100%;
}

.card {
    margin: 2%;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    /* 设置图片容器的高度 */
    overflow: hidden;
    /* 控制图片超出容器部分隐藏 */
}

.image-item {
    width: 100%;
    height: auto;
    transition: transform 0.2s ease-in-out;
}

.image-item:hover {
    transform: scale(1.1);
}
</style>