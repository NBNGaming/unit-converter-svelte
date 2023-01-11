<script>
    import CategorySelector from "./lib/CategorySelector.svelte";
    import { Converter } from "./lib/converter.js";

    export let show;
    let label = "";
    let value = 1;
    let category = "weight";

    function categoryChange() {
        label = "";
        value = 1;
    }

    function addClick() {
        if (label == "" || isNaN(value) || value == 0) {
            alert("Заполните все поля!");
            return;
        }

        Converter.addCustomUnit(label, value, category);
        show = false;
    }
</script>

<h1>Добавить свою единицу измерения</h1>
<CategorySelector bind:value={category} on:change={categoryChange} />
<br />
<span>1</span>
<input type="text" bind:value={label} placeholder="единица измерения" />
<span>=</span>
<input type="number" bind:value />
<span>{category == "weight" ? " г" : " мл"}</span>
<br />
<br />
<button on:click={() => (show = false)}>Отмена</button>
<button on:click={addClick}>Добавить</button>
