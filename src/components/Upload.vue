<script setup>
import {ref} from "vue";
import ScriptsDataService from "@/services/ScriptsDataService.js";

const scriptName = ref("")
  const scriptPrice = ref()
  const scriptNumberOfPlayers = ref()
  const scriptNumberOfPlayersDescription = ref("")
  const scriptDescription = ref("")
  const scriptDuration = ref("")
  const scriptType = ref([])
  const scriptImage = ref("")

  const uploadScript = () => {
    const scriptTypeToString = scriptType.value.toString()
    const data = {
      scriptName: scriptName.value,
      scriptPrice: scriptPrice.value,
      scriptPlayersNumber: scriptNumberOfPlayers.value,
      scriptPlayersNumberDescription: scriptNumberOfPlayersDescription.value,
      scriptDescription: scriptDescription.value,
      scriptDuration: scriptDuration.value,
      scriptType: scriptTypeToString,
      scriptImage: scriptImage.value,
    }
    ScriptsDataService.create(data)
        .then((response) => {
          console.log(response.data.message)
          alert(response.data.message)
          location.reload()

        })
        .catch((error) => {
          console.log(error)
        })
  }
</script>

<template>
  <v-sheet>
    <v-form @submit.prevent>
      <v-text-field
          label="剧本名字"
          v-model="scriptName"
          :rules="[v => !!v || '此处不能为空']"
      ></v-text-field>
      <v-text-field
          label="剧本价格"
          v-model="scriptPrice"
          :rules="[v => !!v || '此处不能为空']"
      ></v-text-field>
      <v-select
          label="剧本人数"
          v-model="scriptNumberOfPlayers"
          :items=[5,6,7,8,9,10]
          :rules="[v => !!v || '此处不能为空']"

      ></v-select>
      <v-text-field
          label="剧本人数描述"
          v-model="scriptNumberOfPlayersDescription"
          :rules="[v => !!v || '此处不能为空']"

      ></v-text-field>
      <v-text-field
          label="剧本描述"
          v-model="scriptDescription"
          :rules="[v => !!v || '此处不能为空']"

      ></v-text-field>
      <v-select
          label="剧本类型"
          v-model="scriptType"
          :items="['热门','本格','变格','推理','硬核','情感','古风','阵营','机制','还原','欢乐']"
          chips
          multiple
          :rules="[v => !!v || '此处不能为空']"

      ></v-select>
      <v-text-field
          label="剧本时长"
          v-model="scriptDuration"
          :rules="[v => !!v || '此处不能为空']"

      ></v-text-field>
      <v-text-field
          v-model="scriptImage"
          label="剧本封面"
          :rules="[v => !!v || '此处不能为空']"
      ></v-text-field>
<!--      <v-file-input-->
<!--          v-model="scriptImageFile"-->
<!--          label="剧本封面"-->
<!--          :rules="[v => !!v || '此处不能为空']"-->
<!--      >-->
<!--      </v-file-input>-->
      <v-btn type="submit" block @click="uploadScript">上传剧本</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>