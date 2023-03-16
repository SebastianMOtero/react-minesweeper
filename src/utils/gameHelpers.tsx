export const BOARD_WIDTH = [8, 16, 30];
export const BOARD_HEIGHT = [8, 16, 16];
export const MINES = [10, 40, 99];

export enum Difficulty {
    Easy, Intermediate, Expert
};

export enum StateCell {
    Hidden, Marked, Question, Visible, Detonated, VisibleMine
};

export interface ICell {
    stateCell: StateCell;
    hasAMine: boolean;
    minesAround: number;
}

export const createBoard = (difficulty: Difficulty) => {
    console.debug('createBoard');
    const matrix: ICell[][] = [];

    for (let rows = 0; rows < BOARD_HEIGHT[difficulty]; rows++) {
        const row: ICell[] = [];
        for (let col = 0; col < BOARD_WIDTH[difficulty]; col++) {
            row.push({
                stateCell: StateCell.Hidden,
                hasAMine: false,
                minesAround: 0
            });
        }
        matrix.push(row)
    }

    plantMines(difficulty, matrix);
    calculateMinesAround(matrix);
    return matrix;
}

const plantMines = (difficulty: Difficulty, matrix: ICell[][]) => {
    console.debug('plantMines');
    let remainingMines = MINES[difficulty];
    const total = BOARD_HEIGHT[difficulty] * BOARD_WIDTH[difficulty];

    do {
        const randPlace: number = Math.floor(Math.random() * total);
        const col: number = randPlace % BOARD_WIDTH[difficulty];
        const row: number = Math.floor(randPlace / BOARD_WIDTH[difficulty]);
    
        // We check if the cell has already a mine
        if (!matrix[row][col].hasAMine) {
            matrix[row][col].hasAMine = true;
            remainingMines--;
        }
    } while (remainingMines > 0);
}

const calculateMinesAround = (matrix: ICell[][]) => {
    const width = matrix[0].length;
    const height = matrix.length;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const current = matrix[j][i];
            let minesCounted = 0;

            const marginTop = j === 0;
            const marginBottom = j === height - 1;
            const marginLeft = i === 0;
            const marginRight = i === width - 1;

            if (!marginTop && !marginBottom && !marginLeft && !marginRight) {
                // We are in the middle
                minesCounted +=
                    [
                        matrix[j - 1][i - 1].hasAMine, matrix[j - 1][i].hasAMine, matrix[j - 1][i + 1].hasAMine,
                        matrix[j][i - 1].hasAMine, matrix[j][i + 1].hasAMine,
                        matrix[j + 1][i - 1].hasAMine, matrix[j + 1][i].hasAMine, matrix[j + 1][i + 1].hasAMine
                    ].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                current.minesAround = minesCounted;

            }

            if ([marginTop, marginBottom, marginLeft, marginRight].filter(margin => margin === true).length === 2) {
                // We are in a corner
                if (marginTop && marginLeft) {
                    // we are in the top-left margin
                    minesCounted += [matrix[j][i + 1].hasAMine, matrix[j + 1][i].hasAMine, matrix[j + 1][i + 1].hasAMine].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }

                if (marginTop && marginRight) {
                    // we are in the top-right margin
                    minesCounted += [matrix[j][i - 1].hasAMine, matrix[j + 1][i].hasAMine, matrix[j + 1][i - 1].hasAMine].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }

                if (marginBottom && marginLeft) {
                    // we are in the bottom-left margin
                    minesCounted += [matrix[j][i + 1].hasAMine, matrix[j - 1][i].hasAMine, matrix[j - 1][i + 1].hasAMine].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }

                if (marginBottom && marginRight) {
                    // we are in the bottom-left margin
                    minesCounted += [matrix[j][i - 1].hasAMine, matrix[j - 1][i].hasAMine, matrix[j - 1][i - 1].hasAMine].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }
            } else {
                // We are in a margin
                if (marginTop) {
                    // we are in the top margin
                    minesCounted += [
                        matrix[j][i - 1].hasAMine, matrix[j][i + 1].hasAMine,
                        matrix[j + 1][i - 1].hasAMine, matrix[j + 1][i].hasAMine, matrix[j + 1][i + 1].hasAMine].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }

                if (marginBottom) {
                    // we are in the bottom margin
                    minesCounted += [
                        matrix[j - 1][i - 1].hasAMine, matrix[j - 1][i].hasAMine, matrix[j - 1][i + 1].hasAMine,
                        matrix[j][i - 1].hasAMine, matrix[j][i + 1].hasAMine,
                    ].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }

                if (marginLeft) {
                    // we are in the left margin
                    minesCounted += [
                        matrix[j - 1][i].hasAMine, matrix[j - 1][i + 1].hasAMine,
                        matrix[j][i + 1].hasAMine,
                        matrix[j + 1][i].hasAMine, matrix[j + 1][i + 1].hasAMine,
                    ].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }

                if (marginRight) {
                    // we are in the left margin
                    minesCounted += [
                        matrix[j - 1][i - 1].hasAMine, matrix[j - 1][i].hasAMine,
                        matrix[j][i - 1].hasAMine,
                        matrix[j + 1][i - 1].hasAMine, matrix[j + 1][i].hasAMine,
                    ].reduce((acc, curr) => acc + (curr === true ? 1 : 0), 0);
                    current.minesAround = minesCounted;
                }
            }

        }
    }
}

export const printMatrix = (matrix: ICell[][]) => {
    matrix.map((row: ICell[]) => console.log(row.map((cell: ICell) => cell.hasAMine ? 'X' : '-')));
    matrix.map((row: ICell[]) => console.log(row.map((cell: ICell) => cell.minesAround)));
}