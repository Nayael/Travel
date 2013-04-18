function array1Dto2D(array, length) {
	var arr2 = [],
		row = [];
	for (var i = 0; i < array.length; i++) {
		row.push(array[i]);
		if ((i + 1) % length == 0) {
			arr2.push(row);
			row = [];
		}
	}
	return arr2;
}

function preview(array) {
	var previewDiv = document.getElementById('map'),
		preview = '';
	previewDiv.innerHTML = '';

	// Starting generating the preview
	preview += '{<br>map: [<br>';
	for (var i = 0, j; i < array.length; i++) {
		preview += '&nbsp;&nbsp;&nbsp;&nbsp;[';
		for (j = 0; j < array[i].length; j++) {
			preview += array[i][j];
			if (j < array[i].length - 1) {
				preview += ', ';
			}
		}
		preview += ']';
		if (i < array.length - 1) {
			preview += ',';
		}
		preview += '<br>';
	}
	preview += ']<br>}';
	previewDiv.innerHTML = preview;
};