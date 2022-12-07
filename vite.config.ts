/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-25 14:05:49
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-11-25 16:43:24
 * @FilePath: \workspace\three-admin-react\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
