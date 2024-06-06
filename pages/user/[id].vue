<template>

    <div class="container row inline">

        <div class="info-1 col-6">
info1
        </div>

        <div class="img col-6">
aimgen
        </div>

        <div class="info-2 col-12">info 2</div>

    </div>

</template>


<script setup>


</script>


<style scoped lang="scss">
.container{
    width: 700px;
    height: 500px;
    border: 3px solid salmon;
}
.info-1 {
    overflow: auto;
    min-height: 300px;
    max-height: 300px;
    border:1px solid red;
}

.info-2 {
    overflow: auto;
    min-height: 200px;
    max-height: 200px;
    border: 1px solid red;
}

.img {
    overflow: auto;
    min-height: 300px;
    max-height: 300px;
    border: 1px solid blue;
}
</style>