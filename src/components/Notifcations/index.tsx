/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 00:36:16
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 01:14:29
 * @FilePath: /workspace/threejs-init-react/src/components/Notifcations/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react'

import './index.scss'

export default function Notifcations() {

    useEffect(()=>{

        const notifs = new Notifications();
        notifs.init();
        // @ts-ignore
            globalThis.notifs=notifs

    },[])
    return (

        

        <div>

            <div className="container">
                <section className="section content">
                    {/* <h1 className="title">Simple Notifications</h1> */}
                    {/* <h2>Why?</h2> */}
                    {/* <p>We needed a light and simple notifications system with two kinds of possible behavior. Some notifications should <strong>close themselves</strong> without any action from the user. Some <strong>require clicking</strong> on the close button. All closed notifications should be removed from the DOM. The notifications may be on the page when it loads or may be added at any other moment.</p> */}
                    {/* <p>We don't use any JavaScript library but this demo uses <a href="https://bulma.io/">BULMA css framework.</a>You can disable BULMA styles in the panel at the bottom of the page.</p> */}
                    {/* <p>Check <a href="https://github.com/pehaa/simple-notifications-solution">its github repo</a> for more details.</p> */}
                    <p className="notification is-danger" role="alert">Errors happen. And it happened again.<button className="delete" type="button">Close</button></p>
                    <p data-close="self" className="notification is-info" role="alert">You've just found what you were looking for!</p>
                    <p className="notification is-success" role="alert">You rock! Don't forget it! <button className="delete" type="button" >Close</button></p>
                    <p data-close="self" className="notification is-warning" role="alert">Weather warnings for strong winds and rain!</p>
                </section>
            </div>
            {/* <section className="add-new">
                <label>
                    <input id="bulma-state" name="bulma" type="checkbox" checked/>
                        Bulma CSS Enabled
                </label>
                <div className="level is-mobile">
                    <fieldset className="level-left level-item">
                        <legend className="heading">Behavior</legend>
                        <label>
                            <input name="self-closing" type="radio" value="yes" checked/>
                                Self closing
                        </label>
                        <label>
                            <input name="self-closing" type="radio" value="no"/>
                                With close button
                        </label>
                    </fieldset>
                    <fieldset className="level-item">
                        <legend className="heading">Type</legend>
                        <label>
                            <input name="notif-type" type="radio" value="info" checked/>
                                Info
                        </label>
                        <label>
                            <input name="notif-type" type="radio" value="success"/>
                                Success
                        </label>
                        <label>
                            <input name="notif-type" type="radio" value="error"/>
                                Error
                        </label>
                    </fieldset>
                    <div className="level-right">
                        <button id="add-new" type="button" className="button heading is-primary">Add new</button>
                    </div>
                </div>
            </section> */}
        </div>



    )

}


class Notifications {
    selector:any
    options:any
    constructor (selector = '.notification', options = {} ) {
        this.selector = selector
        this.options = {
            animationInName: 'slidein',
            animationOutSelf: 'slideout 1s',
            animationOutClose: 'fadeout 1s',
            closeButtonSelector: '.delete',
            closeSelfOnClick: true,
            startTopPosition: 8,
            gap: 8,
            delayFunction: (i:number) => 3 + 2*i,
            topTransition: 'top .75s ease-in-out'
        }
        this.extendDefaults(options)
    }

    extendDefaults (properties:any) {
        Object.keys(properties).forEach( (el) => {
            if (this.options.hasOwnProperty(el)) {
                this.options[el] = properties[el]
            }
        })
    }

    init () {
        this.onload()
        document.addEventListener('animationstart', (e) => { this.onStartHandler(e) } )
    }

    onload () {
        this.setTopPositions()
        this.allNotifications().forEach ((el, i) => {
            this.setNotification(el, `${0.5 + i}s`)
        })
    }

    isSelfClosing (el:any) {
        return el.getAttribute('data-close') === 'self'
    }

    onStartHandler (e:any) {
        if (this.needsActivation(e.target)) {
            this.setTopPositions()
            this.setNotification(e.target)
        }
    }

    allNotifications () {
        return Array.prototype.slice.call(document.querySelectorAll(this.selector))
    }

    setTopPositions () {
        let startHeight = this.options.startTopPosition
        this.allNotifications().forEach( (el) => {
            el.style.top = `${startHeight}px`
            startHeight += el.offsetHeight + this.options.gap
            if (this.needsResume(el)) {
                this.addExitAnimation(el)
            }
        })
    }

    inView (el:any) {
        return parseInt(getComputedStyle(el)['top']) < window.innerHeight
    }

    isPaused (el:any) {
        return el.getAttribute('data-paused') === 'true'
    }

    needsResume (el:any) {
        return this.isPaused(el) && this.inView(el)
    }

    isNotification (el:any) {
        return this.allNotifications().indexOf(el) > -1
    }

    needsActivation (el:any) {
        return el.getAttribute('data-notification') !== 'active' && this.isNotification(el)
    }

    setNotification (el:any, delay:string|boolean = false) {
        if (delay) {
            el.style.animationDelay = delay
        }
        this.setListeners(el)
        el.setAttribute('data-notification', 'active')
        el.style.transition = this.options.topTransition
    }

    setListeners (el:any) {
        el.addEventListener('animationend', (e:any) => { this.removeMe(e) })
        let willClose = el.querySelector(this.options.closeButtonSelector)
        if (this.options.closeSelfOnClick && this.isSelfClosing(el)) {
            willClose = willClose || el
        }
        if (willClose) {
            willClose.addEventListener('click', (e:any) => { this.close(e) })
        }
    }

    close (e:any) {
        const el = this.isNotification(e.currentTarget) ? e.currentTarget : e.currentTarget.parentNode
        el.style.animation = this.options.animationOutClose
    }

    removeMe (e:any) {
        const el = e.currentTarget
        if (this.options.animationInName === e.animationName && this.isSelfClosing(el)) {
            this.addExitAnimation(el)
        } else if (this.options.animationOutClose.split(' ').indexOf(e.animationName) > -1 || this.options.animationOutSelf.split(' ').indexOf(e.animationName) > -1) {
            el.parentNode.removeChild(el)
            this.setTopPositions()
        }
    }

    addExitAnimation (el:any) {
        if (this.inView(el)) {
            el.setAttribute('data-paused', false)
            const delay = this.options.delayFunction(this.allNotifications().indexOf(el), el)
            el.style.animation = this.options.animationOutSelf
            el.style.animationDelay = `${delay}s`
        } else {
            el.setAttribute('data-paused', true)
        }
    }
}

