if (document.addEventListener)
	window.addEventListener("load",inicio)
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio(){
	let boton=document.getElementById("boton");
	if (document.addEventListener)
		boton.addEventListener("click",proceso)
	else if (document.attachEvent)
		boton.attachEvent("onclick",proceso);
}

function proceso(){
    //obtengo el nodo de la select de comunidades autonomas
	let select = document.getElementById("paises");
	//obtengo una collection con los option seleccionados
    let paises = select.selectedOptions;
    //obtengo el value de los options seleccionados
    if (paises.length > 0) {
		let cadenaxml;
		let empiezo="<paises><pais>";
		let final="</pais></paises>";
		//defino la primera posicion
		let medio="<nombre>"+paises[0].value+"</nombre>";
		//en caso de que haya más de 1 se concatenarán
		for (let index = 1; index < paises.length; index++) {
			medio+="<nombre>"+paises[index].value+"</nombre>";
		}
		//una vez tengamos todos los paises seleccionados
		//concateno todo
		cadenaxml=empiezo+medio+final;

		let estado={
			method:"POST",
			headers:{"Content-Type":"application/x-www-form-urlencoded"},
			body:cadenaxml
		}
		fetch("php/practica-06-04.php", estado)
			.then(tratar)
			.catch(errores);
	}
	else{
		alert("seleccione uno o más paises");
	}
	
}

function  errores(){
	alert("error en la conexión con el servidor");
}

function tratar(respuesta){
	if (respuesta.ok)
		respuesta.text().then(procesar);
}

function procesar(resultado){
	let parsar=new DOMParser();
	let misdatos=parsar.parseFromString(resultado,"application/xml");				
			    //obtengo el nodo de la select provincias
				let select = document.getElementById("region");
				/*-------------------Borrar nodos option------------------------------*/
				    //comprueba que mientras existe al menos un nodo hijo
					while (select.firstChild) {
						//borrara todos los nodos hijos
						select.removeChild(select.firstChild)
					}
				/*--------------------------------------------------*/
				let anyadido = false;
				let options;
				let region;
				let pos = 0;
				//recorro todos los nodos region obtenidos de la respuesta xml
				for (let i = 0; i < misdatos.getElementsByTagName("region").length; i++) {
					//obtengo los nodos option de la select
					options = select.getElementsByTagName("option");
					//obtengo el nombre de la region del xml en la posicion i
					region = misdatos.getElementsByTagName("region").item(i).textContent;
					pos = 0;
					while (!anyadido && pos < options.length) {
						//orden descendente
						if (region > options.item(pos).textContent) {
							anyadido = true;
							//creo el nuevo nodo option de la select
							let newOption = document.createElement("option");
							//creo los nodos de texto
							let textOption=document.createTextNode(region);
							//asigno los nodos texto a los nodos option correspondientes
							newOption.appendChild(textOption);
							//asigno el nodo option al nodo select
							select.insertBefore(newOption,options.item(pos));
						
						}
						pos++;
					}
					if (!anyadido) {
						//creo el nuevo nodo option de la select
						let newOption = document.createElement("option");
						//creo los nodos de texto
						let textOption=document.createTextNode(region);
						//asigno los nodos texto a los nodos option correspondientes
						newOption.appendChild(textOption);
						//asigno el nodo option al nodo select
						select.appendChild(newOption);							
					}
					anyadido = false;
				}	
		
}
