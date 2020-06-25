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

interface GameData {
    speed: number
    density: number
    size?: number
    height?: number
    width?: number
}

export default class GameOfLife {
    public field: Field
    private speed: number
    private height: number
    private width: number
    private density: number
    private lastRow: number
    private lastColumn: number
    private neighbourCells: Map<string, NeighbourCells> = new Map()
    private intervalId: number
    private currentRow: number
    private currentCol: number
    private isStarted = false

    constructor({
        speed,
        size,
        height = size,
        width = height,
        density
    }: GameData) {
        this.setSpeed(speed)
        this.setSize(height, width)
        this.setDensity(density)
        this.generateField(this.getRandomCell)
        this.lastRow = Object.keys(this.field).length - 1
        this.lastColumn = Object.keys(this.field[this.lastRow]).length - 1
    }

    public toggleStart(): void {
        if (this.isStarted) {
            this.pause()
        } else {
            this.start()
        }
    }

    public setSpeed(value: number): void {
        if (value < 10 || isNaN(value)) return

        this.speed = value

        // TODO: add eventing
        if (this.isStarted) {
            this.pause()
            this.start()
        }
    }

    public setDensity(value: number): void {
        if (value >= 0 && value <= 1) {
            this.density = value
        }
    }

    public setSize(height: number, width = height): void {
        if (height <= 0 || width <= 0) return // TODO: add proper error handling

        this.height = height
        this.width = width
    }

    private start(): void {
        this.intervalId = window.setInterval(() => {
            this.generateField(this.getNewCell)
        }, this.speed)
        this.isStarted = true
    }

    private pause(): void {
        clearInterval(this.intervalId)
        this.isStarted = false
    }

    private getRandomCell = (): boolean => {
        return Math.random() < this.density
    }

    private getNewCell = () => {
        const cell = this.field[this.currentRow][this.currentCol]
        const neighbours = this.getNeighbours()
        const aliveNeighbours = this.getAliveNeighboursCount(neighbours)

        if (cell) {
            if (aliveNeighbours === 2 || aliveNeighbours === 3) {
                return true
            }
        } else {
            if (aliveNeighbours === 3) {
                return true
            }
        }

        return false
    }

    private getAliveNeighboursCount(neighbours: Array<boolean>): number {
        return neighbours.filter((neighbour) => neighbour).length
    }

    private getNeighbours(): Array<boolean> {
        const {
            rowAbove,
            rowBelow,
            columnLeft,
            columnRight
        } = this.getNeighbourCells(+this.currentRow, +this.currentCol)

        const neighbours = [
            this.field[rowAbove][columnLeft],
            this.field[rowAbove][this.currentCol],
            this.field[rowAbove][columnRight],
            this.field[this.currentRow][columnLeft],
            this.field[this.currentRow][columnRight],
            this.field[rowBelow][columnLeft],
            this.field[rowBelow][this.currentCol],
            this.field[rowBelow][columnRight]
        ]

        return neighbours
    }

    private getNeighbourCells(row: number, column: number): NeighbourCells {
        const id = `row:${row}-column${column}`
        let neighbourCells = this.neighbourCells.get(id)

        if (neighbourCells) return neighbourCells

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

    private generateField = (getCell: Function): void => {
        const field: Field = {}

        for (let i = 0; i < this.height; i++) {
            field[i] = {}
            this.currentRow = i

            for (let j = 0; j < this.width; j++) {
                this.currentCol = j
                field[i][j] = getCell()
            }
        }

        this.field = field
    }
}
