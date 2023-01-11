<script>
    export let value = "weight";
</script>

<label for="category">Категория:</label>
<br />
<select bind:value on:change id="category">
    <option value="weight">Масса</option>
    <option value="volume">Объём</option>
</select>
