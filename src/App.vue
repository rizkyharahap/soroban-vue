<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ConnectFreighter from './components/ConnectFreighter.vue';
import Counter from "./components/Counter.vue";
import { greeter } from './shared/contracts';

const greathing = ref<string[]>([]);

onMounted(async ()=> {
  const {result} = await greeter.hello({to:'Soroban'});
  greathing.value = result;
})



</script>

<template>
  {{ greathing?.join(" ") }}
  <ConnectFreighter />
  <Counter/>
</template>

<style>
button {
    border: 1px solid rgb(var(--accent));
    background-color: #23262d;
    background-image: none;
    background-size: 400%;
    border-radius: 7px;
    color: white;
    cursor: pointer;
    font-size: inherit;
    padding: 0.5rem 1rem;
    background-position: 100%;
    transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
button:is(:hover, :focus-within) {
    color: black;
    background-position: 0;
    background-size: 400%;
    background-image: var(--accent-gradient);
}
button:is(:disabled) {
    color: white;
    background: var(--accent-light);
    cursor: not-allowed;
}
</style>