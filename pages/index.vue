<template>
    <div class="container">
        <img class="fondo-gatos" src="../assets/images/fondo-gatos.png"></img>
        <div class="container-intro">
            <h3 class="title">Bondpet</h3>
            <div class="container-image">
                <img  src="../assets/images/mascota.svg" alt="">
            </div>
            <span class="space">
            </span>
            <p class="texto-intro">"Bienvenidos a nuestra red social de mascotas, donde los dueños de mascotas pueden conectarse, compartir y
            aprender unos de otros. Nuestra pasión por los animales nos llevó a crear esta plataforma para que puedan
            compartir sus vidas y experiencias con sus mascotas. Aquí, podrás encontrar consejos prácticos sobre el
            cuidado de tus mascotas, historias inspiradoras de adopción y eventos emocionantes relacionados con
            animales. ¡Únete a nuestra comunidad y comienza a compartir tus propias historias y fotos de tus mascotas!"
        </p>
        </div>
    </div>


</template>

<script setup>


</script>


<style lang="scss" scoped>
.container {
    height: 93vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: hidden; /* Elimina scroll vertical */
    overflow-x: hidden; /* Elimina scroll horizontal */
    .fondo-gatos{
        position: absolute;
        z-index: -1;
        opacity: 0.4;
        height: 90vh;
        width: 90vw;
        object-fit: cover;
    }
}

.container-intro{
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    margin: auto;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
    border-radius: 8px;
    padding: 2em;
    .container-image{
        width: 50%;
        padding-bottom: 1em;
        img{
            height: 250px;
            z-index: -5;
        }
    }
    .texto-intro {
        width: 100%;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-align: justify;
        font-size: 1.5em;
        opacity: 0.7;

    }
}

.space{
    height: 200px;
}
.title {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    font-size: 4.5em;
    text-align: right;
    padding-right: 0.5em;
    z-index: 50;
    width: 50%;

}
</style>