<script setup>
import {onMounted, ref} from "vue";
  import scriptsDataService from "@/services/ScriptsDataService.js";
  const scripts = ref([]);
  const selectedScriptName = ref(null);
  const modifyDialog = ref(false);
  const updateScriptName = ref(null);
  const updateScriptDescription = ref(null);
  const updateScriptType = ref([]);
  const updateScriptDuration = ref(null);
  const updateScriptPlayersNumber = ref(null);
  const updateScriptPlayersNumberDescription = ref(null);
  const updateScriptPrice = ref(null);
  const updateScriptImage = ref(null);
  const oldName = ref(null);

  const deleteScript = async (scriptName) => {
    console.log(scriptName)
    selectedScriptName.value = scriptName
    await scriptsDataService.delete(selectedScriptName.value)
        .then((response) => {
          alert(`删除${selectedScriptName.value}成功`)
          console.log(response.data)
        })
        .catch((error) => {
          if (error.status === 404) {
            alert('No such script')
          }
        })
    location.reload()
  }

  const openModifyDialog = (script) => {
    modifyDialog.value = true
    updateScriptType.value = script.scriptType.split(',')
    updateScriptName.value = script.scriptName
    updateScriptDescription.value = script.scriptDescription
    updateScriptPlayersNumber.value = script.scriptPlayersNumber
    updateScriptPlayersNumberDescription.value = script.scriptPlayersNumberDescription
    updateScriptPrice.value = script.scriptPrice
    updateScriptDuration.value = script.scriptDuration
    updateScriptImage.value = script.scriptImage
    oldName.value = script.scriptName
  }

  const modifyScript = async () => {
    const typeToString = updateScriptType.value.toString()
    const updateScript = {
      scriptName: updateScriptName.value,
      scriptDescription: updateScriptDescription.value,
      scriptType: typeToString,
      scriptDuration: updateScriptDuration.value,
      scriptPlayersNumber: updateScriptPlayersNumber.value,
      scriptPlayersNumberDescription: updateScriptPlayersNumberDescription.value,
      scriptPrice: updateScriptPrice.value,
      scriptImage: updateScriptImage.value,
      oldName: oldName.value,
    }

    await scriptsDataService.modify(updateScript)
        .then((response) => {
          if(response.data.success) {
            alert(response.data.message)
            location.reload()
          }
          else{
            alert(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  onMounted(async () => {
    await scriptsDataService.getAll()
        .then((response) => {
          scripts.value = response.data
        })
        .catch((error) => {
          console.log(error)
        })
  })

</script>

<template>
  <div class="scriptTable">
    <v-table
        fixed-header
        class="table-striped table-hover"
    >
      <thead>
      <tr>
        <th class="text-left">
          剧本封面
        </th>
        <th class="text-left">
          剧本名字
        </th>
        <th class="text-left">
          剧本类型
        </th>
        <th class="text-left">
          剧本价格
        </th>
        <th class="text-left">
          剧本人数
        </th>
        <th class="text-left">
          剧本人数描述
        </th>
        <th class="text-left">
          剧本时长
        </th>
        <th class="text-left">
          剧本介绍
        </th>
        <th class="text-left">
          操作
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="script in scripts"
          :key="script.scriptName"
      >
        <td><v-img :src="script.scriptImage"></v-img></td>
        <td>{{ script.scriptName }}</td>
        <td>
          <v-chip
              v-for="(type) in script.scriptType.split(',')"
              :key="type"
              density=comfortable
          >
            {{type}}
          </v-chip>
        </td>
        <td>{{ script.scriptPrice }}</td>
        <td>{{ script.scriptPlayersNumber }}</td>
        <td>{{ script.scriptPlayersNumberDescription }}</td>
        <td>{{ script.scriptDuration }}</td>
        <td>{{ script.scriptDescription }}</td>
        <td><v-btn color="primary" @click="openModifyDialog(script)">编辑</v-btn></td>
        <td><v-btn color="red" @click="deleteScript(script.scriptName.toString())">删除</v-btn></td>
      </tr>
      </tbody>
    </v-table>
  </div>

  <v-dialog v-model="modifyDialog" hide-overlay class="scriptDialog">
    <v-card class="modifyCard">
      <v-container>
        <v-sheet>
              <v-form @submit.prevent>
                <v-text-field
                    label="剧本名字"
                    v-model="updateScriptName"
                    :rules="[v => !!v || '此处不能为空']"
                ></v-text-field>
                <v-text-field
                    label="剧本价格"
                    v-model="updateScriptPrice"
                    :rules="[v => !!v || '此处不能为空']"
                ></v-text-field>
                <v-select
                    label="剧本人数"
                    v-model="updateScriptPlayersNumber"
                    :items=[5,6,7,8,9,10]
                    :rules="[v => !!v || '此处不能为空']"

                ></v-select>
                <v-text-field
                    label="剧本人数描述"
                    v-model="updateScriptPlayersNumberDescription"
                    :rules="[v => !!v || '此处不能为空']"

                ></v-text-field>
                <v-text-field
                    label="剧本描述"
                    v-model="updateScriptDescription"
                    :rules="[v => !!v || '此处不能为空']"

                ></v-text-field>
                <v-select
                    label="剧本类型"
                    v-model="updateScriptType"
                    :items="['热门','本格','变格','推理','硬核','情感','古风','阵营','机制','还原','欢乐']"
                    chips
                    multiple
                    :rules="[v => !!v || '此处不能为空']"
                ></v-select>
                <v-text-field
                    label="剧本时长"
                    v-model="updateScriptDuration"
                    :rules="[v => !!v || '此处不能为空']"

                ></v-text-field>
                <v-text-field
                    v-model="updateScriptImage"
                    accept="image/*"
                    label="剧本封面"
                    :rules="[v => !!v || '此处不能为空']"
                ></v-text-field>
                <v-btn-group>
                  <v-btn color="primary" @click="modifyScript">提交编辑</v-btn>
                  <v-btn color="secondary" @click="modifyDialog=false">关闭</v-btn>
                </v-btn-group>

              </v-form>

        </v-sheet>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.scriptTable{
  width: 99%;
  margin: 10px;
  height: 99%;
}
</style>