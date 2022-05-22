if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("solucionar");
	if (document.addEventListener)
        boton.addEventListener("click",proceso)
	else if (document.attachEvent)
        boton.attachEvent("onclick",proceso);
}

function proceso(){
	let a=document.getElementById("a").value;
	let b=document.getElementById("b").value;
    let c=document.getElementById("c").value;
    //comprobamos que no estén vacios y sean valores numericos
    let valido1= solonumeros(a);
    let valido2= solonumeros(b);
    let valido3= solonumeros(c);
    //si alguno es false, muestro mensaje
    if (!valido1 || !valido2 || !valido3) {
        alert("introduzca los datos correctos");
    }
    else{
        //creo el objeto ecuacion de la cuarta forma
        var datos = new ecuacion(a,b,c);
        //convierto los datos a json
        let datosJSON=JSON.stringify(datos);

        let configura={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:datosJSON
        }
        fetch("php/practica-06-05.php", configura)
            .then(tratar)
            .catch(errores);
        
        /*for(var dato in valores){console.log(dato+" "+eval("datos."+dato)+"<br />");}*/
    }
	
}

function tratar(respuesta){
	if (respuesta.ok)
		respuesta.text().then(procesar);
}

function  errores(){
	alert("error en la conexión con el servidor");
}

function procesar(dato){
	let misdatos=JSON.parse(dato);
    document.getElementById("sol1").value=misdatos.solucion1;
    document.getElementById("sol2").value=misdatos.solucion2;		
}

class ecuacion{
    constructor(a,b,c){
        this.a=a;
        this.b=b;
        this.c=c;
    }
}

function solonumeros(dato){
    let valido=true;
    if (dato == "") {
        valido = false;
    }
    else{
        let pos=0;
        while (valido && pos < dato.length) {
            if (dato.charAt(pos) < "0" || dato.charAt(pos) > "9") {
                valido=false;
            }
            pos++;
        }
    }
    return valido;
}



