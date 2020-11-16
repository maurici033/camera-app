<?php
$upload_dir = "imagenes/";
$nombre = $_POST['codart'];
$img = $_POST['hidden_data'];

$fname= $nombre;
$i=1;

if(file_exists("imagenes/" . $fname . ".jpg")){
	while(file_exists("imagenes/" . $fname . "-" . $i . ".jpg")){
	$i = $i + 1;
	}

	$fname=$fname . "-" . $i;
}




$img = str_replace('data:image/jpeg;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $upload_dir . $fname . ".jpg";
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';
?>