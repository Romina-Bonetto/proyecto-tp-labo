<template>
  <div class="button-container">
        <button @click="$router.push('/')">Volver al Home</button>
    </div>
  <div>
  <h2>Registro de Docentes</h2>
  <form @submit.prevent="addDocente">
    <input v-model="newDocente.param1" placeholder="Nombre" required>
    <input v-model="newDocente.param2" placeholder="Apellido" required>
    <input v-model="newDocente.param3" placeholder="Edad" required>
    <input v-model="newDocente.param4" placeholder="Provincia" required>
    <input v-model="newDocente.param5" placeholder="Materia" required>

<div class="button-container">
  <button type="submit">Agregar Docente</button>
</div>
  </form>

  <div v-if="docentes.length === 0">
    <h3>No hay docentes registrados</h3>
  </div>

  <table v-else>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Edad</th>
        <th>Provincia</th>
        <th>Materia</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="docente in docentes" :key="docente.idcod">
        <td>{{ docente.param1 }}</td>
        <td>{{ docente.param2 }}</td>
        <td>{{ docente.param3 }}</td>
        <td>{{ docente.param4 }}</td>
        <td>{{ docente.param5 }}</td>
        <td>
          <button @click="confirmDelete(docente.idcod)">Eliminar</button>
          <button @click="editDocente(docente)">Editar</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-if="editingDocente" class="modal">
    <div class="modal-content">
      <span class="close" @click="cancelEdit">&times;</span>
      <h3>Editar Docente</h3>
      <form @submit.prevent="updateDocente">
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
          <td><input v-model="editingDocente.param1" placeholder="Nombre del Docente" required></td>
        </tr>
        <tr>
          <td>Apellido</td>
          <td><input v-model="editingDocente.param2" placeholder="Apellido" required></td>
        </tr>
        <tr>
          <td>Edad</td>
          <td><input v-model="editingDocente.param3" placeholder="Edad" required></td>
        </tr>
        <tr>
          <td>Provincia</td>
          <td><input v-model="editingDocente.param4" placeholder="Provincia" required></td>
        </tr>
        <tr>
          <td>Materia</td>
          <td><input v-model="editingDocente.param5" placeholder="Materia" required></td>
        </tr>
      </tbody>
    </table>
    <div class="button-container">
      <button type="submit">Actualizar Docente</button>
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
    docentes: [],
    newDocente: { 
      param1: '', 
      param2: '',
      param3: '',
      param4: '', 
      param5: ''
    },
    editingDocente: null,
  };
},
  methods: {
    fetchDocentes() {
      fetch('https://api.yumserver.com/16455/generic/docentes')
        .then(response => response.json())
        .then(data => { this.docentes = data; })
        .catch(error => console.error('Error:', error));
    },
    addDocente() {
      fetch('https://api.yumserver.com/16455/generic/docentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newDocente)
      })
      .then(alert("Docente agregado con éxito"))
      .then(response => response.text())
      .then(data => {
        console.log(data);
        this.fetchDocentes(); 
      })
      .catch(error => console.error('Error:', error));
    },
    confirmDelete(idcod) {
      if (confirm("¿Está seguro que quiere borrar este docente?")) {
        this.deleteDocente(idcod);
      }
    },
    deleteDocente(idcod) {
      fetch('https://api.yumserver.com/16455/generic/docentes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idcod })
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        this.fetchDocentes(); 
      })
      .catch(error => console.error('Error:', error));
    },
    editDocente(alumno) {
    this.editingDocente = { ...alumno }; 
  },
  updateDocente() {
    fetch(`https://api.yumserver.com/16455/generic/docentes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.editingDocente)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      this.fetchDocentes(); 
      this.editingDocente = null; 
    })
    .catch(error => console.error('Error:', error));
  },
  cancelEdit() {
    this.editingDocente = null; 
  }
},
mounted() {
  this.fetchDocentes();
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
border: 1px solid #aed2f6;
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