<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-card class="card">
          <div class="titles">
            图片搜图
          </div>
          <el-upload
            class="upload-demo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
            :auto-upload="false"
            list-type="picture"
            @change="changeFile"
            :data="uploadForm.data"
            ref="uploadRef"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">点 击 上 传</el-button>
            <template #tip>
              <div class="el-upload__tip">
                <el-button
                  class="ml-3"
                  type="success"
                  v-loading.fullscreen.lock="loading"
                  element-loading-text="正在全力加载中 ..."
                  @click="submitUpload"
                >
                  <el-icon>
                    <Search />
                  </el-icon>
                  &nbsp;开始搜图
                </el-button>
                <el-button type="warning" @click="initAll">重置</el-button>
              </div>
            </template>
          </el-upload>
        </el-card>
        <el-card class="card">
          <div class="titles">
            数据分析
          </div>
          <div v-if="!tempdatas.names.length" style="width: 100%;height: 50px; text-align: center;color: #a29e9e;">
            查询图片后，此处将展示数据相似度信息
          </div>
          <div id="ec" v-else style="width: 100%;height: 300px;"></div>
        </el-card>
        <el-card class="card">
          <div class="titles">
            搜索结果
          </div>
          <div v-if="!tempdatas.names.length" style="width: 100%;height: 50px; text-align: center;color: #a29e9e;">
            查询图片后，此处将展示数据查询结果
          </div>
          <el-scrollbar v-else style="height: 400px; margin-top: 10px;">
            <el-row :gutter="10">
              <el-col v-for="image in images" :key="image.filename" :span="4">
                <el-card :body-style="{ padding: '0' }" class="image-card">
                  <div class="image-container">
                    <img :src="'data:image/jpeg;base64,' + image.source" :alt="image.title" class="image-item">
                  </div>
                  <div class="text item">{{ image.title }}</div>
                  <div class="text item">相似度：{{ image.score }}</div>
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
import { ElMessage, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import axios from 'axios'
import * as echarts from 'echarts'

const uploadRef = ref<UploadInstance>()
const file = ref()
const images = reactive<any>([])
const tempdatas = reactive({
  names: <any>[],
  score: <any>[]
})

const initAll = () => {
  tempdatas.names = []
  images.length = 0
  uploadRef.value!.clearFiles()
}

const changeFile = (uploadFile: any) => {
  file.value = uploadFile
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

const loading = ref(false)

const submitUpload = () => {
  const formData = new FormData()
  formData.append('image', file.value.raw)
  loading.value = true

  axios.post('/api/upload/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(result => {
    images.length = 0
    tempdatas.names.length = 0
    tempdatas.score.length = 0

    result.data.data.forEach((item: any) => {
      images.push({
        title: item.filename,
        link: '#',
        source: item.source,
        score: item.score
      })
      tempdatas.names.push(item.filename)
      tempdatas.score.push(item.score * 100)
    })

    ElMessage.success('搜索成功！')
  }).finally(() => {
    loading.value = false
    createEcharts()
  })
}

const uploadForm = reactive({
  data: {
    fileId: '',
    name: '',
    type: ''
  }
})

const createEcharts = () => {
  type EChartsOption = echarts.EChartsOption

  const chartDom = document.getElementById('ec')!
  const myChart = echarts.init(chartDom)
  const dataAxis = tempdatas.names
  const data = tempdatas.score
  const yMax = 500
  const dataShadow = new Array(data.length).fill(yMax)

  const option: EChartsOption = {
    title: {
      text: '特性相似度：',
      subtext: '可点击缩放'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: { show: false },
      axisLine: { show: false },
      z: 10
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' }
    },
    dataZoom: [{ type: 'inside' }],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: data
      }
    ]
  }

  myChart.on('click', (params) => {
    const zoomSize = 6
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    })
  })

  myChart.setOption(option)
}
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
  overflow: hidden;
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


