<template>
    <div>
        <x-dialog v-model="showScrollBox" :dialog-style="{'max-width': '98%',width: '100%'}">
            <group title="服务器配置">
                <x-input title="标题:" type="text" v-model.trim="headTitle" text-align="right" placeholder="请输入登陆标题" is-type="text">
                </x-input>
                <x-input title="服务器:" type="text" v-model.trim="baseURL" text-align="right" required placeholder="请输入服务器URL" is-type="text">
                </x-input>
            </group>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="_onCancel">取消</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="_onConfirm">确定</a>
            </div>
        </x-dialog>
        <x-header :left-options="{showBack: false}" @on-click-more="onClickMore" :right-options="{showMore:true}" :title="headTitle" class="header" style="width:100%;position:absolute;left:0;top:0;"></x-header>
        <div style="text-align:center">
            <img src="../../static/logo.png">
            </x-img>
        </div>
        <group>
            <x-input ref="UserCode" title="用户名" type="text" v-model.trim="loginForm.UserCode" required placeholder="请输入账号" is-type="text" :min="1" @on-enter="onFocus">
            </x-input>
        </group>
        <group>
            <x-input ref="Password" title="密 码" :type="passwordType" required v-model.trim="loginForm.Password" placeholder="请输入密码" is-type="password" :min="1" @on-enter="onEnter">
            <span slot="right" @click="passwordType=passwordType === 'password' ? 'text' : 'password'">{{passwordType === 'password' ? '明文' : '密文'}}</span>
            </x-input>
        </group>
        <div style="padding:15px;">
            <x-button @click.native="_login" type="primary" text="登录"></x-button>
            <x-button @click.native="_resetForm" type="warn" text="取消"></x-button>
        </div>
    </div>
</template>
 
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import api from '../fetch/api'

import {  XDialog, XInput, Group, XButton, XHeader } from 'vux'
export default {
    components: {
        XDialog,
        XInput,
        XButton,
        Group,
        XHeader
    },
    data() {
        return {
            passwordType: 'password',
            headTitle: '中铁管理系统',
            baseURL: '',
            showScrollBox: false,
            loginForm: {
                UserCode: 'zhaojian01',
                Password: 'aaa'
            }
        }
    },
    methods: {
        _onConfirm() {
            if (this.baseURL) {
                this.$http.defaults.baseURL = this.baseURL
                this.getUrlData({
                    url: this.baseURL,
                    loginStatus: true
                })
            }
            this.showScrollBox = false
        },
        _onCancel() {
            this.showScrollBox = false
        },
        onClickMore() {
            this.showScrollBox = true
        },
        onFocus() {
            this.$refs.Password.focus()
        },
        onEnter() {
            this._login()
        },
        ...mapActions({
            setUserInfo: 'setUserInfo',
            setSignOut: 'setSignOut',
            getUrlData: 'getUrlData',
        }),
        _resetForm() {
            this.$refs.UserCode.reset()
            this.$refs.Password.reset()
        },
        _login() {
            let that = this
            if (!that.loginForm.UserCode || !that.loginForm.Password) {
                that.$vux.alert.show({
                    title: '请填写完整',
                    content: '用户名或密码不能为空！'
                })
                return
            } else {
                let param = that.loginForm;
                api.GetLoginIn(param)
                    .then(res => {
                        let response = res.data
                        if (response.result === "true") {
                            that.setUserInfo(response.data) //记住登陆信息
                            that.$vux.toast.show({
                                text: '登录成功，欢迎您使用本系统...',
                                type: "text",
                                position: 'top',
                                width: "15em"
                            })
                            that.$router.replace('/home')
                        } else {
                            that.$vux.alert.show({
                                title: '输入有误',
                                content: response.error
                            })
                            return
                        }
                    })
                    .catch(error => {
                        that.$vux.alert.show({
                            title: '登录异常！',
                            content: '请检查服务器网址是否正确，</br>' + error,
                            onHide() {
                                that.showScrollBox = true
                            }
                        })
                    })
            }

        },
    },
    mounted() {
        this.baseURL = this.$http.defaults.baseURL
        this.setSignOut()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    background-color: RGB(0, 122, 204);
}
</style>