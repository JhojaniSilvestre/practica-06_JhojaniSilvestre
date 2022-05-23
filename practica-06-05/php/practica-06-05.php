<?php
	$entrada=fopen('php://input','r');
	$datos=fgets($entrada);
	$valores=json_decode($datos,true);

    $a = $valores['a'];
	$b = $valores['b'];
    $c = $valores['c'];
    //resuelvo la -b
    $menosb = -1 * $b;
    //resuelvo primero la potencia
    $oper1= pow($b,2);
    //luego las multiplicaciones
    $oper2 = 4*$a*$c;
    //el resulde la potencia - el resul de la multi
    $resta = $oper1-$oper2; 
    //compruebo que la resta no es menor que 0
    if ($resta < 0) {
        $result1 = "raiz negativa, no existe"; 
        $result2 = "raiz negativa, no existe";
    }
    else {
        //obtengo la raiz cuadrada de la resta
        $raiz = sqrt($resta);
        //resuelvo 2 * a
        $dosa = 2*$a;
        //obtengo los dos resultados diferentes
        $result1 = ($menosb + $raiz)/$dosa; 
        $result2 = ($menosb - $raiz)/$dosa;
    }    
    //una vez resuelto, asigno cada resultado a los atributos de la clase
	$nuevo= new stdClass();
	$nuevo->solucion1=$result1;
	$nuevo->solucion2=$result2;
	
	$respuesta=json_encode($nuevo);
	
	echo $respuesta;
?>