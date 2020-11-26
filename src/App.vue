<template>
  <TodoList />
  <details class="credits" role="button">
    <summary class="credits__summary">Credits</summary>
    <div>
      Made with <a href="https://docs.yjs.dev/">Yjs</a> and
      <a href="https://v3.vuejs.org/">Vue 3</a>
    </div>
    <div>QR Codes made with <a href="https://www.npmjs.com/package/qrious">QRious</a></div>
    <div>
      QR Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by
      CC BY 3.0
    </div>
  </details>
  <div class="qr">
    <div class="qr__wrapper">
      <button class="qr__button" type="button" title="Show QR Code" @click="showQr = !showQr">
        <QrIcon class="qr__icon" />
      </button>
    </div>
    <transition name="fade">
      <div v-if="showQr" class="qr__wrapper">
        <QrCode :url="loc" :size="250" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import TodoList from "@/components/TodoList.vue";
import QrIcon from "@/components/QrIcon.vue";
import QrCode from "@/components/QrCode.vue";

export default defineComponent({
  name: "App",
  components: { TodoList, QrCode, QrIcon },
  props: {},
  setup() {
    const loc = ref(window.location.toString());
    window.addEventListener("hashchange", () => {
      loc.value = window.location.toString();
    });
    const showQr = ref(false);

    return { loc, showQr };
  },
});
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 5rem 0 2rem;
  box-sizing: border-box;
}

.credits__summary {
  color: #aaa;
}

.qr {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.qr__wrapper {
  text-align: right;
}

.qr__icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: black;
}

.qr__button {
  border: none;
  padding: 0;
  background: transparent;
  opacity: 0.25;
  transition: all 0.25s ease;
}

.qr__button:hover {
  opacity: 1;
}

.button {
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  border: 1px solid black;
  background: transparent;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 1;
  padding: 0.5rem;
}

.button-group .button {
  margin-left: 0;
  border-radius: 0;
  border-left: none;
}

.button-group .button:first-child {
  border-left: 1px solid black;
  border-top-left-radius: 0.125rem;
  border-bottom-left-radius: 0.125rem;
}

.button-group .button:last-child {
  border-top-right-radius: 0.125rem;
  border-bottom-right-radius: 0.125rem;
}

.button-group {
  display: inline-block;
  margin-left: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
