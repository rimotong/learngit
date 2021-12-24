<template>
<!-- index.vue -->
  <div class="loading-content" v-if="show">
    <div class="loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
    <div class="loading-text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    show: Boolean,
    text: {
      type: String,
      default: "加载中。。。",
    },
  },
};
</script>

<style>
.loading-content {
  position: absolute;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.8);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.loading-spinner {
  text-align: center;
}
.loading-spinner .circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}
.loading-spinner .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
.loading-text {
  font-size: 14px;
  color: #409eff;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
