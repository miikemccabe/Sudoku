
module("Matrix", {
	setup: function() { 
		this.matrix = new Matrix();
	}
});

test("create()", function() {
	var theMatrix = this.matrix.create();
	ok(theMatrix, 'The matrix was initialised successfully');
	ok(theMatrix[0][0].possibles instanceof Array, 'Check possibles is an array');
	
});

test("populate()", function() {
	var theMatrix = this.matrix.create();
	ok(this.matrix.populate(), 'Populate the matrix');
	var firstCell = this.matrix.getCell(0,0);
	ok(firstCell >= 1 && firstCell <=9, 'Expected the 1st cell value to be between 1 and 9, it was ' + firstCell);
});



module("Grid", {
	setup: function() { 
		this.grid = new Grid();
	}
});

test("init", function() {
	var init = this.grid.init();
	ok(init);
});

test("getValues", function() {
	var testCell1 = document.getElementById('cell88');
	var testCell2 = document.getElementById('cell78');
	testCell1.value = 5;
	testCell2.value = 8;
	var values = this.grid.getValues();
	equal(values[8][8], 5);
	equal(values[7][8], 8);
});