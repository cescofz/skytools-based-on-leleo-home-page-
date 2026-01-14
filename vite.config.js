// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginObfuscator from 'vite-plugin-javascript-obfuscator'

export default defineConfig({
  plugins: [
    vue(),
    vitePluginObfuscator({
      // 关键优化1：明确包含 .vue 文件，确保单文件组件的脚本部分被处理
      include: [
        /\.js$/,
        /\.ts$/,
        /\.vue$/, // 明确匹配 .vue 单文件组件，避免遗漏
        'src/**/*'
      ],
      exclude: [
        /node_modules/,
        /\.min\.js$/,
        'dist/**/*'
      ],
      // 原有基础配置
      identifierNamesGenerator: 'hexadecimal',
      identifiersPrefix: 'vite_obf',
      compact: true,
      selfDefending: true,
      disableConsoleOutput: true,
      renameGlobals: false,
      // 字符串加密：最大化配置（核心优化部分）
      stringArray: true,
      stringArrayEncryption: true, // 开启字符串数组加密（必开）
      stringArrayEncoding: ['base64', 'rc4'], // 多重编码（base64 + rc4，强化加密）
      stringArrayThreshold: 1.0, // 强制对所有符合条件的字符串加密
      stringArrayIndexShift: true, // 开启字符串数组索引偏移
      stringArrayRotate: true, // 开启字符串数组旋转
      stringArrayShuffle: true, // 开启字符串数组乱序
      stringArrayWrappersCount: 2, // 字符串包装器数量（增加解密难度）
      stringArrayWrappersType: 'function', // 包装器类型为函数
      stringArrayWrappersChainedCalls: true, // 开启包装器链式调用
      stringArrayIgnoreRegexp: /^$/, // 关闭默认正则过滤（仅过滤空字符串，最大化加密范围）
      // 控制流扭曲：配合字符串加密，提升整体混淆强度
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1.0,
      // 额外优化：混淆对象属性名（避免业务对象属性暴露）
      transformObjectKeys: true,
      // 额外优化：禁止字符串字面量直接使用（强制走加密数组）
      preventStringLiterals: true
    })
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: false, // 关闭terser变量混淆，避免与插件冲突
      keep_classnames: false, // 不保留类名，提升混淆强度
      keep_fnames: false // 不保留函数名，提升混淆强度
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js'
      }
    },
    // 关闭Vite的构建缓存（确保配置修改后立即生效，避免缓存干扰）
    cacheDir: false
  }
})