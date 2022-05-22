<?php
	$autor=$_REQUEST["autor"];

    $libros = [
    "hermanH" => "Demian",
    "ursulaK" => "Los que se alejan de Omelas",
    "jojoM" => "Yo antes de ti",
    "albertC" => "El extranjero",
    "harukiM" => "1Q84",
    "douglasA" => "Guía autoestopista galáctico",
    "namJ" => "Kim Ji Young, born in 1982",
    "wonP" => "Almendra",
    "milanK" => "La insoportable levedad del ser",
    "shinK" => "Por favor, cuida de mamá",
    "paulK" => "Cuando la respiración se convierte en aire",
    "michelJ" => "Justicia: ¿Hacemos lo que debemos?",
    "henryD" => "walden",
    "salingerJ" => "El guardián entre el centeno",
    "andrewS" => "El demonio de la depresión, un atlas de la enfermedad"
    ];

    echo $libros[$autor];
	
?>