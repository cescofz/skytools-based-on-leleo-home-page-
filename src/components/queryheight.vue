<template>
	<div class="page">
		<div class="content">
			<h1>光遇国服身高查询工具</h1>
			<h2>请自行申请API Key并购买点数</h2>
			<button class="toapikey" @click="openInNewTab">点击申请APIKEY</button>

			<div class="api-form">
				<v-text-field v-model="key" label="API KEY" variant="outlined" required class="mb-4"></v-text-field>

				<v-text-field v-model="id" label="好友码(一个好友码只能查询一次哦)" variant="outlined" required
					class="mb-4"></v-text-field>

				<div v-if="loading" class="loading">
					<v-progress-circular indeterminate></v-progress-circular>
					<p>请求中...</p>
				</div>
				<div v-else-if="error" class="error">
					<p>{{ error }}</p>
					<v-btn color="primary" @click="fetchApiData">重试</v-btn>
				</div>
				<div v-else-if="responseText" class="response-data">
					<h3>请求成功</h3>
					<div class="response-text">
						<pre>{{ responseText }}</pre>
					</div>
					<!-- <v-btn color="primary" @click="clearResponse">清除结果</v-btn> -->
				</div>

				<v-btn color="primary" @click="fetchApiData" :disabled="loading || !key || !id" class="mt-4">
					确定
				</v-btn>
			</div>

			<v-btn color="primary" class="mt-4" @click="close">关闭</v-btn>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				key: '',
				id: '',
				loading: false,
				error: null,
				responseText: ''
			}
		},
		methods: {
			close() {
				this.$emit('close');
			},
			clearResponse() {
				this.responseText = '';
				this.error = null;
			},
			openInNewTab() {
				const url = 'https://www.ovoav.com/user/key';
				window.open(url, '_blank');
			},
			async fetchApiData() {
				if (!this.key || !this.id) {
					this.error = '请填写完整的参数';
					return;
				}
				this.loading = true;
				this.error = null;
				this.responseText = '';

				try {
					const url =
						`https://ovoav.com/api/sky/sgwz/skyd?key=${encodeURIComponent(this.key)}&id=${encodeURIComponent(this.id)}`;
					console.log('请求URL:', url);
					const response = await fetch(url);

					console.log('响应状态:', response.status);
					console.log('响应头:', response.headers);

					const text = await response.text();
					console.log('API响应文本:', text);

					if (!text) {
						this.error = 'API返回空数据';
						return;
					}

					this.responseText = text;
				} catch (err) {
					this.error = err.message;
					console.error('请求错误:', err);
				} finally {
					this.loading = false;
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
		max-width: 600px;
		width: 90%;
		max-height: 80vh;
		overflow-y: auto;
		color: white;
		text-align: center;
	}

	.content h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.content h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.content .toapikey {
		color: #4ecdc4;
		font-size: 2rem;
		margin-bottom: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.api-form {
		margin-bottom: 2rem;
		text-align: left;
	}

	.api-form h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.loading,
	.error,
	.response-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 1.5rem 0;
		padding: 1rem;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
	}

	.loading p,
	.error p,
	.response-data p {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.error {
		color: #ff6b6b;
	}

	.response-data {
		color: #4ecdc4;
	}

	.response-text {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		padding: 1rem;
		margin: 1rem 0;
		max-height: 300px;
		overflow-y: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.response-text pre {
		margin: 0;
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.9rem;
		line-height: 1.4;
	}
</style>