/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-12-01 23:21:08
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2022-12-17 12:01:49
 * @FilePath: \three-admin-react\src\views\Login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import React, { useEffect, useState } from 'react'
import './login.scss'
import type { Login as LoginForm } from '@/model/user/types'

import useVerification from '@/hooks/useVerification'
import { login } from '@/api/user-api'
import { useDispatch } from 'react-redux'
import userState from '@/store/modules/user/user'
import LoadingIcon from '@/components/loading/loading-icon'

export default function Login() {
    const body = document.querySelector(".body");
    const modal = document.querySelector(".modal");
    const modalButton = document.querySelector(".modal-button");
    const closeButton = document.querySelector(".close-button");
    const scrollDown = document.querySelector(".scroll-down");
    let isOpened = false;
    const [isHidden, setIsHidden] = useState(false)

    const openModal = () => {
        console.log("点击");

        setIsHidden(true)
    }
    const closeModal = () => {
        setIsHidden(false)
    }

    window.addEventListener("scroll", () => {


        if (window.scrollY > window.innerHeight / 3 && !isOpened) {
            console.log("滚动");
            isOpened = true;
            // @ts-ignore
            scrollDown && (scrollDown!.style.display = "none");
            openModal();
        }
    });
    document.onkeydown = evt => {
        evt = evt || window.event;
        evt.keyCode === 27 ? closeModal() : false;
    };
    const { codeUrl, setCodeUrl, resetCode } = useVerification((url => {
        setForm({ ...form, ...{ ['code']: ''.trim() } })
    }))
    //业务员
    const [form, setForm] = useState<LoginForm>({ username: "", password: '', code: '' })
    //输入数据流
    const inputForm = (e: React.ChangeEvent<HTMLInputElement>, label: "username" | "password" | "code") => {
        console.log(e.currentTarget!.value, label);
        setForm({ ...form, ...{ [label]: e.currentTarget!.value.trim() } })
    }


    //验证规则
    const rules: any = {
        "username": [
            {
                validator: (rule: any, value: any, callback: (err?: Error) => void) => {
                    if (value) {
                        callback()
                    } else {
                        callback(new Error('请输入用户名'));
                    }
                }
            }, {

                validator: (rule: any, value: any, callback: (err?: Error) => void) => {
                    const limit = 4
                    if (value.length >= limit) {
                        callback()
                    } else {
                        callback(new Error('用户名长度必须大于' + limit));
                    }
                }
            }
        ],
        "password": [

            {
                validator: (rule: any, value: any, callback: (err?: Error) => void) => {

                    if (value) {
                        callback()

                    } else {

                        callback(new Error('请输入密码'));
                    }
                }
            }
        ],
        "code": [
            {
                validator: (rule: any, value: any, callback: (err?: Error) => void) => {

                    if (value) {
                        callback()

                    } else {

                        callback(new Error('请输入验证码'));
                    }
                }
            },
            {
                validator: (rule: any, value: any, callback: (err?: Error) => void) => {
                    console.log(typeof value);

                    if (value.length == 4) {
                        callback()

                    } else {
                        callback(new Error('验证码输入4位'));
                    }
                }
            },

        ]
    }
    // 列表表单
    const [labelForm, setLabelForm] = useState<any>({})
    //验证逻辑
    const getRules = (field: string) => {
        if (rules && rules[field]) {
            const data: any = form
            let errMsg = ""
            const isPass = rules[field].every((item: any) => {
                let state = true
                item?.validator(null, data[field], (err?: Error) => {
                    if (err) {
                        state = false
                        errMsg = err.message
                    }
                })
                return state
            })

            if (!isPass) {

                return {
                    field,
                    errMsg,
                    className: " showTip tip  ",
                    isPass

                }


            } else {
                return {

                    field,
                    errMsg,
                    className: " fadeTip tip  ",
                    isPass


                }
            }

        }
        return null


    }

    const validationProcess = () => {

        return new Promise((resolve, reject) => {
            //是否通过验证
            let state = true
            const item = {}
            Object.keys(rules).forEach((key) => {
                console.log(key);
                const res = getRules(key)
                res && Object.assign(item, { [key]: res }) && (!res.isPass && (state = res.isPass))

            })
            setLabelForm(item)
            state ? resolve(console.log("pass!")) : reject(console.warn("Form validation failed"));

        })


    }

    const dispatch = useDispatch()
    //点击Login
    let [isLoading, setIsLoading] = useState(false)
    const loginForm = async () => {

        await validationProcess()
        const { result: { token } } = await login(form)
        dispatch({ type: 'setToken', val: token })
        setIsLoading(true)

        // const res = await login(form)

        // setIsLoading(false)


    }

    return (
        <div className='body'>

            <div className="scroll-down">SCROLL DOWN
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z" />
                </svg>
            </div>
            <div className="container"></div>
            <div style={{ overflow: isHidden ? 'hidden' : 'initial' }} className={`modal ${isHidden ? "is-open" : ''}`}>
                <div className="modal-container">
                    <div className="modal-left">
                        <h1 className="modal-title">Welcome!</h1>
                        <p className="modal-desc">Welcome to our Metauniverse Content Center.</p>
                        <div className="input-block">
                            <label htmlFor="Username" className="input-label">Username</label>
                            <input name="Username" value={form.username} onChange={e => inputForm(e, "username")} id="email" placeholder="user001" />
                        </div>
                        <p className={labelForm?.['username']?.className ?? 'tip'}>{labelForm && labelForm['username'] ? labelForm['username'].errMsg : ''}
                        </p>
                        <div className="input-block">
                            <label htmlFor="password" className="input-label">Password</label>
                            <input type="password" value={form.password} onChange={e => inputForm(e, "password")} name="password" id="password" placeholder="Password" />
                        </div>
                        <p className={labelForm?.['password']?.className ?? 'tip'}>{labelForm && labelForm['password'] ? labelForm['password'].errMsg : ''}</p>
                        <div className="input-block">
                            <div className='Verification-warp'>
                                <div className='Verification-form'>
                                    <label htmlFor="Verification" className="input-label">Verification</label>
                                    <input type="Verification" value={form.code} onChange={e => inputForm(e, "code")} name="Verification" id="Verification" placeholder="Verification" />
                                </div >
                                <img onClick={resetCode} src={codeUrl as string} className="Verification-code" alt="" />
                            </div>
                        </div>
                        <p className={labelForm?.['code']?.className ?? 'tip'}>{labelForm && labelForm['code'] ? labelForm['code'].errMsg : ''}</p>
                        <div className="modal-buttons" >
                            <a href="" className="">Forgot your password?</a>
                            <button className="input-button" onClick={loginForm}>{isLoading ? <LoadingIcon></LoadingIcon> : `Login`}</button>

                        </div>
                        <p className="sign-up">Don't have an account? <a href="#">Sign up now</a></p>
                    </div>
                    <div className="modal-right">
                        <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="" />
                    </div>
                    <button className="icon-button close-button" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
                        </svg>
                    </button>
                </div>
                <button className="modal-button" onClick={openModal}>Click here to login</button>
            </div>
        </div>
    )


}
