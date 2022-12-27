<template>
  <q-layout view="hHh lpR fFf" class="bg-secondary" id="layout">
    <q-header elevated class="bg-primary text-black">
      <q-toolbar class="q-pl-xs">
        <q-toolbar-title>
          <img src="@/assets/logo-large.png" class="logo q-pt-sm"/>
        </q-toolbar-title>
        <q-btn v-if="alias" rounded class="bg-secondary text-lowercase text-caption q-px-xs text-white">{{this.alias}}</q-btn>
        <q-btn v-else rounded @click="connect" class="bg-accent text-black">
          Connect
        </q-btn>
      </q-toolbar>
    </q-header>
    <div class="buffer"></div>
    <div>
      <tribe-balance :api="api" :wobo="wobo" :xeba="xeba" :pelu="pelu"></tribe-balance>
      <token-balance :balance="claimableMNKZ" class="q-mt-md" @claim-all="claimRewards(this.userRektTokens)"></token-balance>
      <n-f-t-container :nfts="userRektMonkeez" :key="refreshController" @reload="reloadContainer">
        <n-f-t-card v-for="item in userRektMonkeez" :key="item.tokenId" :nft="item">
          <claim-card :nft="item"></claim-card>
        </n-f-t-card>
      </n-f-t-container>
    </div>

    <div class="q-mx-auto text-center">
      <q-btn class="bg-accent text-black rounded-borders q-mx-auto" @click="gotoURL('https://campfire.exchange/collections/0x48240c6bcbf92936810a4f635a5bd83845df48fa')">
        <img id="campfire" src="@/assets/campfire-log-black.png"/>
        Buy on Campfire
      </q-btn>
    </div>

    <div class="buffer"></div>

    <q-page-sticky position="bottom-center">
      <q-btn fab :icon="fabTwitter" color="accent" @click="gotoURL('https://twitter.com/RektMonkeez')"/>
    </q-page-sticky>
    <div class="buffer-lg"></div>
    <web3-modal-vue
        ref="web3modal"
        :theme="theme"
        :provider-options="providerOptions"
        cache-provider
    />
  </q-layout>
</template>

<script>
import { fabTwitter } from '@quasar/extras/fontawesome-v6'
import Web3ModalVue from "web3modal-vue";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {web3Modal} from "./config/mixins";
import {getFireContract, getVaultContract, getVaultContractNoSigner} from "@/utils/contract";
import NFTContainer from "@/components/NFTContainer";
import axios from "axios";
import NFTCard from "@/components/NFTCard";
import NFT from "@/models/nft";
import {Wobo, Xeba, Pelu} from "@/tribes/tribes";
import TokenBalance from "@/components/TokenBalance";
import TribeBalance from "@/components/TribeBalance";
import ClaimCard from "@/components/ClaimCard";
import Number from "@/utils/formatBalance";


