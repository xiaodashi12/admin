<template>
    <div class="login-container">
        <div class="login-header"></div>
        <div class="card-box">
            <h1>网易云音乐管理系统</h1>
            <el-form class="login-form" autoComplete="on" :model="ruleForm" :rules="rules" ref="ruleForm"
                     label-position="left">
                <el-form-item prop="op_code" class="item">
                    <el-input
                            placeholder="请输入用户名"
                            name="op_code"
                            autoComplete="on"
                            v-model="ruleForm.op_code">
                        <i slot="prefix" class="el-icon-etcyonghuming"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="op_pwd" class="item">
                    <el-input
                            placeholder="请输入密码"
                            name="op_pwd"
                            :type="isShowPwd ? 'text' : 'password'"
                            @keyup.enter.native="handleLogin"
                            v-model="ruleForm.op_pwd"
                            autoComplete="on">
                        <i slot="prefix" class="el-icon-etcyonghuming1"></i>
                    </el-input>
                </el-form-item>
                <div class="vCode" v-if="code.isVCode">
                    <el-form-item prop="verification_code" class="item">
                        <el-input
                                placeholder="请输入验证码"
                                name="app_ver"
                                type="text"
                                v-model="ruleForm.verification_code">
                            <i slot="prefix" class="el-icon-etcyanzhengma"></i>
                        </el-input>
                    </el-form-item>
                    <div id="code" title="看不清？换一张～" @click="handleOnRandom">
                        <img :src="'/issue/captcha?n='+ rand" />
                    </div>
                </div>

                <div>
                    <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading"
                               @click.native="handleLogin()">登录
                    </el-button>
                </div>
            </el-form>
        </div>
        <div class="login-footer">
            <div>
                <i class="v-icon-fontwangyiyun"></i>
                <label>本项目由网易云提供支持</label>
            </div>
        </div>
    </div>
</template>

<script>
    import fetch from '@/utils/fetch'
    import api from '@/api'
    import { mapActions } from 'vuex';
    import moment from 'moment';
    const sha1 = require('js-sha1');
    const md5 = require('js-md5');
    import * as dict from '@/utils/dictionaries'
    export default {
        data() {
            let validatePwd = (rule, value, callback) => {

                if (value === "" || value === undefined) {
                    callback(new Error("请输入密码"));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    userName: "admin",
                    pwd: "admin",
                    checked: true
                },
                customerGender:"",
                rules: {
                    op_code: [
                        { required: true, message: "请输入登录名", trigger: "blur" }
                    ],
                    op_pwd: [{ validator: validatePwd, trigger: "blur" }]
                },
                code:{
                    isVCode:false,//是否显示验证码
                    src:''
                },
                rand:0,
                isShowPwd: false, // 是否显示密码
                loading: false, // 登录loading
            };
        },
        computed: {
            gender: function () {
                return dict.getCustomerGender(this.customerGender);
            },
        },
        methods: {
            ...mapActions([
                'Login'
            ]),
            getCaptcha (){
                fetch({
                    url: api['getCaptcha'].url || '',
                    method: 'get'
                }).then(res => {
                    this.code.isVCode = ! this.code.isVCode;
                    this.code.src = res;
                })
            },
            handleLogin() {

                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        let params = {
                            userName:this.ruleForm.op_code,
                            pw:this.ruleForm.op_pwd,
                        }
                        this.Login(params).then(res => {

                            this.$router.push({ name: 'Dashboard'});

                        },error => {

                            if(error.code == '1004'){
                                this.code.isVCode = true;
                                if(!this.rules.hasOwnProperty('verification_code')){
                                    this.$set(this.rules,'verification_code',[{ required: true, message: "请输入验证码", trigger: "blur" }])
                                }
                            }

                            if(this.code.isVCode){
                                this.rand += 1;
                            }



                        });
                    } else {
                        return false;
                    }
                });
            },
            handleOnRandom(){
                this.rand += 1;
            }
        },
        created() {
        }
    };
</script>

<style type="text/scss" lang="scss">
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {

        height: 100%;
        .login-header{
            width: 100%;
            height: 60%;
            background-image:url('../assets/login_bg.png');
            background-size:100% 100%;
            position: absolute;
        }
        .card-box{
            text-align: center;
            width: 60%;
            top:50%;
            left:50%;
            position: absolute;
            transform: translate(-50%, -30%);
            h1{
                color:#dbd9d9;
                margin-bottom:20px;
            }
            .login-form{
                padding: 51px 48px 48px 48px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 5px;
                box-shadow: 1px 1px 3px #999;
                width:35%;
                margin: 0 auto;
            }
        }
        .item {
            .el-form-item__content {
                display: flex;
                flex-flow: row;
                .el-input__inner{
                    color: #999;
                }
            }

        }

        .vCode{
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            .item{
                width: 60%;
            }
            #code {
                display: block;
                color: #ffffff;
                font-size: 20px;
                padding: 5px 35px 10px 35px;
                margin-left: 5%;
                height: 27px;
                cursor: pointer;
            }
        }
        input {
            border: 0;
            -webkit-appearance: none;
            color: $light_gray;
            height: 100%;
        }
        .el-input {
            display: inline-block;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 0.13333rem;
        }
        .svg-container {
            padding: 0.08rem 0.0666rem 0.08rem 0.2rem;
            color: $dark_gray;
            vertical-align: middle;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0 auto 0.5333rem auto;
            text-align: center;
            font-weight: bold;
        }
        .el-form-item {
            border: 1px solid #cbcbcb;
            background:#fff;
            border-radius: 5px;
            color: #9f9f9f;
        }
        .show-pwd {
            position: absolute;
            right: 0.1333rem;
            top: 0.09333rem;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
        }
        .login-footer{
            position:absolute;
            left:0;
            right: 0;
            bottom: 0;
            height: 32px;
            /*background: url('../assets/login-ft.png') no-repeat center;*/
        }
    }
</style>

