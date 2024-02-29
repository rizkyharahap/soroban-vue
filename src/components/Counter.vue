<script setup lang="ts">
import { onMounted, ref } from "vue";
import { incrementor } from "../shared/contracts";

const isLoadingButton = ref(false);
const isLoadingCount = ref(false);
const count = ref(0);

async function handleClickIncrement() {
    try {
        isLoadingButton.value = true;
        const tx = await incrementor.increment();
        const { result } = await tx.signAndSend();

        count.value = result;
    } catch (error) {
        console.error(error);
    } finally {
        isLoadingButton.value = false;
    }
}

onMounted(async ()=> {
    try {
        isLoadingCount.value = true;
        const { result } = await incrementor.getValue() ;

        if(result) 
            count.value = result;
    } catch (error) {
        console.error(error);
    } finally {
        isLoadingCount.value = false;
    }
})

</script>


<template>
    <strong>incrementor</strong><br/>
    Current value: <strong id="current-value" aria-live="polite">{{ isLoadingCount ? '???' : count }}</strong><br/>
    <br/>
    <button aria-controls="current-value" @click="handleClickIncrement">
        Increment 
        <span class="visually-hidden" v-if="isLoadingButton">
            updating...
        </span>
    </button>
    
</template>

<style>
@keyframes loading-gradient {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: -200% 50%;
    }
}

button:is(:disabled).loading {
    background: linear-gradient(-45deg, #ffffff44, #ffffff22);
    background-size: 200%;
    animation: loading-gradient 4s linear infinite;
}

.visually-hidden {
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

</style>

