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
      }
    },
    methods: {
      sendMessage() {
        if (!this.userMessage.trim()) return
        // Add user's message to the chat
        this.messages.push({ sender: 'user', text: this.userMessage })
        const userMessageCopy = this.userMessage
        this.userMessage = ''
  
        // Simulate AI response (replace with backend call)
        setTimeout(() => {
          this.messages.push({
            sender: 'ai',
            text: `Got it. I will update the font size for "${userMessageCopy}".`,
          })
        }, 1000)
      },
    },
  }
  </script>
  
  <style scoped>
  .chat-window {
    /* Replace #ddd with var(--border-color) and add a dark background */
    border: 1px solid var(--border-color);
    background-color: #2d3748;
    color: var(--text-color);
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    max-height: 200px;
    /* Replace #eee with var(--border-color), use a slightly darker background for messages */
    border: 1px solid var(--border-color);
    background-color: #1f2937;
    padding: 0.5rem;
    border-radius: 4px;
  }
  
  .message {
    margin-bottom: 0.5rem;
  }
  
  /* Use the accent color for AI messages */
  .message.ai {
    color: var(--accent-color);
  }
  
  /* Keep user messages a neutral light text; align right for distinction */
  .message.user {
    color: var(--text-color);
    text-align: right;
  }
  
  .chat-input {
    display: flex;
    gap: 0.5rem;
  }
  
  /* The input field should blend with the dark theme */
  .chat-input input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    background-color: #2d3748;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
  }
  
  /* Optional placeholder color if needed */
  .chat-input input[type="text"]::placeholder {
    color: #9ca3af; /* a lighter gray for placeholder text */
  }
  </style>