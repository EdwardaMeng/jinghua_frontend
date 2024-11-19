<script setup>

import {onMounted, ref} from "vue";
import ScriptsDataService from "@/services/ScriptsDataService.js";
import dmDataService from "@/services/DmDataService.js";
import timeslotDataService from "@/services/TimeslotDataService.js";
import reservationService from "@/services/ReservationService.js";

onMounted(async () => {
  await ScriptsDataService.getAll()
      .then(data => {
        scripts.value = data.data
        filteredScript.value = scripts.value
        // console.log(scripts.value)
      })
      .catch((error) => {
        console.log(error);
      })

  await dmDataService.getAllDM()
      .then(data => {
        dms.value = data.data
      })
      .catch((error) => {
        console.log(error);
      })
})

  const scripts = ref([]);
  const dms = ref([]);
  const filteredScript = ref([]);
  const selectedScript = ref('');
  const scriptDialog = ref(false);
  const filterDialog = ref(false);
  const reservationDialog = ref(false);
  const informationDialog = ref(false);
  const selectedTimeslots = ref([]);
  const timeslotsDialog = ref(false);
  const selectedReservationTimeslot = ref('')
  const selectedDm = ref('')
  const wechat = ref('')
  const phoneNumber = ref('无')
  const email = ref('无')
  const userName = ref('')


  const openDialog = (script) => {
    scriptDialog.value = true;
    selectedScript.value = script;
    selectedScript.value.scriptType = script.scriptType.split(',');

  }

  const openReservationDialog = (script) => {
      reservationDialog.value = true;
  }

  const openInformationDialog = () => {
    informationDialog.value = true;
  }

  const openTimeslotsDialog = async (name) => {
    await timeslotDataService.getAllAvailableTimeslotsByName(name)
        .then((response) => {
          if (response.data.length > 0) {
            selectedTimeslots.value = response.data;
            selectedDm.value = name
            timeslotsDialog.value = true;
          }
          else{
            alert('当前DM没有可选时间段')
          }
        })
        .catch(error => {
          console.log(error);
        })

  }

  const reserveScript = async () => {
    console.log(selectedScript.value)
    const ReservationData = {
      dm: selectedDm.value,
      timeslot: selectedReservationTimeslot.value,
      script: selectedScript.value.scriptName,
      wechat: wechat.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      userName: userName.value
    }

    const TimeslotData = {
      dm: selectedDm.value,
      timeslot: selectedReservationTimeslot.value
    }

    await timeslotDataService.reserveTimeslot(TimeslotData)
    .then(async (response) => {
      if (response.data.success) {
        await reservationService.createReservation(ReservationData)
            .then(response => {
              if(response.data.success)
                alert(`你已经成功预约 ${selectedScript.value.scriptName} 于时间段 ${selectedReservationTimeslot.value}`)
              else{
                alert("预约失败")
              }
            })
            .catch(err => {
              console.log(err)
            })
      } else {
        alert("预约失败")
      }
    })
        .catch((error) => {
          console.log(error);
        })
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
      filteredScript.value = scripts.value;
    }
    else{
      ScriptsDataService.get(query)
          .then(response => {
            filteredScript.value = response.data;
            console.log(filteredScript.value);
          })
          .catch((error) => {
            console.log(error);
          })

    }

  }

  const scriptTypes = ["本格","变格","推理","悬疑", "惊悚", "恐怖", "喜剧", "冒险", "中式", "情感"];
  const selectedTypes = ref('无');
  const selectedPlayerNumber = ref('不限');
  const scriptPlayerNumbers = ['不限','5','6','7','8','9'];



  const filterScripts = () => {
    if(selectedTypes.value === '无' && selectedPlayerNumber.value === '不限'){
      filteredScript.value = scripts.value;
      filterDialog.value = false;
    }
    else if(selectedPlayerNumber.value === '不限' && selectedTypes.value !== '无'){
      const query = selectedTypes.value
      ScriptsDataService.getScriptsByType(query)
          .then(response => {
            filteredScript.value = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
    }
    else if(selectedTypes.value === '无' && selectedPlayerNumber.value !== '不限'){
      const type = selectedPlayerNumber.value
      ScriptsDataService.getScriptsByPlayersNumber(type)
          .then(response => {
            filteredScript.value = response.data;
          })
          .catch(error => {
            console.log(error)
          })
      }
    else{
      const number = selectedPlayerNumber.value
      const type = selectedTypes.value
      ScriptsDataService.getScriptsByTypeAndNumber(type, number)
          .then(response => {
            filteredScript.value = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    }
  }
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="center" align="center">
          <v-col align="center">
            <v-btn @click="showAllScripts">返回</v-btn>
          </v-col>
          <v-col align="center">
            <v-text-field
                append-inner-icon="mdi-magnify"
                v-model="searchQuery"
                label="查找剧本"
                variant="solo"
                @click:append-inner="searchScripts"
                hide-details
            ></v-text-field>
          </v-col>
          <v-col align="center">
            <v-btn @click="openFilter">过滤<v-icon>mdi-filter</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-divider style="color: white"></v-divider>
      </v-col>
      <v-col col="12">
        <v-container class="scripts">
          <v-row style="width: 100%">
            <v-col>
              <v-item-group>
                <v-row justify="center" align="start">
                  <v-col
                      v-for="script in filteredScript"
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
            <v-btn color="primary" @click="openReservationDialog">
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

    <v-dialog v-model="filterDialog" fullscreen persistent hide-overlay class="filterDialog">
      <form class="filterForm">
        <v-container>
          <v-row>
              <v-radio-group v-model="selectedTypes" inline>
                <v-radio
                    v-for="type in scriptTypes"
                    :key="type"
                    :label="type"
                    :value="type"
                ></v-radio>
              </v-radio-group>
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

    <v-dialog v-model="reservationDialog" fullscreen persistent hide-overlay class="reservationDialog">
      <v-card class="reservationDialogCard">
        <v-container>
          <v-row
              v-for="dm in dms"
              :key="dm"
              :label="dm"
              :value="dm"
          >
            <v-col>{{dm.name}}</v-col>
            <v-col>擅长类型: {{dm.type}}</v-col>
            <v-col>
              <v-btn @click="openTimeslotsDialog(dm.name)">选择时间段</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-btn @click="reservationDialog = false">关闭</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="timeslotsDialog"  persistent hide-overlay class="timeslotsDialog">
      <v-card class="timeslotsDialogCard">
        <v-container fluid>
          <v-row>
            <v-radio-group
                v-model="selectedReservationTimeslot"
            >
                <v-radio
                    v-for="timeslot in selectedTimeslots"
                    :key="timeslot"
                    :value="timeslot.period"
                    :label="timeslot.period"
                ></v-radio>
            </v-radio-group>
          </v-row>

          <v-btn color="primary" @click="openInformationDialog">确定</v-btn>
          <v-btn color="secondary" @click="timeslotsDialog = false">关闭</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="informationDialog">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="姓名" v-model="userName"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="微信(必填)" v-model="wechat"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="电话(选填)" v-model="phoneNumber"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="邮箱(选填)" v-model="email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-col>
                <v-btn color="primary" @click="reserveScript">预约</v-btn>
              </v-col>
              <v-col>
                <v-btn color="secondary" @click="informationDialog = false">关闭</v-btn>
              </v-col>
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
}

.scripts{
  background: #181818;
  color: white;
}

.scriptCard{
  background-color: #181818;
  color: white;
}


.filterDialog{
  background: #181818;
  color: white;
}

.filterForm{
  background: #181818;
  color: white;
}


.timeslotsDialog{
  background: #181818;
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 50vh;
  position: absolute;
  text-align: center;
  align-content: center;

}

.timeslotsDialogCard{
  background: transparent;
  width: 50vw;
  height: 50vh;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0;
  color: white;
}

.reservationDialog{
  background: #181818;
  width: 60vw;
  height: 60vh;
  margin: auto;      /* 将卡片水平居中 */
  position: absolute;
  top: 50%;          /* 将卡片垂直居中 */
  left: 50%;
  transform: translate(-50%, -50%); /* 通过 transform 实现居中 */
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reservationDialogCard{
  background: #181818;
  width: 50vw;
  height: 50vh;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
}



</style>