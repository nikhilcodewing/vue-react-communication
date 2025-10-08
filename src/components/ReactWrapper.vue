<template>
  <div>
    <div id="react-app-container" ref="reactContainer"></div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { mountReactApp, unmountReactApp } from "../react-app/index.js";

export default {
  name: "ReactWrapper",
  props: {
    message: {
      type: String,
      default: "",
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["react-message", "react-count"],
  setup(props, { emit }) {
    const reactContainer = ref(null);
    let reactRoot = null;

    const handleReactMessage = (message) => {
      emit("react-message", message);
    };

    const handleReactCount = (count) => {
      emit("react-count", count);
    };

    const mountReact = () => {
      if (reactContainer.value && props.isVisible) {
        reactRoot = mountReactApp("react-app-container", {
          message: props.message,
          isVisible: props.isVisible,
          onMessageChange: handleReactMessage,
        });
      }
    };

    const unmountReact = () => {
      if (reactRoot) {
        unmountReactApp(reactRoot);
        reactRoot = null;
      }
    };

    // Listen for React events
    const handleReactToVue = (event) => {
      if (event.detail && event.detail.type === "react-to-vue") {
        emit("react-message", event.detail.message);
        emit("react-count", event.detail.count);
      }
    };

    onMounted(() => {
      // Mount React app
      mountReact();

      // Listen for React events
      window.addEventListener("react-to-vue", handleReactToVue);
    });

    onUnmounted(() => {
      // Unmount React app
      unmountReact();

      // Remove event listeners
      window.removeEventListener("react-to-vue", handleReactToVue);
    });

    // Watch for prop changes
    watch(
      () => props.message,
      (newMessage) => {
        if (reactRoot) {
          // Send message to React
          const event = new CustomEvent("vue-to-react", {
            detail: {
              type: "vue-to-react",
              message: newMessage,
            },
          });
          window.dispatchEvent(event);
        }
      }
    );

    watch(
      () => props.isVisible,
      (newVisibility) => {
        if (newVisibility) {
          mountReact();
        } else {
          unmountReact();
        }
      }
    );

    return {
      reactContainer,
    };
  },
};
</script>

<style scoped>
#react-app-container {
  min-height: 200px;
}
</style>
