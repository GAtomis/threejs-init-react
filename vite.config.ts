/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-25 14:05:49
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 12:47:39
 * @FilePath: \workspace\three-admin-react\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {

    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {

      open: !true,
      proxy: {


        [env.VITE_BASE_API]: {
          target: env.VITE_BASE_PROXY,
          changeOrigin: true,
        },
        '/upload': {
          target: 'https://smms.app/api/v2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/upload/, '')


        }

      },
    },
  }

})