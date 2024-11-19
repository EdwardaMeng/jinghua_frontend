<script setup>
import {computed, onMounted, ref} from "vue";
import DmDataService from "@/services/DmDataService.js";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import TimeslotDataService from "@/services/TimeslotDataService.js";

  onMounted(() => {
    DmDataService.getAllDM()
    .then((response) => {
      dms.value = response.data;
    })
        .catch((error) => {
              console.log(error)
            }
        )
  })

  const config = ref({
    enableTime: true,
  })

  const dms = ref([])
  const name = ref('')
  const type = ref(null)
  const dmDialog = ref(false)
  const updateName = ref('')
  const updateType = ref([])
  const oldName = ref('')
  const modifyDialog = ref(false)
  const timeslotDialog = ref(false)
  const selectedDm = ref('')
  const startTime = ref('')
  const endTime = ref('')
  const timeslots = ref([])
  const hasTimeslot = ref(false)

  const openDmDialog = () => {
    dmDialog.value = true
  }

  const openTimeslotDialog = async (dm) => {
    timeslotDialog.value = true
    selectedDm.value = dm
    await TimeslotDataService.getAllTimeslotsByName(selectedDm.value.name)
        .then((response) => {
          // console.log(response)
          if (response.data.length > 0) {
            timeslots.value = response.data;
            // console.log(response.data)
            console.log(timeslots.value)
            hasTimeslot.value = true
          } else {
            timeslots.value = []
            alert(response.data.message)
          }

        })
        .catch((error) => {
          console.log(error)
        })
  }

  const openModifyDialog = (dm) => {
    selectedDm.value = dm
    modifyDialog.value = true
    updateName.value = dm.name
    updateType.value = dm.type.split(',')
    oldName.value = dm.name
  }

  const createDm = () => {
    const data = {
      name: name.value,
      type: type.value.toString(),
    }
    console.log(data.type)
    DmDataService.createDM(data)
        .then((response) => {
          console.log(response.data)
          if(response.data.success){
            alert(response.data.message)
            location.reload()
          }
          else
            alert(response.data.message)

        })
        .catch((error) => {
          console.log(error)
        })
  }

  const updateDm = () => {
    const data = {
      name: updateName.value,
      type: updateType.value.toString(),
      oldName: oldName.value,
    }
    DmDataService.modifyDM(data)
        .then((response) => {
          if(response.data.success){
            alert(response.data.message)
            location.reload()
          }
          else
            alert(response.data.message)
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const deleteDm = (name) => {
    DmDataService.deleteDM(name)
        .then((response) => {
          if(response.data.success){
            alert(response.data.message)
            location.reload()
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const uploadTimeslot = () => {
    if(startTime.value === '' || endTime.value === ''){
      alert('日期不能为空')
    }
    else{
      const data = {
        period: startTime.value + " - " + endTime.value,
        dm: selectedDm.value.name
      }
      TimeslotDataService.uploadTimeslots(data)
          .then(response => {
            if(response.data.success){
              alert(response.data.message)
            }
          })
          .catch((error) => {
            console.log(error)
          })
    }
  }

  const deleteTimeSlot = (timeslot) => {
    const data = {
      timeslot: timeslot,
      dm: selectedDm.value.name
    }
    console.log(data)
    TimeslotDataService.deleteTimeslots(data)
    .then((response) => {
      if(response.data.success){
        alert(response.data.message)
      }
    })
        .catch((error) => {
          console.log(error)
        })
  }


</script>

<template>
  <div class="dmTable">
    <v-table
        fixed-header
        class="table-striped table-hover"
    >
      <thead>
      <tr>
        <th class="text-left">
          DM
        </th>
        <th class="text-left">
          DM擅长类型
        </th>
        <th class="text-left">
          操作
        </th>
        <th class="text-left">
          <v-btn color="primary" @click="openDmDialog">新增DM</v-btn>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="dm in dms"
          :key="dm.name"
      >
        <td>{{ dm.name }}</td>
        <td>
          <v-chip
              v-for="(type) in dm.type.split(',')"
              :key="type"
              density=comfortable
          >
            {{type}}
          </v-chip>
        </td>
        <td><v-btn color="primary" @click="openModifyDialog(dm)">编辑</v-btn></td>
        <td><v-btn color="primary" block @click="openTimeslotDialog(dm)">编辑下一周可预约时间</v-btn></td>
        <td><v-btn color="red" @click="deleteDm(dm.name.toString())">删除</v-btn></td>
      </tr>
      </tbody>
    </v-table>
  </div>

  <v-dialog v-model="dmDialog" hide-overlay class="dmDialog">
    <v-card class="createDmCard">
      <v-container>
        <v-sheet>
          <v-form @submit.prevent>
            <v-text-field
                label="DM名字"
                v-model="name"
                :rules="[v => !!v || '此处不能为空']"
            ></v-text-field>
            <v-select
                label="DM擅长类型"
                v-model="type"
                :items="['本格','变格','推理','硬核','情感','古风','阵营','机制','还原','欢乐']"
                chips
                multiple
                :rules="[v => !!v || '此处不能为空']"
            ></v-select>
            <v-btn color="success" type="submit" block @click="createDm">提交</v-btn>
          </v-form>
        </v-sheet>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog v-model="modifyDialog" hide-overlay class="modifyDialog">
    <v-card class="modifyDmCard">
      <v-container>
        <v-sheet>
          <v-form @submit.prevent>
            <v-text-field
                label="DM名字"
                v-model="updateName"
                :rules="[v => !!v || '此处不能为空']"
            ></v-text-field>
            <v-select
                label="DM擅长类型"
                v-model="updateType"
                :items="['本格','变格','推理','硬核','情感','古风','阵营','机制','还原','欢乐']"
                chips
                multiple
                :rules="[v => !!v || '此处不能为空']"

            ></v-select>
            <v-btn type="submit" block @click="updateDm">提交</v-btn>
          </v-form>
        </v-sheet>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog v-model="timeslotDialog" persistent hide-overlay class="timeslotDialog">
    <v-card class="timeslotCard">
      <v-container>
        <v-sheet>
          <v-form @submit.prevent>
            <div class="text-center text-h4"
            >{{selectedDm.name}}</div>
            <v-divider></v-divider>
            <div>开始时间:</div>
            <flat-pickr
                v-model="startTime"
                :config="config"
                :rules="[v => !!v || '此处不能为空']"
            />
            <div>结束时间</div>

            <flat-pickr
                v-model="endTime"
                :config="config"
                :rules="[v => !!v || '此处不能为空']"
            />
            <div>选择日期: {{startTime + " - " + endTime}}</div>

            <v-btn color="primary" type="submit" @click="uploadTimeslot">上传日期</v-btn>
          </v-form>
          <div>
            <v-table
                fixed-header
                class="table-striped table-hover"
                :v-if="hasTimeslot.value"
            >
              <thead>
              <tr>
                <th class="text-left">
                  日期
                </th>
<!--                <th class="text-left">-->
<!--                  <v-btn color="primary" @click="refreshTable">刷新</v-btn>-->
<!--                </th>-->
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="timeslot in timeslots"
                  :key="timeslot.period"
              >
                <td>{{timeslot.period}}</td>
                <td><v-btn color="warning" @click="deleteTimeSlot(timeslot.period.toString())">删除</v-btn></td>
              </tr>

              </tbody>
            </v-table>
          </div>
          <v-btn color="secondary" @click="timeslotDialog = false">关闭</v-btn>

        </v-sheet>
      </v-container>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>