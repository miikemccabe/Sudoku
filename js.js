var Sudoku = (function() {

	var matrix;
	
	var createMatrix = function() {
		matrix = new Array(9);
		for (var i=0; i<matrix.length; i++) {
			matrix[i] = new Array(9);
		}
		populateMatrix();
	};
	
	var populateMatrix = function() {
		var possibles = generatePossibleNumbersArray();
		for(var i=0; i< matrix.length; i++) {
			for(var j=0; j< matrix[i].length; j++) {
				var found = false;
				while(possibles[i][j].length > 0) {
					var rnd = Math.floor(Math.random() * possibles[i][j].length);
					var num = possibles[i][j].splice(rnd, 1)[0];
					if(isValid(i, j, num)) {
						matrix[i][j] = num;
						found = true;
						break;
					} else {
						found = false;
						continue;
					}
				}
				if(!found) {
					matrix[i][j] = undefined;
					possibles[i][j] = [1,2,3,4,5,6,7,8,9];
					j -= 2;
				}
			}
		}
	}	
	
	var generatePossibleNumbersArray = function() {
		var possibles = new Array(9);
		for(var i=0; i<possibles.length; i++) {
			possibles[i] = new Array(9);
			for(var j=0; j< possibles[i].length; j++) {
				possibles[i][j] = [1,2,3,4,5,6,7,8,9];
			}
		}
		return possibles;
	}
	
	var getPossibleValues = function () {
		var possibles = new Array(9);
		for (var i=0; i<9; i++) {
			possibles[i] = new Array(9);
			for (var j=0; j< possibles[i].length; j++) {
				if(matrix[i][j] === undefined) {
					var possible = [1,2,3,4,5,6,7,8,9];
					var valid = false;
					while(!valid && possible.length > 0) {
						possible.shift();
						valid = isValid(i, j, possible[0])
					}				
					possibles[i][j] = possible;	
				}
			}
		}
		console.log(possibles[1][8]);
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
				if(matrix[i][j] === val) {
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
			if(arr[i] === val && val !== undefined) {
				found = true;
				break;
				console.log("Matched "+arr[i] + " with "+val);
			}
		}
		return found;
	}
	
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
		updateBoard();
	}
	
	var updateBoard = function() {
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				var input = document.getElementById("cell"+i+j);
				input.value = matrix[i][j];
			}
		}
	}
	
	var randomNum = function() {
		return Math.floor(Math.random() * 9 + 1);
	}
	
	var shuffle = function(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
	}
	
	return {
		createMatrix : createMatrix,
		populateMatrix : populateMatrix,
		createBoard : createBoard,
		updateBoard : updateBoard,
		getPos : getPossibleValues,
		inGrid : inGrid
	};

})();