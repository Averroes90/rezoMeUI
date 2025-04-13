<!-- src/components/JobLinkInput.vue -->
<template>
    <div class="job-link-input">
      <label>Job Link:</label>
      <input v-model="jobLink" type="text" placeholder="Paste job link here..." />
      <div>
        <input
          type="checkbox"
          id="includeCoverLetter"
          v-model="includeCoverLetter"
        />
        <label for="includeCoverLetter">Include Cover Letter</label>
      </div>
      <button @click="handleGenerate">Generate</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JobLinkInput',
    data() {
      return {
        jobLink: '',
        includeCoverLetter: false,
      }
    },
    methods: {
      handleGenerate() {
        // Eventually call your backend with jobLink & includeCoverLetter
        alert(`Generating with link: ${this.jobLink}\nCover Letter: ${this.includeCoverLetter}`)
      },
    },
  }
  </script>
  
  <style scoped>
  .job-link-input {
    margin-bottom: 1rem;
  }
  input[type="text"] {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  </style>