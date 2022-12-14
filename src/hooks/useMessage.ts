/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 01:21:23
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 01:27:31
 * @FilePath: /workspace/threejs-init-react/src/hooks/useMessage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {  message } from 'antd';
export default function getMessage(msg:string="默认行为") {

    const [messageApi, contextHolder] = message.useMessage();

    const success = (str=msg) => {
      messageApi.open({
        type: 'success',
        content: str,
      });
    };
  
    const error = (str=msg) => {
      messageApi.open({
        type: 'error',
        content: str,
      });
    };
  
    const warning = (str=msg) => {
      messageApi.open({
        type: 'warning',
        content: str,
      });
    };

    return {success,error,warning}

}
