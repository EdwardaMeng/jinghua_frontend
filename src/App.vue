<script setup>

</script>

<template>
  <v-app>
      <v-app-bar class="nav" image="src/pictures/背景.png" app>
        <div style="color: white; display: flex; justify-content: center; gap: 50px; margin-left: 50px">
          <v-btn title="本店推荐" to="/recommend" prepend-icon="mdi-fire">本店推荐</v-btn>
          <v-btn title="所有剧本" to="/scripts" prepend-icon="mdi-file">所有剧本</v-btn>
          <v-btn title="关于我们" to="/aboutUs" prepend-icon="mdi-emoticon-devil">关于我们</v-btn>
          <v-btn title="预约须知" to="/fyi" prepend-icon="mdi-information">预约须知</v-btn>
        </div>
      </v-app-bar>
      <v-main class="content">
        <router-view/>
      </v-main>
  </v-app>
</template>

<style scoped>
.nav{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 200px;
}
.content{
  background: #181818;
  margin-top: 200px;
  padding: 0;
}
*::-webkit-scrollbar {
  display: none;
}
</style>
