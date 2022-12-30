let libro= ""
let alumno= ""
const prestados= document.getElementById("prestados")
const devueltos= document.getElementById("devueltos")
const total=document.getElementById("prestadosTotal")
listar()
async function listar() {
    resp =await axios.get("http://localhost:3000/Permisos")
    resp2 = await axios.get("http://localhost:3000/Libros")
    resp3 = await axios.get("http://localhost:3000/Alumnos")
    resp4 =await axios.get("http://localhost:3000/Permisos")
    prestados.innerHTML= ""
    devueltos.innerHTML= ""
    total.innerHTML=""
    let dato
    let dato2
    let dato3
    let dato4
    //#################
    resp4.data.forEach(element => {
        
            alumno=element.idAlumnos
            libro=element.idLibros
            resp2.data.forEach(element=>{
                if(element.id==libro){
                    dato=element.titulo
                }
            })
            resp3.data.forEach(element=>{
                if(element.id==alumno){
                    dato2=element.nombre
                    dato3=element.direccion
                    dato4=element.institucion
                }
            })
            if(element.fechaDevolución == ""){
            total.innerHTML +=
           "<tr style= background-color:red;>" + "<td>" + dato + "</td>" + "<td>" + dato2 + "</td>" + "<td>" + element.fechaPrestamo + "</td>" + "<td>" + dato3 + "</td>" + "<td>" + dato4 + "</td>" + "<td>" + "NO DISPONIBLE" + "</td>" + "</tr>"
            } else {
                total.innerHTML +=
           "<tr style=" + "background-color:green;>" + "<td>" + dato + "</td>" + "<td>" + dato2 + "</td>" + "<td>" + element.fechaPrestamo + "</td>" + "<td>" + dato3 + "</td>" + "<td>" + dato4 + "</td>" + "<td>" + "DISPONIBLE" + "</td>" + "</tr>"
            }

    });

    
    //#################
    resp.data.forEach(element => {
        if (element.fechaDevolución==""){
            alumno=element.idAlumnos
            libro=element.idLibros
            resp2.data.forEach(element=>{
                if(element.id==libro){
                    dato=element.titulo
                }
            })
            resp3.data.forEach(element=>{
                if(element.id==alumno){
                    dato2=element.nombre
                    
                }
            })
            prestados.innerHTML +=
            
            "<tr style=" + "background-color:red;>" + "<td>" + '<button class="btn btn-danger" onclick="dev(' + element.id + ')"> Devolver</button>' + "</td>" + "<td>" + element.fechaPrestamo + "</td>" + "<td>" + element.idLibros + "</td>" + "<td>" + dato + "</td>" + "<td>" +dato2 + "</td>" + "</td>" + "<td>" + dato4 + "</td>" + "</tr>"



        } else if (element.fechaDevolución!=""){
            alumno=element.idAlumnos
            libro=element.idLibros
            resp.data.forEach(element=>{
                if(element.id == libro){
                    resp2.data.forEach(element=>{
                        if (element.id==libro)
                        nombre=element.titulo
                    })
                
                
                devueltos.innerHTML+=
                "<tr style=background-color:green;>" + "<td>" + element.fechaPrestamo + "</td>" + "<td>" + element.fechaDevolución + "</td>" + "<td>" + nombre  + "</td>" +  "</tr>"
            }

            })

            
        }

        
    });
}


async function dev(idPrestamo){
    let aux=idPrestamo
    resp =await axios.get("http://localhost:3000/Permisos")
    let date=prompt("Ingrese Fecha Devolucion","2022/12/30")
    if (date!==null){
        resp.data.forEach(element=>{
            if(element.id==aux){
                let fecha=element.fechaPrestamo
                let alumnoID=element.idAlumnos;
                let libroID=element.idLibros;
                let idPrestamo=element.id
                axios.put("http://localhost:3000/Permisos/"+aux, {fechaPrestamo: fecha, fechaDevolución: date, idAlumnos: alumnoID, idLibros: libroID,id:idPrestamo})
            }
        })

    }
    

}