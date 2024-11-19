<script setup>
import {onMounted, ref} from "vue";
import ScriptsDataService from "@/services/ScriptsDataService.js";

onMounted(() => {
    ScriptsDataService.getScriptsByType('热门')
        .then(data => {
          scripts.value = data.data
          console.log(scripts.value)
        })
        .catch((error) => {
          console.log(error);
        })
  })
  const scripts = ref([]);

  const selectedScript = ref(null);
  const scriptDialog = ref(false);

  const openDialog = (script) => {
    scriptDialog.value = true;
    selectedScript.value = script;
    selectedScript.value.scriptType = script.scriptType.split(',');
  }
  const reserveScript = () => {
    alert(`你已经成功预约 ${selectedScript.value.name}`)
  }
</script>

<template>
    <v-container class="scripts">
      <v-row style="width: 100%">
        <v-col cols="12" align="center" justify="center" >
          <div class="[text-lg-h1 text-md-h2 text-sm-h6]">热门剧本</div>
        </v-col>
        <v-col cols="12" align="center" justify="center">
          <v-divider style="color: white"></v-divider>
        </v-col>
        <v-col>
          <v-item-group>
            <v-row justify="center" align="start">
              <v-col
                  v-for="script in scripts"
                  :key="script"
                  @click="openDialog(script)"
                  cols="auto"
              >
                <v-item>
                  <v-card
                      class="script"
                      style="color: white; background-color: #212121 ;"
                      hover
                  >
                    <v-container style="height: 100%">
                      <v-row justify="center" align="center" style="height: 90%">
                        <v-col style="height:100%;width:100%">
                          <v-img
                              :src="script.scriptImage"
                              alt="剧本封面"
                          ></v-img>
                        </v-col>
                      </v-row>
                      <v-row justify="center" align="center">
                        <v-col>
                          <div style="text-align: center" >《{{ script.scriptName }}》</div>
                        </v-col>
                      </v-row>
                    </v-container>

                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="scriptDialog" fullscreen persistent hide-overlay class="scriptDialog">
      <v-card class="scriptCard">
        <v-container style="height: 100%">
          <v-row justify="center" align="center" style="height: 10%;">
            <v-col align="center" cols="12">
              <v-card-title>
                《{{ selectedScript.scriptName }}》
              </v-card-title>
            </v-col>
          </v-row>
          <v-row style="height: 80%" justify="center" align="center">
            <v-col justify="center" align="center" style="height: 100%;">
              <v-img :src="selectedScript.scriptImage"></v-img>
            </v-col>
            <v-col  justify="center" align="center" style="height: 100%;">
              <v-row justify="center" align="center">
                <v-chip-group>
                  <v-chip
                      class="ma-2"
                      label
                      v-for="(type, index) in selectedScript.scriptType"
                      :key="index"
                  >
                    {{type}}
                  </v-chip>
                </v-chip-group>
              </v-row>
              <v-row>
                <p><strong>适合人数：</strong>{{ selectedScript.scriptPlayersNumber }}人</p>
              </v-row>
              <v-row>
                <p><strong>人数介绍：</strong>{{ selectedScript.scriptPlayersNumberDescription }}</p>
              </v-row>
              <v-row>
                <p><strong>时长：</strong>{{ selectedScript.scriptDuration }}h</p>
              </v-row>
              <v-row>
                <p><strong>价格：</strong>${{ selectedScript.scriptPrice }}</p>
              </v-row>
              <v-row>
                <p><strong>简介：</strong>{{ selectedScript.scriptDescription }}</p>
              </v-row>
            </v-col>
          </v-row>
          <v-row style="height: 10%">
            <v-col justify="center" align="center" cols="6">
              <v-btn color="primary" @click="reserveScript">
                预约
              </v-btn>
            </v-col>
            <v-col align="center" cols="6">
              <v-btn color="secondary" @click="scriptDialog = false">
                关闭
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<style scoped>

.script{
  height: 300px;
  width: 250px;
  background-color: #181818;
}

.scripts{
  background: #181818;
  color: white;
}


.scriptCard{
  background-color: #181818;
  color: white;
}

</style>