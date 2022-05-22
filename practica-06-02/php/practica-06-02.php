<?php
	$caras=$_POST["caras"];
    $vertices=$_POST["vertices"];

    $resultado = intval($caras) + intval($vertices);
    echo $resultado;
?>