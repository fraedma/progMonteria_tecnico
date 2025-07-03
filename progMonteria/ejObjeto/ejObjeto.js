document.getElementById("actualizar").style.display = "none"; // Oculta el botón de actualizar al inicio
var myArrayEst=[];
var objEst={
    cedula:null,
    nombre:null,
    apellidos:null,
    nota1:null,
    nota2:null,
    nota3:null
};
var posAct;
comprobarLocalStorge(); // Comprueba si hay datos en localStorage al cargar la página
function guardarDatos() {
    objEst.cedula = document.getElementById("cedula").value;
    objEst.nombre = document.getElementById("nombre").value;
    objEst.apellidos = document.getElementById("apellidos").value;
    objEst.nota1 = parseFloat(document.getElementById("nota1").value);
    objEst.nota2 = parseFloat(document.getElementById("nota2").value);
    objEst.nota3 = parseFloat(document.getElementById("nota3").value);
    let resultado=JSON.parse(JSON.stringify(objEst));
    myArrayEst.push(resultado); //se almacena el objeto resutado en myArratEst
    console.log(myArrayEst);
    guardarEnLocalStorage(); // Guarda los datos en localStorage
    limpiarCajas();
    mostrarDatos();
}
function limpiarCajas() {
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("cedula").focus();
}
function mostrarDatos(){
    var salida='';
    for(i in myArrayEst){
        salida += '<tr><td>'+myArrayEst[i].cedula+'</td>'+
        '<td>'+myArrayEst[i].nombre+'</td>'+
        '<td>'+myArrayEst[i].apellidos+'</td>'+
        '<td>'+myArrayEst[i].nota1+'</td>'+
        '<td>'+myArrayEst[i].nota2+'</td>'+
        '<td>'+myArrayEst[i].nota3+'</td>'+
        '<td>'+notaFinal(myArrayEst[i].nota1,myArrayEst[i].nota2,myArrayEst[i].nota3)+'</td>'+
        '<td>'+estado(notaFinal (myArrayEst[i].nota1,myArrayEst[i].nota2,myArrayEst[i].nota3))+'</td>'+
        '<td>'+cualitativa(notaFinal(myArrayEst[i].nota1,myArrayEst[i].nota2,myArrayEst[i].nota3))+'</td>'+
        '<td><button onclick="editarDatos('+i+')">Editar</button> <button onclick="eliminarDatos('+i+')">Eliminar</button></td>'+
        '</tr>';
    }
    document.getElementById("listadoEstudiantes").innerHTML = salida;
}
function notaFinal(n1,n2,n3){
    return ((n1+n2+n3)/3).toFixed(2); // Calcula la nota final y la redondea a 2 decimales
}

function estado(notaFinal) {
    return (notaFinal >= 3.0 ? "Aprobado" : "Reprobado");
}

function cualitativa(notaFinal) {
    return "pendiente";
}
function editarDatos(index) {
    posAct = index; // Guarda la posición del estudiante a editar
    document.getElementById("cedula").value = myArrayEst[index].cedula;
    document.getElementById("nombre").value = myArrayEst[index].nombre;
    document.getElementById("apellidos").value = myArrayEst[index].apellidos;
    document.getElementById("nota1").value = myArrayEst[index].nota1;
    document.getElementById("nota2").value = myArrayEst[index].nota2;
    document.getElementById("nota3").value = myArrayEst[index].nota3;

    // Muestra el botón de actualizar y oculta el de guardar
    document.getElementById("guardar").style.display = "none";
    document.getElementById("actualizar").style.display = "inline";
}
function actualizarDatos() {
    // Actualiza los datos del estudiante en la posición posAct
    myArrayEst[posAct].cedula = document.getElementById("cedula").value;
    myArrayEst[posAct].nombre = document.getElementById("nombre").value;
    myArrayEst[posAct].apellidos = document.getElementById("apellidos").value;
    myArrayEst[posAct].nota1 = parseFloat(document.getElementById("nota1").value);
    myArrayEst[posAct].nota2 = parseFloat(document.getElementById("nota2").value);
    myArrayEst[posAct].nota3 = parseFloat(document.getElementById("nota3").value);
    guardarEnLocalStorage(); // Guarda los datos actualizados en localStorage
    limpiarCajas();
    mostrarDatos();

    // Oculta el botón de actualizar y muestra el de guardar
    document.getElementById("actualizar").style.display = "none";
    document.getElementById("guardar").style.display = "inline";
}
function eliminarDatos(index) {
    // Elimina el estudiante en la posición index
    if(confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
        myArrayEst.splice(index, 1);
    }
    guardarEnLocalStorage(); // Guarda los cambios en localStorage
    mostrarDatos();
}
function comprobarLocalStorge() {
    if (localStorage.getItem("estudiantes")) {
        myArrayEst = JSON.parse(localStorage.getItem("estudiantes"));
        mostrarDatos();
    }
}
function guardarEnLocalStorage() {
    localStorage.setItem("estudiantes", JSON.stringify(myArrayEst));
}