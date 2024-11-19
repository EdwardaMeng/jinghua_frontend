<script setup>
import {computed, onMounted, ref} from "vue";
import AdminDataService from "@/services/AdminDataService.js";
import router from "@/router.js";
import {useDisplay} from "vuetify";

  const account = ref('')
  const password = ref ('')
  const loginDialog = ref(false);
  const loggedIn = ref(false);
  const drawer = ref(false);
  const isMobile = useDisplay().smAndDown.value;


  onMounted(() => {
    loggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
    console.log(isMobile)
  })

  const openLoginDialog = () => {
    loginDialog.value = true;
  }

  const logout = () => {
    loggedIn.value = false;
    localStorage.setItem('isLoggedIn', 'false');
    router.push("/recommend")
  }

  const login = () => {
    const data = {
      account: account.value,
      password: password.value,
    }
    AdminDataService.login(data)
    .then((response) => {
      if(response.data.length === 1){
        alert('登陆成功')
        loggedIn.value = true
        loginDialog.value = false
        localStorage.setItem('isLoggedIn', 'true')
      }
      else{
        alert('登录失败')
      }
    })
        .catch((error) => {
          console.log(error)
        })
  }
</script>

<template>
  <v-app>
      <v-app-bar class="nav" image="src/pictures/背景.png" app >
        <v-avatar
            icon="mdi-login"
            color="white"
            @click="openLoginDialog"
            v-show="!loggedIn"
        ></v-avatar>
        <v-avatar
            v-show="loggedIn"
            color="white"
            icon="mdi-logout"
            @click="logout"
        ></v-avatar>
        <v-app-bar-nav-icon v-show="isMobile" variant="text" @click.stop="drawer = !drawer" style="color:white"></v-app-bar-nav-icon>
        <v-navigation-drawer
            v-model="drawer"
            class="navDrawer"
        >
          <v-list>
            <v-btn title="本店推荐" to="/recommend" prepend-icon="mdi-fire">本店推荐</v-btn>
            <v-btn title="所有剧本" to="/scripts" prepend-icon="mdi-file">所有剧本</v-btn>
            <v-btn title="关于我们" to="/aboutUs" prepend-icon="mdi-emoticon-devil">关于我们</v-btn>
            <v-btn title="预约须知" to="/fyi" prepend-icon="mdi-information">预约须知</v-btn>
            <v-btn v-show="loggedIn" title="上传剧本" to="/upload" prepend-icon="mdi-file">上传剧本</v-btn>
            <v-btn v-show="loggedIn" title="管理剧本" to="/manage" prepend-icon="mdi-file">管理剧本</v-btn>
            <v-btn v-show="loggedIn" title="管理DM" to="/DmPage" prepend-icon="mdi-account">管理DM</v-btn>

          </v-list>
        </v-navigation-drawer>

        <v-container v-show="!isMobile" style="color: white">
          <v-responsive>
            <v-row>
              <v-col>
                <v-btn title="本店推荐" to="/recommend" prepend-icon="mdi-fire">本店推荐</v-btn>
                <v-btn title="所有剧本" to="/scripts" prepend-icon="mdi-file">所有剧本</v-btn>
                <v-btn title="关于我们" to="/aboutUs" prepend-icon="mdi-emoticon-devil">关于我们</v-btn>
                <v-btn title="预约须知" to="/fyi" prepend-icon="mdi-information">预约须知</v-btn>
                <v-btn v-show="loggedIn" title="上传剧本" to="/upload" prepend-icon="mdi-file">上传剧本</v-btn>
                <v-btn v-show="loggedIn" title="管理剧本" to="/manage" prepend-icon="mdi-file">管理剧本</v-btn>
                <v-btn v-show="loggedIn" title="管理DM" to="/DmPage" prepend-icon="mdi-account">管理DM</v-btn>
                <v-btn v-show="loggedIn" title="管理预约" to="/Reservation" prepend-icon="mdi-file">管理预约</v-btn>
              </v-col>
            </v-row>
          </v-responsive>

        </v-container>
      </v-app-bar>
      <v-main class="content">
        <router-view/>
      </v-main>


        <v-dialog v-model="loginDialog" class="loginDialog" persistent hide-overlay>
            <v-container>
              <v-row justify="center">
                <v-col>
                  <v-text-field label="账号" type="text" v-model="account"></v-text-field>
                  <v-text-field label="密码" type="password" v-model="password"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col align="end">
                  <v-btn density="comfortable" color='primary' @click="login" >登录</v-btn>
                </v-col >
                <v-col align="start">
                  <v-btn density="comfortable" color="secondary" @click="loginDialog = false">关闭</v-btn>
                </v-col>
              </v-row>
            </v-container>
        </v-dialog>

  </v-app>
</template>

<style scoped>

.nav{
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 20vh;
  padding-left: 1%;
  color: white;

}
.content{
  background: #181818;
  margin-top: 20vh;
  padding: 2%;
}
*::-webkit-scrollbar {
  display: none;
}

.loginDialog{
  background: #181818;
  color: white;
}
.navDrawer{
  color: white;
  background: #181818;
  width: 25vw;
  height: 400px;
}



</style>
