<template>
  <q-card rounded id="wrapper" class="bg-primary shadow-5 q-mx-auto">
    <p id="title" class="q-pa-none q-mt-sm q-mb-none q-mx-auto">Total Claimable</p>
    <div id="tokenInfo" class="bg-none q-mx-auto q-mt-sm q-px-sm q-pb-none text-black">
      <img id="mnkzToken" src="@/assets/mnkz.png"/>
      <p id="tokenBalance" class="q-pt-sm q-pl-xs q-ma-none">{{balance}}</p>
    </div>
    <div id="tokenClaim" class="bg-none text-black q-mx-auto q-mt-sm q-px-sm q-pb-none">
      <div class="text-center">
        <q-btn rounded class="bg-accent text-black" @click="claim">Claim</q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "TokenBalance",
  data: function() {
    return {
    }
  },

  props: {
    balance: {
      type: Number,
      required: true,
    },
  },

  methods: {
    claim: function() {
      this.$emit('claim-all');
    }
  },

  watch: {
  },

  computed: {
  },

  mounted: async function () {
  },
}
</script>

<style scoped>
#wrapper {
  width: 225px;
  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-rows: 35% 65%;
}

#tokenInfo {
  grid-column: 1/2;
  width: 100%;
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: 100%;
}

#title {
  grid-row: 1/2;
  grid-column: 1/3;
}

#tokenClaim {
  grid-column: 2/3;
  grid-row: 2/3;
}

#mnkzToken {
  width: 40px;
  height: 40px;
  grid-column: 1/2;
}

#tokenBalance {
  grid-column: 2/3;
}

</style>