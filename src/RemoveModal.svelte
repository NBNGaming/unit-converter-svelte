<script>
    import CategorySelector from "./lib/CategorySelector.svelte";
    import UnitSelector from "./lib/UnitSelector.svelte";
    import { Converter } from "./lib/converter.js";

    export let show;
    let category = "weight";
    let unitCode;

    function removeClick() {
        Converter.removeCustomUnit(unitCode);
        show = false;
    }
</script>

<h1>Удалить свою единицу измерения</h1>
<CategorySelector bind:value={category} />
<br />
<UnitSelector {category} bind:value={unitCode} custom={true} />
<br />
<br />
<button on:click={() => (show = false)}>Отмена</button>
<button on:click={removeClick} disabled={!Boolean(unitCode)}>Удалить</button>
