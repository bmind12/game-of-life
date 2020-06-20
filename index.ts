class GameOfLife {
    public field: Array<Array<boolean>>

    constructor(size: number)
    constructor(height: number, width?: number)
    constructor(height: number, width?: number) {
        this.field = this.generateField(height, width)
    }

    private generateField(size: number): Array<Array<boolean>>
    private generateField(height: number, width?: number): Array<Array<boolean>>
    private generateField(
        height: number,
        width?: number
    ): Array<Array<boolean>> {
        if (!width) {
            return Array(height).fill(Array(height).fill(this.getRandomValue()))
        }

        return [...Array(height)].map((_) =>
            [...Array(width)].map((_) => this.getRandomValue())
        )
    }

    private getRandomValue(): boolean {
        return Math.random() > 0.5
    }
}

const game = new GameOfLife(10, 5)
