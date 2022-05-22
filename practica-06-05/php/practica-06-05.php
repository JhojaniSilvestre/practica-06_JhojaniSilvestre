<?php
	$entrada=fopen('php://input','r');
	$datos=fgets($entrada);
	$valores=json_decode($datos,true);

    $a = $valores['a'];
	$b = $valores['b'];
    $c = $valores['c'];
    
    $neg = -1; 
    
    $menosb = $b * $neg; 
    $oper1 = pow($b,2); //pow() el valor de base elevado a la potencia
    $oper2 = 4*$a*$c; 
    $resta = $oper1-$oper2; 
    $raiz = pow($resta,(1/2)); 
    $dosa = 2*$a; 
    
    $result1 = ($menosb + $raiz)/$dosa; 
    $result2 = ($menosb - $raiz)/$dosa; 
    
/*------------------------------------------------*/
	$nuevo= new stdClass();
	$nuevo->solucion1=$result1;
	$nuevo->solucion2=$result2;
	
	$respuesta=json_encode($nuevo);
	
	echo $respuesta;
?>