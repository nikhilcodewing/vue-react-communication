<template>
  <div class="app">
    <header class="app-header">
      <h1>Vue + React Integration</h1>
      <p>Vue controls React component below</p>
    </header>

    <main class="app-main">
      <!-- Vue Controls -->
      <div class="vue-controls">
        <h2>Vue Controls</h2>
        <div class="control-group">
          <label for="vue-message">Message to React:</label>
          <input
            id="vue-message"
            v-model="vueMessage"
            type="text"
            placeholder="Type a message for React..."
            class="message-input"
          />
        </div>

        <div class="control-group">
          <label>
            <input v-model="showReact" type="checkbox" />
            Show/Hide React Component
          </label>
        </div>

        <div class="control-group">
          <button @click="resetCounter" class="reset-btn">
            Reset React Counter
          </button>
        </div>

        <!-- Display React responses -->
        <div class="react-responses" v-if="reactMessage || reactCount !== null">
          <h3>React Responses:</h3>
          <p v-if="reactMessage">
            <strong>Message:</strong> {{ reactMessage }}
          </p>
          <p v-if="reactCount !== null">
            <strong>Count:</strong> {{ reactCount }}
          </p>
        </div>
      </div>

      <!-- React Component -->
      <div class="react-section">
        <h2>React Component</h2>
        <ReactWrapper
          :message="vueMessage"
          :is-visible="showReact"
          @react-message="handleReactMessage"
          @react-count="handleReactCount"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import ReactWrapper from "./components/ReactWrapper.vue";

export default {
  name: "App",
  components: {
    ReactWrapper,
  },
  setup() {
    const vueMessage = ref("Hello from Vue!");
    const showReact = ref(true);
    const reactMessage = ref("");
    const reactCount = ref(null);

    const handleReactMessage = (message) => {
      reactMessage.value = message;
    };

    const handleReactCount = (count) => {
      reactCount.value = count;
    };

    const resetCounter = () => {
      // Send reset signal to React
      const event = new CustomEvent("vue-to-react", {
        detail: {
          type: "vue-to-react",
          message: vueMessage.value,
          reset: true,
        },
      });
      window.dispatchEvent(event);
    };

    return {
      vueMessage,
      showReact,
      reactMessage,
      reactCount,
      handleReactMessage,
      handleReactCount,
      resetCounter,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.app-header {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.app-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.app-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.vue-controls,
.react-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.vue-controls h2,
.react-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 3px solid #42b883;
  padding-bottom: 0.5rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.message-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.reset-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-btn:hover {
  background: #c0392b;
}

.react-responses {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #42b883;
  margin-top: 1rem;
}

.react-responses h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.react-responses p {
  margin-bottom: 0.5rem;
  color: #555;
}

@media (max-width: 768px) {
  .app-main {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .app-header h1 {
    font-size: 2rem;
  }
}
</style>
