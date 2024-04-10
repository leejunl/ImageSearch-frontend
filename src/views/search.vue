<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-card class="card">
          <div class="titles">
            图片搜图
          </div>
          <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove" :limit="1"
            :auto-upload="false" list-type="picture" @change="changeFile" :data="uploadForm.data" ref="uploadRef"
            :on-exceed="handleExceed">
            <el-button type="primary">点 击 上 传</el-button>
            <template #tip>
              <div class="el-upload__tip">
                <el-button class="ml-3" type="success" v-loading.fullscreen.lock="loading"
                  element-loading-text="正在全力加载中 ..." @click="submitUpload">
                  <el-icon>
                    <Search />
                  </el-icon>&nbsp;开始搜图
                </el-button>
                <el-button type="warning" @click="initall">重置</el-button>
              </div>
            </template>
          </el-upload>
        </el-card>
        <el-card class="card">
          <div class="titles">
            数据分析
          </div>
          <div v-if="!tempdatas.names[1]" style="width: 100%;height: 50px; text-align: center;color: #a29e9e;">
            查询图片后，此处将展示数据相似度信息
          </div>
          <div id="ec" v-else style="width: 100%;height: 300px;" </div>
        </el-card>
        <el-card class="card">
          <div class="titles">
            搜索结果
          </div>
          <div v-if="!tempdatas.names[1]" style="width: 100%;height: 50px; text-align: center;color: #a29e9e;">
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

import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import axios from 'axios';
import * as echarts from 'echarts';

const uploadRef = ref<UploadInstance>()
const file = ref();
const images = reactive<any>([]);
const tempdatas = reactive({
  names: <any>[],
  score: <any>[]
})



const initall = () => {
  tempdatas.names = []
  uploadRef.value!.clearFiles()
}

const changeFile = (uploadFile: any) => {
  file.value = uploadFile;
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

  const formData = new FormData();
  formData.append('image', file.value.raw);
  loading.value = true

  const url = '/api/upload/';
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
    images.value = []
    tempdatas.names = []
    tempdatas.score = []
    for (let i in result.data.data) {
      images.push({
        title: result.data.data[i].filename,
        link: '#',
        source: result.data.data[i].source,
        score: result.data.data[i].score
      })
      tempdatas.names.push(result.data.data[i].filename)
      tempdatas.score.push(result.data.data[i].score * 100)
    }
    loading.value = false
  }).finally(
    createEcharts
  );
};

const uploadForm = reactive({
  data: {
    fileId: '',
    name: '',
    type: ''
  }
})
const createEcharts = () => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById('ec')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  // prettier-ignore
  let dataAxis = tempdatas.names;
  // prettier-ignore
  let data = tempdatas.score;
  let yMax = 500;
  let dataShadow = [];

  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }

  option = {
    title: {
      text: '特性相似度：',
      subtext: '可点击缩放'
    },
    tooltip: {
      trigger: 'axis', // 触发类型为坐标轴轴线
      axisPointer: {    // 坐标轴指示器配置项
        type: 'shadow'  // 显示阴影指示器
      }
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
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
  };

  // Enable data zoom when user click bar.
  const zoomSize = 6;
  myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });

  option && myChart.setOption(option);
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
