<!-- src/components/JobLinkInput.vue -->
<template>
  <div class="job-link-input">
    <!-- Row for Job Link -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="jobLink"
          label="Job Link"
          placeholder="Paste job link here..."
          outlined
        />
      </v-col>
    </v-row>

    <!-- Row for Resume -->
    <v-row>
      <!-- Left column: Checkbox -->
      <v-col cols="3" class="px-0">
        <v-checkbox v-model="includeResume" label="Resume" density="compact" />
      </v-col>

      <!-- Right column: Number input (only if checked) -->
      <v-col cols="3" v-if="includeResume" class="px-0 gx-0">
        <v-number-input
          v-model.number="resumePages"
          variant="outlined"
          controlVariant="stacked"
          :min="1"
          :max="3"
          density="compact"
          hide-details
          class="d-flex"
        />
        <h5>Pages</h5>
      </v-col>

      <!-- Row for Cover Letter -->

      <!-- Left column: Checkbox -->
      <v-col cols="3" class="px-0">
        <v-checkbox
          v-model="includeCoverLetter"
          label="Cover Letter"
          density="compact"
          class=""
        />
      </v-col>

      <!-- Right column: Number input (only if checked) -->
      <v-col cols="3" v-if="includeCoverLetter">
        <v-number-input
          v-model="coverLetterPages"
          :min="1"
          :max="3"
          variant="outlined"
          controlVariant="stacked"
          density="compact"
          hide-details
          class="d-flex"
        />
        <h5>Pages</h5>
      </v-col>
    </v-row>

    <!-- Row for Generate Button -->
    <v-row>
      <v-col cols="12">
        <v-btn variant="tonal" @click="handleGenerate"> Generate </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { generateDocs } from '../api.js';

// We define an emit so this component can send data up to the parent
const emit = defineEmits(['generated']);

const jobLink = ref('');
const includeResume = ref(false);
const includeCoverLetter = ref(false);
const resumePages = ref(1);
const coverLetterPages = ref(1);

// On button click, we call our backend and emit the result
// async function handleGenerate() {
//   try {
//     const data = await generateDocs(jobLink.value, includeCoverLetter.value);
//     // data might look like:
//     // { relevantBackground: [...], resumeText: "...", coverLetterText: "..." }
//     emit('generated', data);
//   } catch (error) {
//     console.error('Generation failed:', error);
//     // Optionally show an error message to the user
//   }
// }

function handleGenerate() {
  const docTypes = [];
  const styles = [];
  const pageCounts = [];

  // If user selected "Include Resume"
  if (includeResume.value) {
    docTypes.push('resume');
    styles.push('professional'); // Hardcode style
    pageCounts.push(String(resumePages.value));
  }

  // If user selected "Include Cover Letter"
  if (includeCoverLetter.value) {
    docTypes.push('cover_letter');
    styles.push('professional'); // Hardcode style
    pageCounts.push(String(coverLetterPages.value));
  }

  const variables_fp = {
    url: jobLink.value, // always the job link the user typed
    doc_type: docTypes,
    style: styles,
    page_count: pageCounts,
  };

  // Emit the final object up to the parent
  emit('generated', variables_fp);
}
</script>

<style scoped>
/* Prevent label text from wrapping */
</style>
