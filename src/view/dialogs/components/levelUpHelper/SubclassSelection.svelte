<script>
let { subclasses, selectedSubclass = $bindable() } = $props();
</script>

<section>
    <header>
        <h3 class="nimble-heading" data-heading-variant="section">Subclass</h3>
    </header>

    <ul class="nimble-document-list">
        {#each subclasses as subclass}
            <li class="u-semantic-only">
                <button
                    class="nimble-document-card nimble-document-card--no-meta"
                    class:nimble-document-card--selected={subclass?.uuid ===
                        selectedSubclass?.uuid}
                    onclick={async () => {
                        selectedSubclass = await fromUuid(subclass.uuid);
                    }}
                >
                    <img
                        class="nimble-document-card__img"
                        src={subclass.img}
                        alt={subclass.name}
                    />

                    <h4
                        class="nimble-document-card__name nimble-heading"
                        data-heading-variant="item"
                    >
                        {subclass.name}
                    </h4>
                </button>
            </li>
        {/each}
    </ul>
</section>
