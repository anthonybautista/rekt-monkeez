<template>
  <div id="wrapper" class="bg-primary text-center text-black shadow-5 q-mx-auto q-mt-md rounded-borders">
    <p id="title" class="q-pa-none q-mt-sm q-mb-none">Vaulted Monkeez</p>
    <div id="api" class="q-mx-auto q-pa-none">
      <p class="q-pt-sm q-pl-xs q-ma-none">{{api}}</p>
      <p class="q-mb-none">Api</p>
    </div>
    <div id="wobo" class="q-mx-auto q-pa-none">
      <p class="q-pt-sm q-pl-xs q-ma-none">{{wobo}}</p>
      <p class="q-mb-none">Wobo</p>
    </div>
    <div id="xeba" class="q-mx-auto q-pa-none">
      <p class="q-pt-sm q-pl-xs q-ma-none">{{xeba}}</p>
      <p class="q-mb-none">Xeba</p>
    </div>
    <div id="pelu" class="q-mx-auto q-pa-none">
      <p class="q-pt-sm q-pl-xs q-ma-none">{{pelu}}</p>
      <p class="q-mb-none">Pelu</p>
    </div>
    <p id="totalPerDay" class="text-left q-pt-sm q-pl-md">$MNKZ Earned By Vault Per Day: {{earned}}</p>
  </div>
</template>

<script>
export default {
  name: "TribeBalance",
  data: function() {
    return {
    }
  },

  props: {
    api: {
      type: Number,
      required: true,
    },
    wobo: {
      type: Number,
      required: true,
    },
    xeba: {
      type: Number,
      required: true,
    },
    pelu: {
      type: Number,
      required: true,
    },
  },

  methods: {
  },

  watch: {
  },

  computed: {
    earned() {
      return ((this.api * 5) + (this.wobo * 10) + (this.xeba * 20) + (this.pelu * 40));
    }
  },

  mounted: async function () {
  },
}
</script>

<style scoped>
#wrapper {
  width: 300px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 25% 50% 25%;
}

#title {
  grid-row: 1/2;
  grid-column: 1/5;
}

#api {
  grid-column: 1/2;
  grid-row: 2/3;
  background-color: #77548a;
  width: 100%
}

#wobo {
  grid-column: 2/3;
  grid-row: 2/3;
  background-color: #43805d;
  width: 100%
}

#xeba {
  grid-column: 3/4;
  grid-row: 2/3;
  background-color: #86536a;
  width: 100%
}

#pelu {
  grid-column: 4/5;
  grid-row: 2/3;
  background-color: #8c6231;
  width: 100%
}

#totalPerDay {
  grid-column: 1/5;
  grid-row: 3/4;
}
</style>