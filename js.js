var Matrix = function() {
	
	var matrix;
	
	var init = function() {
		createMatrix();
		populateMatrix();
	}
	
	var createMatrix = function() {
		matrix = new Array(9);
		for (var i=0; i< matrix.length; i++) {
			matrix[i] = new Array(9);
			for (var j=0; j<matrix[i].length; j++) {
				matrix[i][j] = {
					value : undefined,
					visited : false,
					possibles : [1,2,3,4,5,6,7,8,9],
					immutable : false,
					reset : function() {
						this.value = undefined;
						this.visited = false;
						this.possibles = [1,2,3,4,5,6,7,8,9];
						this.immutable = false;
					}
				};
			}
		}
		return matrix;
	};
	
	var populateMatrix = function() {
		for(var i=0; i< matrix.length; i++) {
			for(var j=0; j< matrix[i].length; j++) {
				var found = false;
				while(matrix[i][j].possibles.length > 0) {
					var rnd = Math.floor(Math.random() * matrix[i][j].possibles.length);
					var num = matrix[i][j].possibles.splice(rnd, 1)[0];
					if(isValid(i, j, num)) {
						matrix[i][j].value = num;
						found = true;
						break;
					} else {
						found = false;
						continue;
					}
				}
				if(!found) {
					matrix[i][j].reset();
					j -= 2;
				}
			}
		}
		return matrix;
	}	
	
	var getCell = function(row, column) {
		return matrix[row][column].value;
	}
	
	var getRow = function(index) {
		var row = [];
		for (var i=0; i< 9; i++) {
			row.push(matrix[index][i]);
		}
		return row;
	}
	
	var getCol = function(index) {
		var col = [];
		for (var i=0; i<9; i++) {
			col.push(matrix[i][index]);
		}
		return col;
	}
	
	var isValid = function(row, col, val) {
		var valid = true;
		if(inRow(row, val) || inCol(col, val) || inGrid(row, col, val)) {
			valid = false;
		}
		return valid;
	}
	
	var inGrid = function(row, col, val) {
		var x, y;
		var found = false;
		
		x = Math.floor(row / 3) * 3;
		y = Math.floor(col / 3) * 3;
		
		for (var i=x; i < x+3; i++) {
			for (var j=y; j < y+3; j++) {
				if(matrix[i][j].value === val) {
					found = true;
				}
			}
		}
		return found;	
	}
	
	var inRow = function(row, val) {
		var theRow = getRow(row);
		return inArr(theRow, val);
	}
	
	var inCol = function(col, val) {
		var theCol = getCol(col);
		return inArr(theCol, val);
	}
	
	var inArr = function(arr, val) {
		var found = false;
		var length = arr.length;
		for (var i=0; i< length; i++) {
			if(arr[i].value === val && val !== undefined) {
				found = true;
				break;
			}
		}
		return found;
	}
	
	var randomNum = function() {
		return Math.floor(Math.random() * 9 + 1);
	}
	
	return {
		init : init,
		create : createMatrix,
		populate : populateMatrix,
		getCell : getCell
	}
	
}

var Grid = function() {
	
	var matrix;
	
	var init = function() {
		matrix = new Matrix();
		matrix.init();
		return matrix;
	}
	
	var getCell = function(row, col) {
		return matrix.getCell(row, col);
	}
	
	return {
		init : init,
		getCell : getCell
	}
	
}

var Sudoku = (function() {

	var grid;
	
	var init = function() {
		grid = new Grid();
		grid.init();
	};
		
	var createBoard = function() {
		var body = document.getElementsByTagName("body")[0];
		var input;
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				var br = document.createElement('br');
				input = document.createElement('input');
				input.name = 'cell'+i+j;
				input.id = 'cell'+i+j;
				input.style.width = "20px";
				input.style.height = "20px";
				input.style.margin = "1px";
				document.getElementsByTagName('body')[0].appendChild(input);
				if((j+1) % 9 === 0) {
					document.getElementsByTagName('body')[0].appendChild(br);
				}
			}
		}
	}
	
	var updateBoard = function() {
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				var input = document.getElementById("cell"+i+j);
				input.value = grid.getCell(i, j);
			}
		}
	}
	
	return {
		init : init,
		createBoard : createBoard,
		updateBoard : updateBoard
	};

})();