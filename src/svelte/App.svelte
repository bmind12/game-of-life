<script lang="typescript">
    import GameOfLife from '../models/GameOfLife'

    let speed = 100
    let density = 50
    let size = 50

    const game = new GameOfLife({ density: density / 100, speed, size })
    let gameFieldRows = formatGameField(game.field)

    function formatGameField(field) {
        return Object.values(field).map((row) => Object.values(row))
    }

    function toggleStart() {
        game.toggleStart()
    }

    function handleSetSpeed() {
        game.setSpeed(speed)
    }

    function handleSetDensity() {
        game.setDensity(density / 100)
    }

    setInterval(() => {
        // TODO: add proper observation
        gameFieldRows = formatGameField(game.field)
    }, speed / 2)
</script>

<style>
    h1 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
    }

    .row {
        margin-bottom: -5px;
    }

    .cell {
        display: inline-block;
        height: 10px;
        width: 10px;
        background-color: black;
        border: 1px solid black;
    }

    .cell--alive {
        background-color: white;
    }
</style>

<div class="field">
    {#each gameFieldRows as items}
        <div class="row">
            {#each items as item}
                <div class="cell" class:cell--alive={item} />
            {/each}
        </div>
    {/each}
    <button on:click={toggleStart}>Resume / Pause game</button>
    <label>Speed (ms):</label>
    <input type="number" min="10" max="100000" bind:value={speed} />
    <button on:click={handleSetSpeed}>Set</button>
    <label>Density:</label>
    <input
        type="range"
        min="0"
        max="100"
        bind:value={density}
        on:change={handleSetDensity} />
    <label>{density}</label>
</div>
