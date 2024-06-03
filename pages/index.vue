<template>

    <h3 class="absolute-center">Pagina inicio Bondpet</h3>

    <q-btn @click="going">going test</q-btn>

</template>

<script setup>

function going() {
    let go = window.open('http://localhost:3000', '_blank', 'popup')
    go.onload = () => {
        if (go.opener) {
            go.opener.console.log(go)
        }
    }
    go.addEventListener('message', () => {
        go.opener.console.log(go.location.href)
    })

}

</script>