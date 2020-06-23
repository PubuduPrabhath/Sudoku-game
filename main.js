const gameBoard = document.getElementById('game-board')

let sudoku = [
	[0, 0, 0, 0, 0, 0, 2, 0, 0],
	[0, 8, 0, 0, 0, 7, 0, 9, 0],
	[6, 0, 2, 0, 0, 0, 5, 0, 0],
	[0, 7, 0, 0, 6, 0, 0, 0, 0],
	[0, 0, 0, 9, 0, 1, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 4, 0],
	[0, 0, 5, 0, 0, 0, 6, 0, 3],
	[0, 9, 0, 4, 0, 0, 0, 7, 0],
	[0, 0, 6, 0, 0, 0, 0, 0, 0]
								 ];

function print_first(sudoku, gameBoard){
	for (let i=1; i<10; i++){
		for (let j=1; j<10; j++){
			const sudokunum = document.createElement('div')
			sudokunum.style.gridRowStart = i
			sudokunum.style.gridColumnStart = j
			sudokunum.classList.add('box')
			sudokunum.innerHTML = sudoku[i-1][j-1]
			gameBoard.appendChild(sudokunum)
		}
	}
	
}


function find_zero(board){
	for (let i=0; i<board.length; i++){
		for(let j=0; j<board[i].length; j++){
			if (board[i][j] == 0){
				return [i, j];
			}
		}
	}
	return null
}

function is_valid(board, number, positions){
	for (let i=0; i<board[0].length; i++){
		if (board[positions[0]][i] == number && i != positions[1]){
			return false;
		}
	}
	for (let j=0; j<board.length; j++){
		if (board[j][positions[1]] == number && j != positions[0]){
			return false;
		}
	}
	let row = 3*(Math.floor(positions[0]/3));
	let colomn = 3*(Math.floor(positions[1]/3));
	for (let x=row; x<row+3; x++){
		for (let y=colomn; y<colomn+3; y++){
			if (board[x][y] == number && [x,y] != positions){
				return false;
			}
		}
	}
	return true;
}

function solve(board){
	positions = find_zero(board);
	if (!positions){
		return true;
	}else{
		var row = positions[0];
		var colomn = positions[1];
	}
	for (let i=1; i<10; i++){
		if (is_valid(board, i, [row, colomn])){
			board[row][colomn] = i;
			print_web(row,colomn,i)

			if (solve(board)){
				return true;
			}
			board[row][colomn] = 0;
			print_web(row, colomn, 0)
		}
	}
	return false;

}

function print_web(row, colomn, num){
	
	const sudokunum = document.createElement('div')
	sudokunum.style.gridRowStart = row + 1
	sudokunum.style.gridColumnStart = colomn + 1
	sudokunum.classList.add('box-completing')
	sudokunum.innerHTML = num
	gameBoard.appendChild(sudokunum)

	
}

print_first(sudoku, gameBoard)
solve(sudoku)
