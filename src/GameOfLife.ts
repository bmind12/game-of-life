interface Field {
    [row: string]: {
        [column: string]: boolean
    }
}

interface NeighbourCells {
    rowAbove: number
    rowBelow: number
    columnLeft: number
    columnRight: number
}

class GameOfLife {
    public field: Field
    private gameSpeed = 2000
    private lastRow: number
    private lastColumn: number
    private neighbourCells: Map<string, NeighbourCells> = new Map()

    constructor(size: number)
    constructor(height: number, width?: number)
    constructor(height: number, width = height) {
        this.field = this.generateField(height, width)
        this.lastRow = Object.keys(this.field).length - 1
        this.lastColumn = Object.keys(this.field[this.lastRow]).length - 1
    }

    public start(): void {
        setInterval(() => {
            this.field = this.tick()
            console.log(this.field)
        }, this.gameSpeed)
    }

    private tick = (): Field => {
        const newField: Field = {}

        for (const row of Object.keys(this.field)) {
            newField[row] = {}

            for (const column of Object.keys(this.field[row])) {
                const cell = this.field[row][column]
                const neighbours = this.getNeighbours(row, column)
                const aliveNeighbours = neighbours.filter(
                    (neighbour) => neighbour
                ).length
                let newCell = false

                if (cell) {
                    if (aliveNeighbours === 2 || aliveNeighbours === 3) {
                        newCell = true
                    }
                } else {
                    if (aliveNeighbours === 3) {
                        newCell = true
                    }
                }

                newField[row][column] = newCell
            }
        }

        return newField
    }

    private getNeighbours(row: string, column: string): Array<boolean> {
        const {
            rowAbove,
            rowBelow,
            columnLeft,
            columnRight
        } = this.getNeighbourCells(+row, +column)

        const neighbours = [
            this.field[rowAbove][columnLeft],
            this.field[rowAbove][column],
            this.field[rowAbove][columnRight],
            this.field[row][columnLeft],
            this.field[row][columnRight],
            this.field[rowBelow][columnLeft],
            this.field[rowBelow][column],
            this.field[rowBelow][columnRight]
        ]

        return neighbours
    }

    private getNeighbourCells(row: number, column: number): NeighbourCells {
        const id = `${row}${column}`
        let neighbourCells = this.neighbourCells.get(id)

        if (neighbourCells) return neighbourCells as NeighbourCells

        const rowAbove = row - 1 < 0 ? this.lastRow : row - 1
        const rowBelow = row + 1 > this.lastRow ? 0 : row + 1
        const columnLeft = column - 1 < 0 ? this.lastColumn : column - 1
        const columnRight = column + 1 > this.lastColumn ? 0 : column + 1
        neighbourCells = {
            rowAbove,
            rowBelow,
            columnLeft,
            columnRight
        }

        this.neighbourCells.set(id, neighbourCells)

        return neighbourCells
    }

    private generateField(size: number): Field
    private generateField(height: number, width?: number): Field
    private generateField(height: number, width = height): Field {
        const field: Field = {}

        for (let i = 0; i < height; i++) {
            field[i] = {}

            for (let j = 0; j < width; j++) {
                field[i][j] = this.getRandomValue()
            }
        }

        return field
    }

    private getRandomValue(): boolean {
        return Math.random() > 0.5
    }
}

const game = new GameOfLife(5)
game.start()
