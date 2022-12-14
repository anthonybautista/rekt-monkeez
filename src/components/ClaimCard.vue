<template>
  <p class="text-accent q-ma-none">{{this.errorMessage}}</p>
  <div>
    <p class="q-ma-none">Claimable $MNKZ</p>
    <p class="q-ma-none">{{claimable}}</p>
  </div>
  <q-card-section  class="q-pt-none">
    <q-btn class="bg-accent text-black q-mt-xs" @click="claim">Claim</q-btn>
  </q-card-section>
</template>

<script>
import {getVaultContract, getVaultContractNoSigner} from "@/utils/contract";
import Number from "@/utils/formatBalance";

export default {
  name: "ClaimCard",
  data: function() {
    return {
      errorMessage: "",
      info: [],
      claimable: 0,
    }
  },

  props: {
    nft: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async claim() {
      this.errorMessage = "Claiming..."
      let contract = getVaultContract();
      await contract.claimRewardsForTokens([this.nft.tokenId]).then(async ()=> {
        this.claimable = Number(await contract.getRewardsOfToken(this.nft.tokenId)).toFixedNoRound(2);
        this.errorMessage = "Claimed..."
      }).catch(function (error) {
        console.error(error);
      })
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000)
    },

  },

  watch: {
  },

  computed: {
  },

  mounted: async function () {
    let contract = getVaultContractNoSigner();
    this.claimable = Number(await contract.getRewardsOfToken(this.nft.tokenId)).toFixedNoRound(2);
  },
}
</script>

<style>
.nft {
  height: 160px;
}

.bombCard {
  width: 160px;
}
</style>