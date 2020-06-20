interface Field {
    [row: number]: {
        [element: number]: boolean
    }
}

class GameOfLife {
    public field: Field
    private gameSpeed = 100000

    constructor(size: number)
    constructor(height: number, width?: number)
    constructor(height: number, width = height) {
        this.field = this.generateField(height, width)
    }

    public start(): void {
        setInterval(this.tick, this.gameSpeed)
    }

    private tick = () => {
        for (const row of Object.keys(this.field)) {
            for (const element of Object.keys(this.field[+row])) {
                const neighbours = this.getNeighbours(+row, +element)
            }
        }
    }

    private getNeighbours(row: number, element: number): Array<boolean> {
        const neighbours = [false]

        return neighbours
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
