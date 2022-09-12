<?php

if (isset($_POST['rooster'])) {
	file_put_contents('rooster.ics', $_POST['rooster']);
	echo "OK";
} else {
	echo "ERROR";
}