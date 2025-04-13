<!-- src/components/DocTabs.vue -->
<template>
    <div class="doc-tabs">
      <ul class="tabs">
        <li
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: tab === activeTab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </li>
      </ul>
  
      <div class="tab-content">
        <!-- Simple logic to display different content based on active tab -->
        <div v-if="activeTab === 'Resume'">
          <EditableDoc :docContent="resumeContent" />
        </div>
        <div v-else-if="activeTab === 'Cover Letter'">
          <EditableDoc :docContent="coverLetterContent" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EditableDoc from './EditableDoc.vue'
  
  export default {
    name: 'DocTabs',
    components: { EditableDoc },
    data() {
      return {
        tabs: ['Resume', 'Cover Letter'], // Adjust if cover letter is optional
        activeTab: 'Resume',
        resumeContent: "Resume content goes here...",
        coverLetterContent: "Cover letter content goes here...",
      }
    },
  }
  </script>
  
  <style scoped>
  .doc-tabs {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 4px;
  }
  
  .tabs {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .tabs li {
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: #f1f1f1;
  }
  
  .tabs li.active {
    background-color: #ddd;
    font-weight: bold;
  }
  </style>