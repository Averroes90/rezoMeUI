<!-- src/App.vue -->
<template>
  <v-app>
    <!-- DRAWER -->
    <v-navigation-drawer
  v-model="drawer"
  v-model:rail="isRail"
  permanent
  floating
  expand-on-hover
  :width="300"
  :rail-width="40"
  location="start"
>
  <!-- Show minimal content when rail = true (mini/rail mode) -->
  <template v-if="isRail">
    <div class="mini-content">
      <v-btn icon="mdi-menu" variant="text"></v-btn>
      <!-- Possibly a few icons or a single narrow column -->
    </div>
  </template>
  
  <!-- Show the full left-pane contents when rail = false (expanded) -->
  <template v-else>
    <div class="expanded-content">
      <JobLinkInput @generated="handleGenerated" />
      <RelevantBackgroundInfo :info="relevantBackground" />
    </div>
  </template>
</v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main>
      <div class="right-pane">
        <DocTabs
          :resume-content="resumeText"
          :cover-letter-content="coverLetterText"
        />
        <ChatWindow />
        <v-btn @click="exportToPDF" class="export-button">
          Export to PDF
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import JobLinkInput from './components/JobLinkInput.vue'
import RelevantBackgroundInfo from './components/RelevantBackgroundInfo.vue'
import DocTabs from './components/DocTabs.vue'
import ChatWindow from './components/ChatWindow.vue'
const drawer = ref(true)
const isRail = ref(true)
/* Reactive state to hold backend responses */
const relevantBackground = ref([])
const resumeText = ref('')
const coverLetterText = ref('')

function handleGenerated(data) {
  // data => { relevantBackground: [...], resumeText: "...", coverLetterText: "..." }
  if (data.relevantBackground) {
    relevantBackground.value = data.relevantBackground
  }
  if (data.resumeText) {
    resumeText.value = data.resumeText
  }
  if (data.coverLetterText) {
    coverLetterText.value = data.coverLetterText
  }
}

function exportToPDF() {
  alert('TODO: Implement PDF export!')
  // We'll handle PDF generation in a future step.
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  /* font-family is likely in global styles, so can be omitted or kept */
  font-family: sans-serif;
}

.mini-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Possibly add a bit of top/bottom padding */
  padding: 8px 0;
}

.expanded-content {
  padding: 16px;
}

.right-pane {
  flex: 1;
  padding: 1rem;
  /* You could also give this a dark background or just let global body color show */

}

.export-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  /* The button color is controlled by global styles (var(--accent-color)), 
     so no need to override here unless you want a special style. */
}
</style>