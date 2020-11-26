<template>
  <img :src="qr.toDataURL()" alt="QR Code" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import QRious from "qrious";

export default defineComponent({
  name: "QrCode",
  components: {},
  props: {
    url: {
      type: String,
      required: true,
    },
    size: Number,
  },
  setup(props) {
    const qr = computed(() => new QRious({ value: props.url, size: props.size }));
    return { qr };
  },
});
</script>

<style scoped lang="postcss"></style>
