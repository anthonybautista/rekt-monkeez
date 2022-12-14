<template>
  <div class="flex justify-center q-px-md q-pb-sm q-pt-none text-center bg-none">
    <div v-if="nfts.length > 0" id="itemContainer" class="flex justify-center q-ma-l q-pa-md text-center" :key="nfts">
      <slot></slot>
    </div>
    <div v-else>
      <div class="q-mt-md"></div>
      <p class="text-white">If NFTs don't load after a few seconds, click button.</p>
      <q-btn rounded class="bg-accent text-black" @click="reload">Load NFTs</q-btn>
      <p class="text-white q-mt-md">Or you might not have any Rekt Monkeez! In that case, buy some on Campfire!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NFTContainer",
  data: function() {
    return {

    }
  },

  props: {
    nfts: {
      type: Array,
      required: true,
    },
  },

  computed: {
  },

  methods: {
    reload() {
      this.$emit('reload');
    },
  },

  watch: {
  },

  mounted: function () {
  },
}
</script>

<style scoped>
#itemContainer {
  width: 90%;
}
</style>