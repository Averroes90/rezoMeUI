<template>
  <div class="onlyoffice-wrapper">
    <p v-if="loading" class="status">Loading document …</p>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Only render when the config is ready -->
    <div v-if="config && !loading" class="editor-container">
      <DocumentEditor
        v-if="config && !loading"
        :key="editorKey"
        :id="editorId"
        documentServerUrl="http://localhost:82"
        :config="config"
        :onLoadComponentError="onLoadComponentError"
        height="100%"
        width="100%"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { DocumentEditor } from '@onlyoffice/document-editor-vue';

const props = defineProps({
  docId: { type: String, required: false },
  readOnly: { type: Boolean, default: false },
  editorType: { type: String, default: 'default' }, // Added to make each editor unique
});
const route = useRoute();
const docId = computed(() => props.docId || route.params.id);
const editorId = computed(() => `docEditor_${props.editorType}_${docId.value}`);
const editorKey = computed(
  () => `${props.editorType}_${docId.value}_${Date.now()}`
);

const loading = ref(true);
const error = ref(null);
const config = ref(null);

/* --- fetch editor config from your backend --- */
async function fetchDocConfig(id) {
  const res = await fetch(`http://localhost:8000/api/docs/${id}/view`);
  if (!res.ok) throw new Error(`Backend responded ${res.status}`);
  return res.json();
}

/* --- Prepare OnlyOffice config and make it reactive --- */
async function loadDocument() {
  loading.value = true;
  error.value = null;
  try {
    const cfg = await fetchDocConfig(docId.value);

    // 🔍 1.  Inspect the token
    // console.log(
    //   '%cToken type:',
    //   'color:steelblue;font-weight:bold',
    //   typeof cfg.token
    // );
    // console.log(
    //   '%cToken preview:',
    //   'color:steelblue',
    //   cfg.token?.slice(0, 60) + '…'
    // );
    // console.log('Token length:', cfg.token.length);
    config.value = {
      token: cfg.token,
      document: {
        fileType: 'docx',
        key: cfg.key,
        title: cfg.fileName,
        url: cfg.fileUrl,
      },
      documentType: 'word',
      editorConfig: {
        callbackUrl: cfg.callbackUrl,
        mode: props.readOnly ? 'view' : 'edit',
        lang: 'en',
        // coEditing: { mode: 'fast' },
      },
      permissions: {
        edit: !props.readOnly,
        comment: true,
        download: true,
      },
    };
  } catch (e) {
    error.value = e.message ?? 'Could not load document';
  } finally {
    loading.value = false;
  }
}
/* --- error handler passed to the component --- */
function handleEditorDestroy() {
  try {
    if (window.DocsAPI && window.DocsAPI.DocEditor) {
      const editorInstance =
        window.DocsAPI.DocEditor.instances?.[editorId.value];
      if (editorInstance) {
        console.log(`Destroying editor instance: ${editorId.value}`);
        editorInstance.destroyEditor();
      }
    }
  } catch (e) {
    console.warn('Error destroying editor instance:', e);
  }
}
/* --- error handler passed to the component --- */
function onLoadComponentError(code, description) {
  console.error('OnlyOffice load error:', code, description);
  error.value = description;
}

onMounted(loadDocument);
onBeforeUnmount(handleEditorDestroy);
watch(docId, (n, o) => {
  if (n && n !== o) {
    handleEditorDestroy(); // Clean up old instance
    loadDocument();
  }
});
</script>

<style scoped>
.onlyoffice-wrapper {
  width: 100%;
  height: 100%; /* Make wrapper take full height of parent */
  display: flex;
  flex-direction: column;
}
.editor-container {
  flex: 1;
  min-height: 600px; /* Set a minimum height to ensure visibility */
  position: relative;
}
.status {
  padding: 1rem;
  font-style: italic;
}
.error {
  padding: 1rem;
  color: red;
}

/* When the DocumentEditor is rendered, make it fill available space */
:deep([id^='docEditor_']) {
  flex: 1;
  min-height: 600px; /* Set a minimum height to ensure visibility */
}
</style>
