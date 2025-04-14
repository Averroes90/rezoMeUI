<!-- src/components/DocTabs.vue -->
<template>
    <v-card>
      <!-- The Tabs (v-model binds the active tab) -->
      <v-tabs v-model="activeTab" bg-color="primary">
        <v-tab value="Resume">Resume</v-tab>
        <v-tab value="Cover Letter">Cover Letter</v-tab>
      </v-tabs>
  
      <!-- The Tabs Content -->
      <v-card-text>
        <v-tabs-window v-model="activeTab">
          <v-tabs-window-item value="Resume">
            <DecoupledEditor v-model="internalResume" />
          </v-tabs-window-item>
  
          <v-tabs-window-item value="Cover Letter">
            <DecoupledEditor v-model="internalCoverLetter" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </template>z
  
  <script setup>
  import { ref, watch} from 'vue'
  import DecoupledEditor from './DecoupledEditor.vue'
  import { defineProps } from 'vue'
  

  const props = defineProps({
  resumeContent: String,
  coverLetterContent: String
})

  const emit = defineEmits(['update:resumeContent', 'update:coverLetterContent'])
  const internalResume = ref(props.resumeContent)
  const internalCoverLetter = ref(props.coverLetterContent)
  const tabs = ['Resume', 'Cover Letter']
  const activeTab = ref('Resume')
  // Watch for changes in the local refs and emit them upward
  watch(internalResume, (val) => emit('update:resumeContent', val))
  watch(internalCoverLetter, (val) => emit('update:coverLetterContent', val))
  </script>
  
  <style scoped>

  </style>