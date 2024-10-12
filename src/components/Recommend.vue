<script setup>
import {ref} from "vue";
import scriptsFile from "@/scripts.js";

const scripts = scriptsFile;

  const selectedScript = ref(null);
  const scriptDialog = ref(false);
  const openDialog = (script) => {
    scriptDialog.value = true;
    selectedScript.value = script;
  }
  const reserveScript = () => {
    //backend
    alert(`你已经成功预约 ${selectedScript.value.name}`)
  }
</script>

<template>
  <div class="scripts">
    <div style="margin:20px; display: flex; justify-content: center; align-items: center;">
      <div class="text-h3">热门剧本</div>
    </div>

    <v-divider></v-divider>
    <v-item-group style="justify-content: center; align-items: center;">
      <v-container :class="['d-flex align-center', 'justify-center']"
      >
        <v-row
        >
          <v-col
              v-for="script in scripts"
              :key="script.id"
              cols="6"
              md="3"
              @click="openDialog(script)"
          >
            <v-item>
              <v-card
                  :class="['d-flex align-center flex-column', 'justify-center']"
                  height="400"
                  width="300"
                  style="margin-left: 60px; color: white; background-color: #212121"
                  hover
              >
                <div style="height: 350px; width: 300px; margin:0">
                  <v-img
                      :src="script.image"
                      alt="剧本封面"
                      class="mb-2"
                      height="90%"
                      width="100%"
                      style="object-fit: cover;"
                  ></v-img>
                </div>

                <div class="text-h5 d-flex align-center justify-center" style="width:200px; height: 20px;">《{{ script.name }}》</div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <v-dialog v-model="scriptDialog" persistent hide-overlay class="scriptDialog">
      <v-card class="scriptCard">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-card-subtitle>
                <v-img :src="selectedScript?.image" style="max-height: 700px"></v-img>
              </v-card-subtitle>
            </v-col>
            <v-col cols="6">
              <v-card-title class="text-h5 d-flex align-center font-weight-bold" style="width: 400px; color:white">
                {{ selectedScript?.name }}
              </v-card-title>
              <v-card-text style="width: 400px; height: 600px">
                <div class="text-center">
                  <v-chip-group>
                    <v-chip
                        class="ma-2"
                        label
                        v-for="(type, index) in selectedScript?.type"
                        :key="index"
                    >
                      {{type}}
                    </v-chip>
                  </v-chip-group>
                </div>
                <p><strong>适合人数：</strong>{{ selectedScript?.players }}</p>
                <p><strong>时长：</strong>{{ selectedScript?.duration }}h</p>
                <p><strong>价格：</strong>${{ selectedScript?.price }}</p>
                <p><strong>简介：</strong>{{ selectedScript?.description }}</p>
              </v-card-text>
              <v-card-actions style="display: flex; align-items: center; align-content: center;">
                <v-btn color="primary" @click="reserveScript">
                  预约
                </v-btn>
                <v-btn color="secondary" @click="scriptDialog = false">
                  关闭
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.scripts{
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #181818;
  overflow: scroll;
  color: white;
}
.scriptDialog{
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;


}
.scriptCard{
  background: #181818;
  width: 70vw;
  height: 90vh;
  margin: auto;      /* 将卡片水平居中 */
  position: absolute;
  top: 50%;          /* 将卡片垂直居中 */
  left: 50%;
  transform: translate(-50%, -50%); /* 通过 transform 实现居中 */
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;


}
</style>