export default {
  name: 'LayoutDefault',

  setup () {
    return {
      fabTwitter,
    }
  },

  components: {
    ClaimCard,
    TribeBalance,
    TokenBalance,
    NFTCard,
    NFTContainer,
    Web3ModalVue,
  },

  mixins: [web3Modal],

  data(){
    return {
      theme: 'light',
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              43114: "https://api.avax.network/ext/bc/C/rpc",
            }
          }
        }
      },
      alias: null,
      rektMonkeez: "0x48240c6BCbf92936810a4F635A5bd83845DF48Fa",
      userRektMonkeez: [],
      userRektTokens: [],
      vaultedMonkeez: [],
      api: 0,
      wobo: 0,
      xeba: 0,
      pelu: 0,
      claimableMNKZ: 0,
      refreshController: false,
    }
  },

  methods: {
    gotoURL: function(url) {
      window.open(url);
    },
    connect: function() {
      this.$store.dispatch('connect');
    },
    getAlias: async function(account) {
      const contract = getFireContract();
      let fire = await contract.usernameFor(account);

      if (fire !== "") {
        return fire;
      } else {
        return "..."+ account.substring(34);
      }
    },
    reloadContainer: function() {
      this.refreshController = !this.refreshController;
    },
    getNFTs: function(nftAddress) {
      const unique = [69,187,222,333,404,487];
      const options = {
          method: 'GET',
          url: 'https://deep-index.moralis.io/api/v2/'+this.account+'/nft',
          params: {
              chain: '0xa86a',
              format: 'decimal',
              token_addresses: nftAddress,
          },
          headers: {accept: 'application/json', 'X-API-Key': 'TFLNINGrrGggKQwtPcGC9jgoUHArTaNZtBQK4gPeWliEGyDrqKJSXZSAnBFq12Nv'}
      };
      let nfts = [];
      let rektTokens = [];
      axios.request(options).then(function (response) {
        if(response.data.total > 0) {
          response.data.result.forEach(async item => {
            let token = Number(item.token_id);
            rektTokens.push(token);
            let extension = "png";
            if (unique.includes(token)) {
              extension = "PNG";
            }
            let uri = `https://mnkz-img.rektmonkeez.com/${token}.${extension}`;
            nfts.push(new NFT(token, uri));
          });
        }
      }).then(async ()=> {
        let contract = getVaultContractNoSigner();
        this.claimableMNKZ = (Number(await contract.getRewardsOfManyTokens(rektTokens))/10**18).toFixedNoRound(2);
      }).catch(function (error) {
        console.error(error);
      });
      this.userRektMonkeez = nfts;
      this.userRektTokens = rektTokens;
      setTimeout(this.reloadContainer,1500);
    },
    getMonkeez: function() {
      const wobo = Array.from(Wobo);
      const xeba = Array.from(Xeba);
      const pelu = Array.from(Pelu);
      let peluCount = 0;
      let woboCount = 0;
      let xebaCount = 0;
      let apiCount = 0;
      const options = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/0xBe726D7387D13a56A69c5b254Bec5B91fe56B5a9/nft',
        params: {
          chain: '0xa86a',
          format: 'decimal',
          token_addresses: '0xb42d0f524564cafE2a47CA3331221903Eda83b3C',
        },
        headers: {accept: 'application/json', 'X-API-Key': 'TFLNINGrrGggKQwtPcGC9jgoUHArTaNZtBQK4gPeWliEGyDrqKJSXZSAnBFq12Nv'}
      };
      axios.request(options).then(function (response) {
        if(response.data.total > 0) {
          response.data.result.forEach(async item => {
            let token = item.token_id;
            if (pelu.includes(Number(token))) {
              peluCount += 1;
            } else if (xeba.includes(Number(token))) {
              xebaCount += 1;
            } else if (wobo.includes(Number(token))) {
              woboCount += 1;
            } else {
              apiCount += 1;
            }
          });
        }
      }).then(()=>{
        this.api = apiCount;
        this.wobo = woboCount;
        this.xeba = xebaCount;
        this.pelu = peluCount;
      }).catch(function (error) {
        console.error(error);
      });
    },
    claimRewards: async function (tokenIds) {
      let contract = getVaultContract();
      await contract.claimRewardsForTokens(tokenIds).then(async ()=> {
        this.claimableMNKZ = Number(await contract.getRewardsOfManyTokens(this.userRektTokens)).toFixedNoRound(2);
        setTimeout(this.reloadContainer,1500);
      }).catch(function (error) {
        console.error(error);
      })
    }
  },


  // computed: values that are updated and cached if dependencies change
  computed: {
    account: function() {
        const {active, account} = this.web3Modal
        if (active) {
          return account;
        }
        return null;
    }
  },

  //mounted:  called after the instance has been mounted,
  mounted: async function () {
    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal;
      this.$store.commit('setWeb3Modal', web3modal)
      if (web3modal.cachedProvider) {
        await this.$store.dispatch('connect')
      }
    });
    const {active, account} = this.web3Modal
    if (active) {
      this.alias = await this.getAlias(account);
    }
    await this.getMonkeez();
  },

  // watch:   calls the function if the value changes
  // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
  watch: {
    account: {
      handler: async function(newAccount) {
        if (newAccount) {
          this.alias = await this.getAlias(newAccount);
          this.getNFTs(this.rektMonkeez);
        }
      },
    },
  },

}
</script>

<style>

@font-face {
  font-family: fuzzy;
  src: url(/public/FuzzyBubbles-Regular.ttf);
}

#layout {
  font-family: fuzzy;
}

.logo {
  height: 40px;
}

.buffer {
  height: 50px;
}

.buffer-lg {
  height: 100px;
}

#campfire {
  height: 40px;
  width: 40px;
}

</style>