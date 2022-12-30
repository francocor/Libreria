const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const genero = document.getElementById("genero");
const lista = document.getElementById("list");
const btnAct = document.getElementById("act");
const btnGrd = document.getElementById("grd");
let validar = true
btnAct.hidden = true;

listar();

async function guardar() {
  try {
    resp2 = await axios.get("http://localhost:3000/Libros")
    resp2.data.forEach((element) => {
      if(element.titulo == titulo.value){
        validar = false;
      }
    })
    if(validar == true){
      resp = await axios.post("http://localhost:3000/Libros", {
        titulo: titulo.value,
        autor: autor.value,
        genero: genero.value,
      });
    }
    else if(validar == false){
      alert ("no se puede ingresar un libro ya registrado")
      validar = true;
    }
  } catch {
    alert("No se guardaron los datos correctamente");
  }
}

async function listar() {
  try {
    resp = await axios.get("http://localhost:3000/Libros");
    lista.innerHTML = "";
    resp.data.forEach((element) => {
      lista.innerHTML +=
        '<button class="btn btn-danger" onclick="borrar(' +
        element.id + ')"> Eliminar</button> ' + " " + '<button  class="btn btn-success" onclick="editar(' + element.id + ')"> Editar</button>'+ " <b> TITULO: </b>" + element.titulo + " <b> AUTOR: </b> " + element.autor + " <b> GENERO: </b> " + element.genero + "<br> <hr>";

    });
    
  } catch {
    alert("Inconvenientes al listar los datos");
  }
}

async function borrar(id) {
  try {
    let valido = true;
    let respaldo = id;
    resp = await axios.get("http://localhost:3000/Permisos");
    resp.data.forEach((element) => {
      if (element.idLibros == respaldo) {
        valido = false;
      }
    });
    if (valido == true) {
      await axios.delete("http://localhost:3000/Libros/" + id);
    } else if (valido == false) {
      alert("No se puede eliminar un libro ya prestado");
     
    }
  } catch {
    alert("Inconvenientes al ejecutar el metodo borrar");
  }
}

async function editar(id) {
  try {
    btnAct.hidden = false;
    btnGrd.hidden = true;
    auxiliar = id;
    resp = await axios.get("http://localhost:3000/Libros/" + id);
    titulo.value = resp.data.titulo;
    autor.value = resp.data.autor;
    genero.value = resp.data.genero;
  } catch {
    alert("Inconvenientes al ejecutar el metodo editar");
  }
}

async function actualizar() {
  try {
    btnAct.hidden = true;
    btnGrd.hidden = false;
    resp = await axios.put("http://localhost:3000/Libros/" + auxiliar, {
      titulo: titulo.value,
      autor: autor.value,
      genero: genero.value,
    });
  } catch {
    alert("Inconvenientes al ejecutar el metodo actualizar");
  }
}
