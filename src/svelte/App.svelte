<script lang="typescript">
    import GameOfLife from '../models/GameOfLife'

    let speed = 100
    const game = new GameOfLife(speed, 60)
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

    setInterval(() => {
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
    <label>Speed (ms)</label>
    <input type="number" bind:value={speed} />
    <button on:click={handleSetSpeed}>Set</button>
</div>
