<script>
    import { unitStore, Converter } from "./converter.js";

    export let id, value;
    export let category = "weight";
    export let custom = false;
    let units;
    $: {
        let codes = Converter.unitsInCategory(category);
        if (custom) {
            codes = codes.filter((code) => localStorage.getItem(code));
        }
        units = codes.map((key) => [key, $unitStore[key]]);
        value = codes.includes(value) ? value : codes[0];
    }
</script>

<select {id} bind:value on:change>
    {#each units as [code, unit]}
        <option value={code}>
            {unit.label}
        </option>
    {/each}
</select>
