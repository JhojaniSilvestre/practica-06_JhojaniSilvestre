if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("buscar");
	if (document.addEventListener)
		boton.addEventListener("click",proceso)
	else if (document.attachEvent)
		boton.attachEvent("onclick",proceso);
}
//variable que contendra la peticion
let peticion;

function proceso(){
	//obtengo el nodo de la select de comunidades autonomas
	let autores = document.getElementById("autores");
	//obtengo el valor del option seleccionado
	let autor = autores.options[autores.selectedIndex].value;
    console.log(autor);
	// solicitud a un programa php con paso de parámetros en variable
	// mediante get
	let configuracion={method:"GET"};
	fetch("php/practica-06-01.php?autor="+autor,configuracion)
		.then(comienzo)
		.catch(errores);	
}

function comienzo(respuesta){
	if (respuesta.ok)
		respuesta.text().then(procesamiento);
}

function  errores(){
	alert("error en la conexión con el servidor");
	document.getElementById("principal").value="error en la conexión con el servidor"
}
function procesamiento(dato){
	document.getElementById("principal").value=dato;	
}

