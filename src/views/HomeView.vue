<script setup>
</script>

<template>
    <div class="flex justify-center items-center">
        <main class="pb-80 text-center flex flex-col justify-center">
            <h1 class="font-bold text-6xl">Type<span class="text-secondary-100">Master</span></h1>
            <h2 class="mt-4 font-italic text-xl text-gray-100">Improve your typing skills</h2>
            <button class="btn-primary mt-8 py-8" @click="$router.push({name: 'play'})">Play</button>
        </main>
    </div>
</template>

<style scoped>
</style>
