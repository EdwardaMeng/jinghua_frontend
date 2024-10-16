<script setup>
  import {onMounted, ref} from "vue";
  import axios from "axios";
  import ScriptsDataService from "@/services/ScriptsDataService.js";


  const number = ref('')
  const script = ref('')
  const result = ref('')

  // const getScriptNumber = async() => {
  //   ScriptsService.get(1)
  //     .then((response) => {
  //       number.value = response.data
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
  const getScriptNumber = async() => {
    ScriptsDataService.getAll()
        .then((response) => {
          number.value = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const getScript = async() => {
    ScriptsDataService.get(script)
        .then((response) => {
          if(response.data.length === 0) {
            alert('No such script')
          }
          else{
            script.value = response.data
            console.log(response.data)
          }
        })
        .catch((error) => {
          if(error.status === 404) {
            result.value = 'No such script'
          }
        })
  }

  const deleteScript = async() => {
    ScriptsDataService.delete(script)
        .then((response) => {
          result.value = response.data
          console.log(response.data)
        })
        .catch((error) => {
          if(error.status === 404) {
            result.value = 'No such script'
          }
        })
  }

</script>
<template>
  <div style="color: white">
    <div class="text-h5" >所有剧本: {{number}}</div>
    <v-btn @click="getScriptNumber">get</v-btn>
    <div class="text-h5" >剧本:{{script}}</div>
    <div class="text-h5" >result:{{result}}</div>

    <v-btn @click="getScript">get</v-btn>
    <v-text-field v-model="script"></v-text-field>
    <v-btn @click="deleteScript">delete</v-btn>

    <div></div>
  </div>


</template>

<style scoped>

</style>