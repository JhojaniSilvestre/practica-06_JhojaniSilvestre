if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("calculo");
	if (document.addEventListener)
		boton.addEventListener("click",proceso)
	else if (document.attachEvent)
		boton.attachEvent("onclick",proceso);
}
//variable que contendra la peticion
let peticion;

function proceso(){
	//obtengo el nodo de la select de comunidades autonomas
	let caras = document.getElementById("caras").value.trim();
	let vertices = document.getElementById("vertices").value.trim();
	console.log(caras+" "+vertices);
	let carasNumero = soloNumeros(caras);
	let verticeNumero = soloNumeros(vertices);
    //--------------------------------------------------------------------------------

	if (carasNumero && verticeNumero) {
		let estado={
			method:"POST",
			headers:{"Content-Type":"application/x-www-form-urlencoded"},
			body:"caras="+caras+"&vertices="+vertices
		}
		fetch("php/practica-06-02.php", estado)
			.then(despues)
			.catch(errores);		
	}
	else{
		alert("introduzca el numero de caras y vértices");
	}
	
}

function despues(valor){
	if (valor.ok)
		valor.text().then(procesar);
}

function  errores(){
	alert("error en la conexión con el servidor");
	document.getElementById("aristas").value="error en la conexión con el servidor"
}

function procesar(dato){	
	document.getElementById("aristas").value=dato;	
}

function soloNumeros(dato){
	let esnum= true;
    let pos = 0;
	if (dato == "") {
		esnum= false;
	}
	else{
		while (esnum && pos < dato.length) {
			if (dato.charAt(pos) < "0" || dato.charAt(pos) > "9") {
				esnum = false;
			}
			pos+=1;
		}
	}

    return esnum;
}
