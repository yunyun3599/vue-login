<template>
    <div>
        <div id="naverIdLogin"></div>
        <button type="button" @click="logout">로그아웃</button>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        data() {
            return{
                naverLogin: null
            };
        },
        mounted() {
            this.naverLogin = new window.naver.LoginWithNaverId({
                clientId: "ZgQ9R8eokIfiYGQygMye",
                callbackUrl: "http://localhost:8080/naverlogin",
                isPopup: false,
                loginButton: {
                    color: "green", type: 3, height: 60
                }
            });
            this.naverLogin.init();

            this.naverLogin.getLoginStatus((status) => {
                if (status) {
                    console.log(status);
                    console.log(this.naverLogin.user);
                    var email = this.naverLogin.user.getEmail();
                    if (email == undefined || email == null) {
                        alert("이메일은 필수정보입니다. 정보 제공 동의가 필요합니다.");
                        this.naverLogin.repropmt();
                        return;
                    }
                } else {
                    console.log("callback 처리 실패")
                }
            });
        },
        methods: {
            logout() {
                const accessToken = this.naverLogin.accessToken.accessToken;
                const url = `/oauth2.0/token?grant_type=delete&client_id=ZgQ9R8eokIfiYGQygMye&client_secret=RXSVxu8MNX&access_token=${accessToken}&service_provider=NAVER`;

                axios.get(url).then(res => {
                    console.log(res.data);
                });
            }
        }
    };
</script>
