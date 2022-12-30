const nombre= document.getElementById("nombre");
const dni=document.getElementById("dni");
const institucion=document.getElementById("inst")
const direccion=document.getElementById("addres")
const listaAlum=document.getElementById("listAlum")
const btnAct=document.getElementById("act")
const btnGrd=document.getElementById("grd")
btnAct.hidden = true;
let valido=true;


async function guardarAlumnos() {
            try {
              resp2 = await axios.get("http://localhost:3000/Alumnos")
              resp2.data.forEach((element) => {
                if(element.dni == dni.value){
                  valido = false;
                }
              })
              if(valido == true){
                resp = await axios.post("http://localhost:3000/Alumnos", {
                  nombre: nombre.value,
                  dni: dni.value,
                  institucion: institucion.value,
                  direccion: direccion.value,
                });
              }
              else if(valido == false){
                alert ("no se puede ingresar un alumno ya registrado")
                valido = true;
              }
            } catch {
              alert("No se guardaron los datos correctamente");
            }
          }

    
    
listarAlumn()
async function listarAlumn() {
    resp = await axios.get("http://localhost:3000/Alumnos")
    listaAlum.innerHTML= ""
    resp.data.forEach(element => {
        listaAlum.innerHTML +=
        '<button class="btn btn-secondary" onclick="borrarAlum(' + element.id + ')"> Eliminar</button> ' + ' <button class="btn btn-dark" onclick="editar(' + element.id + ')"> Editar</button>' +
        "<b> Nombre: </b>" + element.nombre + " <b>Dni: </b>" + element.dni + "<b> Direccion: </b>" + element.direccion + "  <b>Institucion: </b>"+ element.institucion + "<br>"
    });
}
async function borrarAlum(id) {
    let respaldo=id;
    resp = await axios.get("http://localhost:3000/Permisos")
    resp.data.forEach(element => {
        if ((element.idAlumnos == respaldo)&&(element.fechaDevolución=="") ) {
            valido=false
        }
    })
    
    if (valido == true) {
        await axios.delete("http://localhost:3000/Alumnos/" + id);
    }
    else if (valido == false) {
        alert("No se puede dar de baja un alumno con deuda")
        valido=true;
        
    }
}
async function editar(id) {
    btnAct.hidden=false
    btnGrd.hidden=true
    auxiliar=id
    resp = await axios.get("http://localhost:3000/Alumnos/" + id)
    nombre.value = resp.data.nombre
    dni.value = resp.data.dni
    direccion.value = resp.data.direccion
    institucion.value = resp.data.institucion
}
async function actualizar() {
    btnAct.hidden= true
    btnGrd.hidden= false
    resp = await axios.put("http://localhost:3000/Alumnos/" + auxiliar, {nombre: nombre.value, dni: dni.value, direccion: direccion.value, institucion: institucion.value})
}
