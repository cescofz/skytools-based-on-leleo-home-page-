<template>
  <div class="page">
    <div class="content">
      <h1>今日任务</h1>
	  
	  <p>HTTP状态码:{{code}}</p>
      <div v-if="loading" class="loading">
        <v-progress-circular indeterminate></v-progress-circular>
        <p>加载任务中...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <v-btn color="primary" @click="fetchDailyTasks">重试</v-btn>
      </div>
      <div v-else class="task-list">
        <div v-for="(task, index) in tasks" :key="index" class="task-item">
          <h3>任务 {{ index + 1 }}</h3>
          <p>{{ task.text }}</p>
        </div>
      </div>
      
      <div v-if="imageLoading" class="image-loading">
        <v-progress-circular indeterminate></v-progress-circular>
        <p>加载图片中...</p>
      </div>
      <div v-else-if="imageError" class="image-error">
        <p>{{ imageError }}</p>
        <v-btn color="primary" @click="fetchTaskImage">重试</v-btn>
      </div>
      <div v-else-if="imageUrl" class="task-image">
        <v-img :src="imageUrl" contain max-width="100%" height="auto" max-height="400" rounded></v-img>
      </div>
      
      <v-btn color="primary" class="mt-4" @click="close">关闭</v-btn>
    </div>
  </div>
</template>

<script>
	import CryptoJS from 'crypto-js';
export default {
  data() {
    return {
		tasks: [],
		code: '',
		loading: false,
		error: null,
		imageUrl: '',
		imageLoading: false,
		imageError: null
    }
  },
  mounted() {
    // 只有在没有任务数据时才调用API
    if (this.tasks.length === 0) {
      this.fetchDailyTasks();
    }
    // 只有在没有图片URL时才调用API
    if (!this.imageUrl) {
      this.fetchTaskImage();
    }
	
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async fetchDailyTasks() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://api.t1qq.com/api/sky/gyrw?key=Your APIKEY');
        if (!response.ok) {
          throw new Error('网络请求失败');
        }
        const data = await response.json();
		this.code = data.code;
        if (data.code === 200) {
          this.tasks = data.rw;
        } else {
          throw new Error(data.msg || '获取任务失败');
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchTaskImage() {
      this.imageLoading = true;
      this.imageError = null;
      try {

        this.imageUrl = 'https://api.t1qq.com/api/sky/sc/scrw?key=Your APIKEY';
      } catch (err) {
        this.imageError = err.message;
      } finally {
        this.imageLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  color: white;
  text-align: center;
}
.content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.task-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.task-item:hover {
  transform: translateY(-5px);
}
.task-item h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.task-item p {
  font-size: 1rem;
  margin-bottom: 0;
}
.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}
.loading p, .error p {
  margin-top: 1rem;
}
.image-loading, .image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}
.image-loading p, .image-error p {
  margin-top: 1rem;
}
.task-image {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}
.task-image img {
  max-width: 100%;
  height: auto;
}
</style>