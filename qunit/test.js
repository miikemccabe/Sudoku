
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