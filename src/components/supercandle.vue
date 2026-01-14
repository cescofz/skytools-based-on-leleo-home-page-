<template>
  <div class="page">
    <div class="content">
      <h1>今日大蜡烛位置</h1>
      
      <div v-if="imageLoading" class="image-loading">
        <v-progress-circular indeterminate></v-progress-circular>
        <p>加载图片中...</p>
      </div>
      <div v-else-if="imageError" class="image-error">
        <p>{{ imageError }}</p>
        <v-btn color="primary" @click="fetchSuperCandleImage">重试</v-btn>
      </div>
      <div v-else-if="imageUrl" class="supercandle-image">
        <v-img :src="imageUrl" contain max-width="100%" height="auto" max-height="600" rounded></v-img>
      </div>
      
      <v-btn color="primary" class="mt-4" @click="close">关闭</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      imageLoading: false,
      imageError: null
    }
  },
  mounted() {
    // 只有在没有图片URL时才调用API
    if (!this.imageUrl) {
      this.fetchSuperCandleImage();
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async fetchSuperCandleImage() {
      this.imageLoading = true;
      this.imageError = null;
      try {
        this.imageUrl = 'https://api.t1qq.com/api/sky/sc/scdl?key=Your APIKEY';
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
.supercandle-image {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}
.supercandle-image img {
  max-width: 100%;
  height: auto;
}
</style>