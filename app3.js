const dniV=document.getElementById("dniv")
const btnDni=document.getElementById("btnDni")
const form=document.getElementById("Formulario")
const dateI=document.getElementById("fechaEntrega")
const libroPresta=document.getElementById("libro")
const registro = document.getElementById("ingreseDNI")
const dalumn= document.getElementById("datos")
const select=document.getElementById("libro")
let idAlum="";
form.hidden=true
registro.hidden=false

async function validarDni(){
     let validador= false
    resp = await axios.get("http://localhost:3000/Alumnos")
   
    resp.data.forEach(element =>{
            if(element.dni == dniV.value)
            {
                validador=true
                idAlum=(element.id);
                dalumn.innerHTML=
                "<table>" + "<thead>" + "<tr>" + "<th> Alumno: </th>" + "<th> DNI: </th>" + "<th> Direccion </th>" + "<th> Institucion </th>" + "<th> ID alumno: </th>" + "</tr>" + "</thead>" +
                "<tbody>" + "<tr>" +  "<td>" + element.nombre + "</td>" + "<td>" + element.dni + "</td>" + "<td>" + element.direccion  + "</td>" + "<td>" + element.institucion + "</td>" + "<td>" + element.id + "</td>" + "</tr>" +  "</tbody>"
            }
    });
    if (validador == true){
       registro.hidden=true;
        form.hidden=false;
    }
    else if (validador == false)
    {
        alert ("El Alumno no se encuentra Registrado en la Base de Datos");
        window.open("../CrudAlumnos.html")
    }
}

async function registrarPrestamo(){
    try{
        resp = await axios.post("http://localhost:3000/Permisos", {fechaPrestamo: dateI.value, fechaDevolución: "",idAlumnos: idAlum, idLibros:parseInt(libroPresta.value)})
        alert("Se Listo Correctamente el Prestamo")
    }
    catch{
        alert("Error al Listar los datos del Alumno")
    }
}
libDisp()
async function libDisp(){
    resp= await axios.get("http://localhost:3000/Permisos");
    resp2= await axios.get("http://localhost:3000/Libros");
    resp.data.forEach(element=>{
        if (element.fechaDevolución==""){
            auxLibro=element.idLibros
            resp2.data.forEach(element=>{
                if(auxLibro==element.id){
                    select.innerHTML+=
                    "<option value="+element.id+">"+element.titulo+" </option>"
                }
            })
        }
    })

}