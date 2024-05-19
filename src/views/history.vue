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
            历史记录
        </div>
        <div style="display: flex;justify-content: center;align-items: center;">
            <el-form :model="form" label-width="auto" style="width: 100%;" >
                <el-form-item >
                    <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期"  />
                    <el-table-column prop="name" label="名称" />
                    <el-table-column prop="address" label="Address" />
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

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>