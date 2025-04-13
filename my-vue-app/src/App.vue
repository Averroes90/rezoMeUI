<!-- src/App.vue -->
<template>
  <div class="app-container">
    <aside class="left-pane">
      <JobLinkInput />
      <!-- For now, pass a hardcoded array to show how it works -->
      <RelevantBackgroundInfo :info="['5 years experience in Vue', 'Machine learning background']" />
    </aside>

    <main class="right-pane">
      <DocTabs />
      <ChatWindow />
      <button @click="exportToPDF" class="export-button">Export to PDF</button>
    </main>
  </div>
</template>

<script>
import JobLinkInput from './components/JobLinkInput.vue'
import RelevantBackgroundInfo from './components/RelevantBackgroundInfo.vue'
import DocTabs from './components/DocTabs.vue'
import ChatWindow from './components/ChatWindow.vue'

export default {
  name: 'App',
  components: {
    JobLinkInput,
    RelevantBackgroundInfo,
    DocTabs,
    ChatWindow
  },
  methods: {
    exportToPDF() {
      alert('Export to PDF clicked!')
      // We'll handle actual PDF logic later (maybe via client-side or backend approach)
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.left-pane {
  width: 25%;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  padding: 1rem;
}

.right-pane {
  flex: 1;
  padding: 1rem;
}

.export-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>