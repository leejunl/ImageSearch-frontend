<template>
    <el-card style="margin: 2%;">
        <div class="titles">
            用户资料
        </div>
        <div style="display: flex;justify-content: center;align-items: center;">
            <el-form :model="form" label-width="auto" style="width: 600px">
                <el-form-item label="昵称">
                    <el-input v-model="form.name" placeholder="请填写昵称" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-select 
                        v-model="form.gender"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone" placeholder="请填写电话" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="请填写邮箱" />
                </el-form-item>
                <el-form-item label="用户头像">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-remove="handleRemove"
                        v-model:file-list="fileList"
                    >
                        <el-icon><Plus /></el-icon>
                        <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <el-icon><zoom-in /></el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                        <el-icon><Download /></el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                        <el-icon><Delete /></el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
                <el-button class="ml-3" v-loading.fullscreen.lock="loading" element-loading-text="正在全力加载中 ..." @click="oninit" style="margin: auto;width: 48%;margin: 1%;">取消</el-button>
                <el-button type="primary" @click="onSubmit" style="margin: auto;width: 48%;margin: 1%;">确认</el-button>
            </el-form>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import { genFileId } from 'element-plus';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const fileList = ref<UploadFile[]>([]);

const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex(f => f.uid === file.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};

const upload = ref<UploadInstance>();

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const form = reactive({
  name: '小陈',
  phone: '19245741564',
  email: '14512454@163.com',
  gender: '0',
});

const options = [
  {
    value: '1',
    label: '男',
  },
  {
    value: '0',
    label: '女',
  }
];

const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
  try {
    // Add your form submission logic here
    // Example:
    // await axios.post('/api/user', form);
    if (form.name ==''){
        ElMessage.error('资料不能为空');
    }else{
        ElMessage.success('提交成功');
    }
  } catch (error) {
    ElMessage.error('提交失败');
  } finally {
    loading.value = false;
  }
};

const oninit = () => {
  form.name = '';
  form.phone = '';
  form.email = '';
  form.gender = '';
  fileList.value = [];
};
</script>

<style scoped>
.titles {
    font-size: 17px;
    color: #111;
    text-align: left;
    font-weight: bold;
}
</style>
