<script setup lang="ts">
import { getUserInfo, isAllowed, setAllowed } from "@stellar/freighter-api";
import { onMounted, ref } from 'vue';

const isLoading = ref(false);
const isLoggedIn = ref<boolean | null>(null);
const publicKey = ref<string | null>();


async function getPk() {
    const userInfo = await getUserInfo();
    return userInfo?.publicKey;
}

async function setLoggedIn() {
    const pk = await getPk();

    if(pk) {
        publicKey.value = pk;
        isLoggedIn.value = true;
    } else {
       isLoggedIn.value = false; 
    }
}

async function handleOnClickConnect() {
    try {
        isLoading.value = true;
        await setAllowed();
        await setLoggedIn();
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}


onMounted(async()=> {
    try {        
        const allowed = await isAllowed();

        if(allowed) 
            await setLoggedIn();
    } catch (error) {
        console.error(error);
    }
})
</script>

<template>
    <div class="wrap" arial-live="polite">
        <div class="ellipsis" v-if="isLoggedIn === null">
            <button aria-controls="freighter-wrap" @click="handleOnClickConnect" :disabled="isLoading" v-class="{ loading: isLoading}">Connect</button>
        </div>

        <div class="ellipsis" v-else-if="isLoggedIn">
            Signed in as {{ publicKey }}
        </div>

        <div class="ellipsis" v-else>
            Freighter is locked.<br>
            Sign in & refresh the page.
        </div>
    </div>
</template>

<style>
    .wrap {
        text-align: center;
    }

    .ellipsis {
        line-height: 2.7;
        margin: auto;
        max-width: 12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
    }
</style>