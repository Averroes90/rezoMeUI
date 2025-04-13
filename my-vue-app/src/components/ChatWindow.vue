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
    border: 1px solid #ddd;
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
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 4px;
  }
  
  .message {
    margin-bottom: 0.5rem;
  }
  
  .message.ai {
    color: #0066cc;
  }
  
  .message.user {
    color: #333;
    text-align: right;
  }
  
  .chat-input {
    display: flex;
    gap: 0.5rem;
  }
  
  .chat-input input[type="text"] {
    flex: 1;
    padding: 0.5rem;
  }
  </style>