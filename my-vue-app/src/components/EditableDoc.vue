<!-- src/components/EditableDoc.vue -->
<template>
    <div class="editable-doc">
      <div class="page" contenteditable="true">
        {{ docContent }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditableDoc',
    props: {
      docContent: {
        type: String,
        default: '',
      },
    },
  }
  </script>
  
  <style scoped>
  .editable-doc {
    background-color: #f9f9f9;
    padding: 1rem;
    min-height: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .page {
    background-color: #fff;
    width: 8.5in; /* letter paper width, adjust for A4 if desired */
    min-height: 11in; /* letter paper height */
    margin: 0 auto;
    padding: 1in;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    overflow: auto;
  }
  </style>