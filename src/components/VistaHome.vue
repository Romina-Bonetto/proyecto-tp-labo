<template>
    <h2>Bienvenido al sistema de registro</h2>
    <h3>¿Qué desea hacer?</h3>

    <div class="button-container">
        <button @click="$router.push('/alumnos')">Agregar Alumno</button>
    </div>

    <div class="button-container">
        <button @click="$router.push('/docentes')">Agregar Docente</button>
    </div>
</template>
