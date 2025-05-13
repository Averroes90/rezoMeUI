<!-- src/App.vue -->
<template>
  <v-app>
    <!-- TOP BAR (Header) -->
    <v-app-bar color="primary" dark app elevate-on-scroll class="app-bar">
      <v-container fluid>
        <v-row no-gutters align="center">
          <!-- Centered Title -->
          <v-col cols="auto" class="ml-auto pl-14">
            <span class="brand-title">🧠 rezoMe</span>
          </v-col>

          <!-- Right-aligned "Powered by" -->
          <v-col cols="auto" class="ml-auto powered-by-col">
            <div class="powered-by">
              <span>Powered by</span>
              <!-- Replace src with your actual path/logo -->
              <img
                src="./assets/aixplain-logo.png"
                alt="aiXplain"
                class="aixplain-logo"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- LEFT NAVIGATION DRAWER (unchanged from before) -->
    <v-navigation-drawer
      v-model="drawer"
      rail
      @update:rail="(val) => (isRail = val)"
      permanent
      floating
      expand-on-hover
      :width="500"
      :rail-width="40"
      location="start"
      class="custom-drawer"
    >
      <template v-if="isRail">
        <div class="mini-content">
          <v-btn icon="mdi-chevron-right" variant="text"></v-btn>
        </div>
      </template>

      <template v-else>
        <div class="expanded-content">
          <!-- Header row: a heading + chevron-left button -->
          <div class="expanded-header">
            <h3 class="drawer-title">Job Tools</h3>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            />
          </div>

          <!-- The rest of the content below the header row -->
          <JobLinkInput @generated="handleGenerated" />
          <RelevantBackgroundInfo :info="relevantBackground" />
        </div>
      </template>
    </v-navigation-drawer>

    <!-- MAIN CONTENT AREA -->
    <v-main>
      <!-- Container with a horizontal row for ChatWindow & DocTabs -->
      <v-container fluid class="content-container">
        <v-row no-gutters justify="space-between" class="gap-4">
          <!-- LEFT: Chat Window -->
          <v-col cols="4" class="chat-col pr-3">
            <ChatWindow />
          </v-col>

          <!-- RIGHT: DocTabs -->
          <v-col cols="8" class="doc-tabs-col">
            <DocTabs
              :resume-doc-id="resumeDocId"
              :cover-letter-doc-id="coverLetterDocId"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import JobLinkInput from './components/JobLinkInput.vue';
import RelevantBackgroundInfo from './components/RelevantBackgroundInfo.vue';
import DocTabs from './components/DocTabs.vue';
import ChatWindow from './components/ChatWindow.vue';
import { generateDocs } from './api.js';
const drawer = ref(true);
const isRail = ref(true);
/* Reactive state to hold backend responses */
const relevantBackground = ref([]);
const resumeDocId = ref('placeholder');
const coverLetterDocId = ref('placeholder');

// This function is triggered when the child emits its data
async function handleGenerated(variables_fp) {
  try {
    // Clear out previous data before making the API call

    // Now make the API call
    const responseData = await generateDocs(variables_fp);

    // Update local state with the response
    relevantBackground.value = responseData.background_info || [];
    resumeDocId.value = responseData.resume.doc_id;
    coverLetterDocId.value = responseData.cover_letter.doc_id;
  } catch (error) {
    console.error('Error calling generateDocs:', error);
  }
}

// function exportToPDF() {
//   alert('TODO: Implement PDF export!');
//   // We'll handle PDF generation in a future step.
// }
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  /* Let global background-color & text color apply. */
  font-family: sans-serif;
}
.custom-drawer {
  background-color: var(--bg-color) !important; /* or #fff if you prefer */
  box-shadow: none !important; /* Minimizes the default Vuetify shadow */
  border-right: 1px solid var(--border-color); /* Subtle separation */
}
/* Collapsed/mini content */
.mini-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
}

/* Expanded drawer content */
.expanded-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 16px;
  /* If child components have their own boxes (cards), that can be enough.
     You could remove extra borders or backgrounds inside those child components
     if it feels like "too many boxes." */
}
/* -----------------------------------
   3. Main Content Layout
------------------------------------ */
.content-container {
  /* Some vertical spacing below the top bar */
  padding-top: 16px;
  padding-bottom: 16px;
}
.right-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--bg-color);
}
/* 3a. Sticky Chat Column
   - position: sticky keeps this col pinned as the user scrolls 
     (the doc tabs col can be very tall).
   - top: var(--app-bar-height) + some offset to avoid hiding behind the bar.
*/
.chat-col {
  position: sticky;
  /* If your app bar is ~64px tall, add a bit of buffer for spacing: */
  top: 90px;
  align-self: flex-start; /* ensures the col doesn't stretch with the row */
  height: auto; /* let the internal chat window define height */
  max-height: calc(
    100vh - 80px
  ); /* so it fits in the viewport without overflow */
}
/* --------------------------------
   4. Chat Window (component)
   - Increase default size & handle overflow
---------------------------------*/
.chat-window {
  display: flex;
  flex-direction: column;
  /* Increase default height to ~5x if it was previously very small, e.g., 100px */
  min-height: 500px;
  /* Let it grow, but if it has extremely many messages, it can scroll internally. 
     Alternatively, put `overflow: auto;` on the .chat-messages. */
}

.chat-messages {
  flex: 1; /* Fill remaining space */
  overflow-y: auto; /* Scroll for messages if they exceed container height */
  padding: 0.5rem;
}
/* 
  DocTabs Wrapper
  ----------------
  1. Constrain the width so it doesn’t stretch the entire screen.
  2. Center it or offset it for a balanced look.
*/

.export-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  /* Global button styles handle main appearance.
     Add overrides if needed here, e.g.:
     background-color: var(--accent-color);
     color: #fff;
  */
}
.expanded-header {
  display: flex;
  align-items: center; /* vertically center items */
  justify-content: space-between; /* label on left, button on right */
  margin-bottom: 1rem; /* some spacing below the header */
}

.drawer-title {
  font-size: 1.125rem; /* or any desired size */
  margin: 0; /* remove default <h3> margin */
}
.app-bar {
  /* If you want the bar to be taller to accommodate bigger text, 
     you can increase the min-height here. Example: */
  min-height: 40px;
}
.brand-title {
  font-size: 2rem; /* Adjust as desired (1.5rem ≈ 24px). */
  /* If you want even larger: 2rem (≈ 32px) or more. */
  display: inline-flex;
  align-items: center; /* Keeps emoji nicely aligned with text. */
  margin: 0; /* Remove default heading margin if any. */
}
/* Container for "Powered by" + logo */
.powered-by {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space between text and logo */
}
/* The aiXplain logo */
.aixplain-logo {
  /* Example: match the bar height or stay small. 24px is typical for toolbar icons. */
  height: 40px;
  width: auto;
  object-fit: contain;
}
</style>
