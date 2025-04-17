<!-- src/components/DecoupledEditor.vue -->
<template>
  <div class="decoupled-editor-wrapper">
    <!-- The toolbar container (decoupled) -->
    <div ref="toolbarContainer" class="toolbar-container"></div>

    <!-- The editable area for the document -->
    <div class="document-editor">
      <ckeditor
        :editor="DecoupledEditor"
        v-model="computedValue"
        :config="editorConfig"
        @ready="onReady"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
/* 
    We define props so that we can pass initial content into this component,
    as well as emit updates upward.
  */
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
/*
    Sync changes: when the editor content updates,
    we emit 'update:modelValue' so v-model works from the parent.
  */
const computedValue = computed({
  get: () => props.modelValue,
  set: (newVal) => {
    emit('update:modelValue', newVal);
  },
});
/*
    Optional: CKEditor configuration.
    You can customize the toolbar, features, etc.
  */
const editorConfig = {
  // The 'Decoupled Document' build by default simulates page margins, etc.
  // If you want to tweak the page style, see CKEditor docs for custom styling.
  placeholder: 'Type your document here...',
  licenseKey: 'GPL',
  // Example: remove or add plugins from the build or adjust the toolbar
  // You can find full config references on the CKEditor documentation.
};

// This is called once the editor is ready
function onReady(editorInstance) {
  // The Decoupled Editor build doesn't attach the toolbar automatically.
  // We need to move the editor's toolbar to the .toolbar-container div.
  const toolbarContainerEl = toolbarContainer.value;
  if (toolbarContainerEl) {
    toolbarContainerEl.appendChild(editorInstance.ui.view.toolbar.element);
  }
}

// Bind the local ref for the toolbar container
const toolbarContainer = ref(null);
</script>

<style scoped>
.decoupled-editor-wrapper {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 1rem;
  background-color: #fafafa; /* Light container background */
}

/* The toolbar container can live anywhere you like in the layout. */
.toolbar-container {
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
}

/* 
    :deep() ensures the style applies inside CKEditor’s shadowed or 
    deeply nested elements, even with scoped CSS in Vue 3.
  */
:deep(.ck-editor__editable[role='textbox']) {
  min-height: 500px;
  background-color: #fff !important; /* Make the main editing area white */
  color: #000 !important; /* Ensure black text on white background */
}

/*
    Alternatively, you can target :deep(.ck-content), 
    depending on how your decoupled build structures the DOM.
  */
</style>
