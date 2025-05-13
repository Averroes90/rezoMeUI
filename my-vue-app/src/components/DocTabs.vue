<!-- src/components/DocTabs.vue -->
<template>
  <v-card flat elevation="0" class="doc-tabs-card">
    <v-tabs
      v-model="activeTab"
      bg-color="transparent"
      color="deep-orange"
      dark
      class="doc-tabs"
    >
      <v-tab value="Resume">Resume</v-tab>
      <v-tab value="Cover Letter">Cover Letter</v-tab>
    </v-tabs>

    <v-card-text class="doc-tabs-content">
      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="Resume" class="tabs-window-item">
          <div class="editor-area">
            <keep-alive>
              <OnlyOfficeViewer
                v-show="activeTab === 'Resume'"
                :doc-id="resumeDocId"
                :read-only="resumeDocId === 'placeholder'"
                editor-type="resume"
              />
            </keep-alive>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="Cover Letter" class="tabs-window-item">
          <div class="editor-area">
            <keep-alive>
              <OnlyOfficeViewer
                v-show="activeTab === 'Cover Letter'"
                :doc-id="coverLetterDocId"
                :read-only="coverLetterDocId === 'placeholder'"
                editor-type="coverletter"
              />
            </keep-alive>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import OnlyOfficeViewer from './OnlyOfficeViewer.vue';
// 1) Define props and emits
const props = defineProps({
  resumeDocId: { type: String, default: 'placeholder' },
  coverLetterDocId: { type: String, default: 'placeholder' },
});

// 4) Track active tab
const activeTab = ref('Resume');

// Use nextTick to avoid rendering issues during tab transitions
watch(
  activeTab,
  async (newTab, oldTab) => {
    if (newTab !== oldTab) {
      await nextTick();
      console.log(`Tab changed to: ${newTab}`);
    }
  },
  { flush: 'post' }
);
// Make sure components are mounted properly
onMounted(async () => {
  await nextTick();
});
</script>

<style scoped>
/* -------------------------------------------
   2. STYLES: Flatten the card & control width
-------------------------------------------- */

/* Remove or reduce the default Vuetify card styling */
.doc-tabs-card {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  margin: 0; /* Let the parent container handle spacing */
  display: flex;
  flex-direction: column;
  height: 100%; /* Take full height of parent container */
}

/* The v-tabs bar:
   - If you prefer a lighter background, remove bg-color="primary" from the template.
   - Or keep it and set text to white with the "dark" prop. */
.doc-tabs {
  /* By default, v-tabs has some horizontal padding & possibly shadow if floating. */
  min-height: 40px; /* Slightly shorter tabs bar (optional) */
}

/* Controls padding around the tab content */
.doc-tabs-content {
  overflow: visible;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 0;
  flex: 1; /* Allow tab content to take remaining space */
  display: flex;
  flex-direction: column;
  min-height: 700px; /* Set a reasonable minimum height */
}
/* Make sure tabs window takes full height */
:deep(.v-window) {
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* Make sure active tab takes full height */
:deep(.v-window__container) {
  height: 100%;
}

.tabs-window-item {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
