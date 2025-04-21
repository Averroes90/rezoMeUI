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
        <v-tabs-window-item value="Resume">
          <div class="editor-area">
            <CKEditorPremium v-model="internalResume" />
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="Cover Letter">
          <div class="editor-area">
            <CKEditorPremium v-model="internalCoverLetter" />
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
// import DecoupledEditor from './DecoupledEditor.vue';
import CKEditorPremium from './CKEditorPremium.vue';
// 1) Define props and emits
const props = defineProps({
  resumeContent: String,
  coverLetterContent: String,
});
const emit = defineEmits(['update:resumeContent', 'update:coverLetterContent']);

// 2) Create computed properties that emit changes
const internalResume = computed({
  get: () => props.resumeContent,
  set: (val) => emit('update:resumeContent', val),
});

const internalCoverLetter = computed({
  get: () => props.coverLetterContent,
  set: (val) => emit('update:coverLetterContent', val),
});

// 3) Watch changes in internalResume
watch(internalResume, (newVal, oldVal) => {
  console.log('internalResume changed from:', oldVal, 'to:', newVal);
});

// 4) Track active tab
const activeTab = ref('Resume');
</script>

<style scoped>
/* -------------------------------------------
   2. STYLES: Flatten the card & control width
-------------------------------------------- */

/* Remove or reduce the default Vuetify card styling */
.doc-tabs-card {
  /* No background or border if you like a truly minimal layout;
     else use background-color: #fff; for a plain white card. */
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  margin: 0; /* Let the parent container handle spacing */
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
  /* If you do NOT want the tab content itself to scroll, leave overflow as visible. 
     The child (editor) will handle scrolling. */
  overflow: visible;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 0; /* let the .editor-area or CKEditor container handle internal spacing */
}

/* Constrain the editor width & center it */
.editor-container {
  max-width: 800px; /* Adjust to your preference */
  margin: 0 auto;
  /* Possibly add some min-height if the editor is too tall or short */
  /* min-height: 400px; */
}
.editor-area {
  width: 100%;
  padding: 1rem;
}
</style>
