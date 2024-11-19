<script setup>
import {onMounted, ref} from "vue";
import reservationService from "@/services/ReservationService.js";

  const reservations = ref([])

  onMounted(() => {
    reservationService.getAllReservations()
    .then(res => {
      reservations.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
  })
</script>

<template>
  <v-container>
    <v-table
        fixed-header
        class="table-striped table-hover"
    >
      <thead>
      <tr>
        <th class="text-left">
          预约玩家
        </th>
        <th class="text-left">
          DM
        </th>
        <th class="text-left">
          预约剧本
        </th>
        <th class="text-left">
          预约时间
        </th>
        <th class="text-left">
          微信
        </th>
        <th class="text-left">
          邮箱
        </th>
        <th class="text-left">
          电话
        </th>
        <th class="text-left">
          操作
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="reservation in reservations"
          :key="reservation.timeslot"
      >
        <td>{{ reservation.userName }}</td>
        <td>{{ reservation.dm}}</td>
        <td>{{ reservation.script }}</td>
        <td>{{ reservation.timeslot }}</td>
        <td>{{ reservation.wechat }}</td>
        <td>{{ reservation.email }}</td>
        <td>{{ reservation.phoneNumber }}</td>
<!--        <td><v-btn color="primary" @click="openModifyDialog(script)">编辑</v-btn></td>-->
<!--        <td><v-btn color="red" @click="deleteScript(script.scriptName.toString())">删除</v-btn></td>-->
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<style scoped>

</style>