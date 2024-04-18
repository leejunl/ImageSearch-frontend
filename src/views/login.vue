<template>
  <div class="login-container" style="height: 100%;width:100%;position:fixed">
    <div class="login-box">
      <div class="left">
        <img src="/src/assets/side-logo2.svg" alt="" style="width: 100%;">
      </div>
      <div class="right">
        <form class="login-form" @submit.prevent="submitForm">
          <h2 class="login-title"><el-icon style="width: 3rem; height: 3rem; margin-right: 0.2rem;">
              <Search />
            </el-icon>
            <strong style="margin-top: 2.1%;">以图搜图系统</strong>
          </h2>
          <el-form-item prop="username">
            <el-input v-model="form.username" name="username" :prefix-icon="User" :readonly="loading" :clearable="true"
              placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" name="password" v-model="form.password" :readonly="loading" :prefix-icon="Lock"
              :clearable="true" show-password placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;height:3rem;font-size: 1.2rem;" native-type="submit"
              :loading="loading">登&nbsp;&nbsp;&nbsp;录</el-button>
          </el-form-item>

        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'

import { useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'


const form = ref({
  domain: "",
  username: '',
  password: '',
})

const loading = ref(false)
const router = useRouter()

const submitForm = async () => {
  loading.value = true


  if (form.value.username == '' || form.value.password == '') {
    return ElMessage.error("请填写账号或密码"), loading.value = false
  }
  try {
    if (form.value.username == 'admin' && form.value.password == '123') {
      router.push({ name: 'info' })
      ElMessage.success("登陆成功！")
    } else {
      ElMessage.error("账号、密码不正确，请重试")
    }
  } catch (error) {
    console.error(error)

  } finally {
    loading.value = false
  }
}

onMounted(() => {

})



</script>

<style scoped>
.register-form .el-input {
  width: 250px;

}

.register-form .el-form-item {
  width: 500px;
  margin: 10px 100px 5px auto;
}

.register-form .el-form-item__content {
  width: 100%;
}

.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}

.login-container {
  background-color: #f0f2f5;
  height: 100%;
  width: 100%;
}

.login-box {
  width: 96%;
  height: 92%;
  background-color: #fff;
  margin: 2% !important;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  width: 50%;
  height: 100%;
  border-radius: 30px;
  padding: 2%;
  display: flex;

}

.right {
  border-radius: 25px;
  box-shadow: 0 2px 12px #0000001a;
  box-sizing: border-box;
  padding: 2%;
}

.login-form {
  width: 400px;
  padding: 20px;
  background-color: #fff;
}

.login-form .el-input {
  height: 3rem;
}

.login-title {
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
