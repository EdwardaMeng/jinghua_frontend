<script setup>

import {ref} from "vue";
import scriptsFile from "@/scripts.js";


const scripts = scriptsFile;

  const filteredScript = ref([...scripts.value]);
  const selectedScript = ref(null);
  const scriptDialog = ref(false);
  const filterDialog = ref(false);


  const openDialog = (script) => {
    scriptDialog.value = true;
    selectedScript.value = script;
  }

  const reserveScript = () => {
    //backend
    alert(`你已经成功预约 ${selectedScript.value.name}`)
  }

  const openFilter = () => {
    filterDialog.value = true;
  }

  const showAllScripts = () => {
    filteredScript.value = scripts.value;
  }

  const searchQuery = ref('');
  const searchScripts = () => {
    const query = searchQuery.value;
    if(query === ''){
      // console.log('empty');
      filteredScript.value = scripts.value;
    }
    else{
      // console.log(filteredScript.value);
      // console.log(query);
      filteredScript.value = filteredScript.value.filter((script) =>
        script.name.includes(query));
    }

  }

const scriptTypes = ["悬疑", "惊悚", "恐怖", "喜剧", "冒险", "中式", "情感"];
const selectedTypes = ref([]);
const selectedPlayerNumber = ref('不限');
const scriptPlayerNumbers = ['不限','5','6','7','8','9'];



  const filterScripts = () => {
    console.log(selectedPlayerNumber.value);
    console.log(selectedTypes.value);
    if(selectedTypes.value.length === 0 && selectedPlayerNumber.value === '不限'){
      filteredScript.value = scripts.value;
    }
    else{
      if(selectedPlayerNumber.value === '不限'){
        filteredScript.value = scripts.value;
        filteredScript.value = filteredScript.value.filter((script) =>
            selectedTypes.value.every(type => Object.values(script)[3].includes(type))
        )
      }
      else{
        filteredScript.value = scripts.value;
        filteredScript.value = filteredScript.value.filter((script) =>
            selectedTypes.value.every(type => Object.values(script)[3].includes(type))
        )
        filteredScript.value = filteredScript.value.filter((script) =>
            Object.values(script)[4].toString() === selectedPlayerNumber.value
        )
      }
    }
  }
</script>

<template>
  <div class="search">
    <v-btn style="height: 48px; width: 80px" @click="showAllScripts">返回</v-btn>
    <v-text-field class="search-input"
        append-inner-icon="mdi-magnify"
        v-model="searchQuery"
        density="comfortable"
        label="查找剧本"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="searchScripts"
    ></v-text-field>
    <v-btn @click="openFilter" style="height: 48px; width: 80px">过滤<v-icon>mdi-filter</v-icon></v-btn>
  </div>
  <v-divider style="color: white"></v-divider>
  <div class="scripts">
    <v-item-group>
      <v-container
      >
        <v-row
        >
          <v-col
              v-for="script in filteredScript"
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
              <v-card-title class="text-h5 d-flex align-center" style="width: 400px;">
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

  <div>
    <v-dialog v-model="filterDialog" fullscreen persistent hide-overlay class="filterDialog">
      <form class="filterForm">
        <v-container>
          <v-row>
            <v-col
                v-for="(type, index) in scriptTypes"
                :key="index"
                cols:auto
            >
              <v-checkbox
                  v-model="selectedTypes"
                  :label="type"
                  :value="type"
                  hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-radio-group v-model="selectedPlayerNumber" inline>
              <v-radio
                  v-for="(number, index) in scriptPlayerNumbers"
                  :key="index"
                  :label="number"
                  :value="number"
              ></v-radio>
            </v-radio-group>

          </v-row>
          <v-row>
            <v-btn value="过滤" @click="filterScripts">过滤</v-btn>
            <v-btn value="关闭" @click="filterDialog = false">关闭</v-btn>
          </v-row>

        </v-container>




      </form>
    </v-dialog>
  </div>
</template>

<style scoped>
.search{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  gap: 100px;
}
.search-input{
  flex-grow: 0;
  width: 800px;
  border: none;
  outline: none;

}
.scripts{
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #181818;
  margin: 20px;
  overflow: scroll;
}
.scriptDialog{
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
.filterDialog{
  background: #181818;
  width: 50vw;
  height: 50vh;
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
.filterForm{
  background: #181818;
  width: 50vw;
  height: 50vh;
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

*::-webkit-scrollbar {
  display: none;
}

</style>