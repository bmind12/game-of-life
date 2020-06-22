<script lang="typescript">
    let title: string = 'Hello, worldaa'

    if (typeof title === 'number') {
        throw new Error()
    }
</script>

<style>
    h1 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
    }
</style>

<h1>{title}</h1>
