<template>
	<div class="page">
		<div class="content">
			<h1>光遇红石日历{{time}}</h1>

			<div v-if="loading" class="loading">
				<v-progress-circular indeterminate></v-progress-circular>
				<p>加载中...</p>
			</div>


			<div v-else-if="error" class="error">
				<p>{{ error }}</p>
				<v-btn color="primary" @click="loadData">重试</v-btn>
			</div>

			<div v-if="imageLoading" class="image-loading">
				<v-progress-circular indeterminate></v-progress-circular>
				<p>加载图片中...</p>
			</div>
			<div v-else-if="imageError" class="image-error">
				<p>{{ imageError }}</p>
				<v-btn color="primary" @click="fetchSuperCandleImage">重试</v-btn>
			</div>
			<div v-else-if="imageUrl" class="calendar-image">
				<v-img :src="imageUrl" contain max-width="100%" height="auto" max-height="600" rounded></v-img>
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
				signString: null,
				signature: null,
				timestamp: Math.floor(Date.now() / 1000),
				apikey: "Your APIKEY",
				secretKey: "c3b4558a7454ef28ea33418a9f22c4f7",
				imageUrl: '',
				imageLoading: false,
				imageError: null,
				time: null,
			}
		},
		mounted() {
			this.getSignature();
			if (!this.imageUrl) {
				this.fetchSuperCandleImage();
			}

		},
		methods: {
			getSignature() {
				this.signString = `key=${this.apikey}&timestamp=${this.timestamp}`;
				this.signature = CryptoJS.HmacSHA256(this.signString, this.secretKey);
			},
			// 关闭页面
			close() {
				this.$emit('close');
			},
			async fetchSuperCandleImage() {
				this.imageLoading = true;
				this.imageError = null;
				try {
					fetch(`https://ovoav.com/api/sky/hstp/hsc/hsrl?key=Your APIKEY&time=2026年${this.getCurrentTime()}月碎石`, {
							headers: {
								'X-Api-Key': this.apikey,
								'X-Api-Timestamp': String(this.timestamp),
								'X-Api-Sign': this.signature,
								'Content-Type': 'application/json'
							}
						})
						.then(response => response.blob())
						.then(blob => {
							this.imageUrl = URL.createObjectURL(blob);
						})
						.catch(error => console.error('Error fetching image:', error));
				} catch (err) {
					this.imageError = err.message;
				} finally {
					this.imageLoading = false;
				}
			},
			getCurrentTime() {
				const now = new Date();
				this.time = now.toLocaleDateString();
				const month = String(now.getMonth() + 1).padStart(2, '0');
				return month
			},
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
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.page-content {
		margin: 2rem 0;
		text-align: left;
	}

	.loading,
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 2rem 0;
		padding: 1rem;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
	}

	.loading p,
	.error p {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.error {
		color: #ff6b6b;
	}
</style>