<template>
  <el-card style="margin: 2%;">
    <div class="titles">
      历史记录
    </div>
    <div style="display: flex; justify-content: center; align-items: center;">
      <el-form :model="form" label-width="auto" style="width: 100%;">
        <el-form-item>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" />
            <el-table-column label="搜索图片">
              <template #default="scope">
                <div style="display: flex;">
                  <img v-for="(img, index) in scope.row.url" :key="index" :src="img" style="width: 100px; height: 100px; margin-right: 10px;" />
                </div>
              </template>
            </el-table-column>
          </el-table>
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

const tableData = reactive([
  {
    date: '2024-05-22',
    url: ['https://img0.baidu.com/it/u=2483062109,1177992966&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500', 'https://img0.baidu.com/it/u=3765743875,939455624&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500','https://img0.baidu.com/it/u=709389818,15662528&fm=253&fmt=auto&app=120&f=JPEG?w=888&h=500'],
  },
  {
    date: '2024-05-21',
    url: ['https://img2.baidu.com/it/u=4045227172,4104743055&fm=253&fmt=auto&app=120&f=BMP?w=702&h=463', 'https://img1.baidu.com/it/u=784707667,530320587&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500'],
  },
  {
    date: '2024-05-20',
    url: ['https://img1.baidu.com/it/u=1730411475,2835891282&fm=253&fmt=auto&app=120&f=JPEG?w=774&h=500', 'https://img1.baidu.com/it/u=583314903,1959710829&fm=253&fmt=auto&app=138&f=JPEG?w=844&h=500','https://img1.baidu.com/it/u=1960993222,2198587100&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888'],
  },
  {
    date: '2024-05-19',
    url: ['https://img2.baidu.com/it/u=3344098603,645694242&fm=253&fmt=auto&app=120&f=BMP?w=420&h=336','https://img0.baidu.com/it/u=4246198073,615921092&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333','https://img2.baidu.com/it/u=1337581811,775897178&fm=253&fmt=auto&app=120&f=JPEG?w=607&h=405','https://img2.baidu.com/it/u=2278716588,4104613696&fm=253&fmt=auto&app=120&f=JPEG?w=634&h=475','https://img0.baidu.com/it/u=1683647355,2564006800&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'],
  },
])
</script>

<style scoped>
.titles {
  font-size: 17px;
  color: #111;
  text-align: left;
  font-weight: bold;
}
</style>
