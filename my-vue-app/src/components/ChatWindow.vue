<!-- src/components/ChatWindow.vue -->
<template>
  <div class="chat-window">
    <div class="chat-messages">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="['message', msg.sender]"
      >
        <strong>{{ msg.sender.toUpperCase() }}:</strong> {{ msg.text }}
      </div>
    </div>
    <div class="chat-input">
      <input
        type="text"
        v-model="userMessage"
        placeholder="Type your request..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindow',
  data() {
    return {
      messages: [
        { sender: 'ai', text: 'Hello! How can I help?' },
        { sender: 'user', text: 'Please change the resume header font size.' },
      ],
      userMessage: '',
    };
  },
  methods: {
    sendMessage() {
      if (!this.userMessage.trim()) return;
      // Add user's message to the chat
      this.messages.push({ sender: 'user', text: this.userMessage });
      const userMessageCopy = this.userMessage;
      this.userMessage = '';

      // Simulate AI response (replace with backend call)
      setTimeout(() => {
        this.messages.push({
          sender: 'ai',
          text: `Got it. I will update the font size for "${userMessageCopy}".`,
        });
      }, 1000);
    },
  },
};
</script>

<style scoped>
.chat-window {
  /* Use flex layout so .chat-messages can expand and .chat-input stays at the bottom */
  display: flex;
  flex-direction: column;

  /* If you want this component to fill all available vertical space from the parent, 
     set height to 100%, and remove any fixed margins or heights. */
  height: 100%; /* or min-height: 400px; if you prefer a default size */

  border: 1px solid var(--border-color);
  background-color: #fff;
  color: var(--text-color);
  border-radius: 4px;
  padding: 1rem;
  /* Remove margin-top so it can align exactly to the parent container 
     (or keep it if you like a little spacing from the top). */
  /* margin-top: 1rem; */
  gap: 1rem;
}

/* The chat-messages area automatically expands to fill leftover space. */
.chat-messages {
  flex: 1;
  overflow-y: auto;

  /* Remove the fixed max-height so it can grow with the container */
  /* max-height: 200px; */

  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  padding: 0.5rem;
  border-radius: 4px;
}

/* Normal message styling, unchanged */
.message {
  margin-bottom: 0.5rem;
}
.message.ai {
  color: var(--accent-color);
}
.message.user {
  color: var(--text-color);
  text-align: right;
}

/* The input row remains at the bottom, does not grow */
.chat-input {
  display: flex;
  gap: 0.5rem;
}

/* The text input fills the row, so the Send button can sit on the right */
.chat-input input[type='text'] {
  flex: 1;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-color);
}

.chat-input input[type='text']::placeholder {
  color: #9ca3af;
}
</style>
