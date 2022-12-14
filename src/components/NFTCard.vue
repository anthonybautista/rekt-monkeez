<template>
  <q-card class="my-card q-ma-md nftCard bg-primary" :key="nft.tokenId">
    <q-img :src="nft.pic" class="nft"></q-img>

    <q-card-section class="q-pa-none">
      <div class="text-h6">NFT #{{nft.tokenId}}</div>
    </q-card-section>
    <p class="text-negative q-ma-none">{{this.error}}</p>
    <slot></slot>
  </q-card>
</template>

<script>

export default {
  name: "NFTCard",
  data: function() {
    return {
    }
  },

  props: {
    nft: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
  },

  methods: {
  },

  watch: {
  },

  mounted: async function () {
  },
}
</script>

<style>
.nft {
  height: 160px;
  min-width: 160px;
}

.nftCard {
  width: 160px;
}
</style>