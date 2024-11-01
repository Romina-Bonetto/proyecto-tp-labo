<template>
    <div class="button-container">
        <button @click="$router.push('/')">Volver al Home</button>
    </div>
    <div>
    <h2>Registro de Alumnos</h2>
    <form @submit.prevent="addAlumno">
      <input v-model="newAlumno.param1" placeholder="Nombre" required>
      <input v-model="newAlumno.param2" placeholder="Apellido" required>
      <input v-model="newAlumno.param3" placeholder="Edad" required>
      <input v-model="newAlumno.param4" placeholder="Provincia" required>
      <input v-model="newAlumno.param5" placeholder="Carrera" required>

  <div class="button-container">
    <button type="submit">Agregar Alumno</button>
  </div>
    </form>

    <div v-if="alumnos.length === 0">
      <h3>No hay alumnos registrados</h3>
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Provincia</th>
          <th>Carrera</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.idcod">
          <td>{{ alumno.param1 }}</td>
          <td>{{ alumno.param2 }}</td>
          <td>{{ alumno.param3 }}</td>
          <td>{{ alumno.param4 }}</td>
          <td>{{ alumno.param5 }}</td>
          <td>
            <button @click="confirmDelete(alumno.idcod)">Eliminar</button>
            <button @click="editAlumno(alumno)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="editingAlumno" class="modal">
      <div class="modal-content">
        <span class="close" @click="cancelEdit">&times;</span>
        <h3>Editar Alumno</h3>
        <form @submit.prevent="updateAlumno">
          <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nombre</td>
            <td><input v-model="editingAlumno.param1" placeholder="Nombre del Alumno" required></td>
          </tr>
          <tr>
            <td>Apellido</td>
            <td><input v-model="editingAlumno.param2" placeholder="Apellido" required></td>
          </tr>
          <tr>
            <td>Edad</td>
            <td><input v-model="editingAlumno.param3" placeholder="Edad" required></td>
          </tr>
          <tr>
            <td>Provincia</td>
            <td><input v-model="editingAlumno.param4" placeholder="Provincia" required></td>
          </tr>
          <tr>
            <td>Carrera</td>
            <td><input v-model="editingAlumno.param5" placeholder="Carrera" required></td>
          </tr>
        </tbody>
      </table>
      <div class="button-container">
        <button type="submit">Actualizar Alumno</button>
      </div>
        </form>
      </div>
    </div>
  </div>
  </template>
  
  <script>

  export default {
  data() {
    return {
      alumnos: [],
      newAlumno: { 
        param1: '', 
        param2: '',
        param3: '',
        param4: '', 
        param5: ''
      },
      editingAlumno: null,
    };
  },
    methods: {
      fetchAlumnos() {
        fetch('https://api.yumserver.com/16455/generic/alumnos')
          .then(response => response.json())
          .then(data => { this.alumnos = data; })
          .catch(error => console.error('Error:', error));
      },
      addAlumno() {
        fetch('https://api.yumserver.com/16455/generic/alumnos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newAlumno)
        })
        .then(alert("Alumno agregado con éxito"))
        .then(response => response.text())
        .then(data => {
          console.log(data);
          this.fetchAlumnos(); 
        })
        .catch(error => console.error('Error:', error));
      },
      confirmDelete(idcod) {
        if (confirm("¿Está seguro que quiere borrar este alumno?")) {
          this.deleteAlumno(idcod);
        }
      },
      deleteAlumno(idcod) {
        fetch('https://api.yumserver.com/16455/generic/alumnos', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idcod })
        })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          this.fetchAlumnos();
        })
        .catch(error => console.error('Error:', error));
      },
      editAlumno(alumno) {
      this.editingAlumno = { ...alumno }; 
    },
    updateAlumno() {
      fetch(`https://api.yumserver.com/16455/generic/alumnos`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editingAlumno)
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        this.fetchAlumnos(); 
        this.editingAlumno = null; 
      })
      .catch(error => console.error('Error:', error));
    },
    cancelEdit() {
      this.editingAlumno = null; 
    }
  },
  mounted() {
    this.fetchAlumnos();
  }, 
}
  </script>

<style>
@media (max-width: 600px) {
input {
  width: 100%; 
  margin-right: 0; 
}
}
body {
font-family: Arial, sans-serif;
background-color: #f9f3e7;
margin: 0;
padding: 20px;
}

h2 {
color: #4662a4;
}

h3 {
color: #699eda;
}


form {
display: grid;
align-self: center;
background-color: #a4c5e6;
padding: 15px;
border-radius: 5px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
margin-bottom: 20px;
width: fit-content;
}

input {
display: flex;
flex-wrap: wrap;
border: 1px solid #cbcae8;
border-radius: 4px;
padding: 10px;
margin-bottom: 10px;
margin-right: 10px;
width: 300px;
}

button {
background-color: #333c68;
color: white;
border: none;
border-radius: 4px;
padding: 10px 15px;
margin: 0px 10px;
cursor: pointer;
transition: background-color 0.3s;
}

button:hover {
background-color: #4e7283;
}

table {
width: auto min 800px;
border-collapse: collapse;
margin-top: 20px;
background-color: #fff;
border-radius: 5px;
overflow: hidden;
}

th, td {
border: 1px solid #8ab0d7;
padding: 12px;
text-align: left;
}

th {
background-color: #c6d3e7;
color: #4662a4;
}

tr:nth-child(even) {
background-color: #dde1e4; 
}

tr:hover {
background-color: #c9d6e3; 
}

.modal {
display: flex;
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgba(0,0,0,0.4); 
}

.modal-content {
display: grid;
background-color: #fefefe;
margin: auto;
padding: 10px;
border: 1px solid #888;
width: fit-content; 
height: fit-content;
}

.close {
color: #aaa;
float: right;
font-size: 28px;
font-weight: bold;
}

.close:hover,
.close:focus {
color: black;
text-decoration: none;
cursor: pointer;
}

.button-container {
padding: 10px;
}
</style>