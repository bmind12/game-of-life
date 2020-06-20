interface Field {
    [height: number]: {
        [width: number]: boolean
    }
}

class GameOfLife {
    public field: Field

    constructor(size: number)
    constructor(height: number, width?: number)
    constructor(height: number, width = height) {
        this.field = this.generateField(height, width)
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
