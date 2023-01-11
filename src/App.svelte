<script>
  import { Converter } from "./lib/converter.js";

  import CategorySelector from "./lib/CategorySelector.svelte";
  import UnitSelector from "./lib/UnitSelector.svelte";
  import AddModal from "./AddModal.svelte";
  import RemoveModal from "./RemoveModal.svelte";

  let unit1Code, unit2Code, lastEditedInput, category;
  let unit1Value = 1;
  let unit2Value = 1;

  let showAddModal = false;
  let showRemoveModal = false;

  function updateInputs() {
    if (this.tagName == "INPUT") lastEditedInput = this;

    if (
      (lastEditedInput === undefined && this.id == "unit1") ||
      lastEditedInput?.id == "value1"
    ) {
      unit2Value = Converter.convert(unit1Code, unit1Value, unit2Code);
    } else {
      unit1Value = Converter.convert(unit2Code, unit2Value, unit1Code);
    }
  }

  function categoryChange() {
    unit1Value = 1;
    unit2Value = 1;
  }
</script>

{#if showAddModal}
  <AddModal bind:show={showAddModal} />
{:else if showRemoveModal}
  <RemoveModal bind:show={showRemoveModal} />
{:else}
  <h1>Конвертер величин</h1>
  <CategorySelector bind:value={category} on:change={categoryChange} />
  <br />
  <input
    type="number"
    id="value1"
    bind:value={unit1Value}
    on:input={updateInputs}
  />
  <UnitSelector
    id="unit1"
    {category}
    bind:value={unit1Code}
    on:change={updateInputs}
  />
  <span>=</span>
  <input
    type="number"
    id="value2"
    bind:value={unit2Value}
    on:input={updateInputs}
  />
  <UnitSelector
    id="unit2"
    {category}
    bind:value={unit2Code}
    on:change={updateInputs}
  />
  <br />
  <br />
  <button on:click={() => (showAddModal = true)}
    >Добавить свою единицу измерения</button
  >
  <button on:click={() => (showRemoveModal = true)}
    >Удалить свою единицу измерения</button
  >
{/if}
