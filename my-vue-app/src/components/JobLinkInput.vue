<!-- src/components/JobLinkInput.vue -->
<template>
  <div class="job-link-input">
    <label for="jobLink">Job Link:</label>
    <input
      id="jobLink"
      v-model="jobLink"
      type="text"
      placeholder="Paste job link here..."
    />

    <div>
      <input
        type="checkbox"
        id="includeCoverLetter"
        v-model="includeCoverLetter"
      />
      <label for="includeCoverLetter">Include Cover Letter</label>
    </div>

    <v-btn @click="handleGenerate" variant="tonal">Generate</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { generateDocs } from '../api.js';

// We define an emit so this component can send data up to the parent
const emit = defineEmits(['generated']);

const jobLink = ref('');
const includeCoverLetter = ref(false);

// On button click, we call our backend and emit the result
async function handleGenerate() {
  try {
    const data = await generateDocs(jobLink.value, includeCoverLetter.value);
    // data might look like:
    // { relevantBackground: [...], resumeText: "...", coverLetterText: "..." }
    emit('generated', data);
  } catch (error) {
    console.error('Generation failed:', error);
    // Optionally show an error message to the user
  }
}
</script>

<style scoped></style>
