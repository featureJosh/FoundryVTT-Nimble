<script>
import localize from '../../utils/localize.js';

let { dialog } = $props();
const { Actor, actorTypeBanners } = CONFIG.NIMBLE;
const { documentClasses } = Actor;

delete documentClasses.base;
</script>

<article>
    <ul class="nimble-actor-type-list">
        {#each Object.keys(documentClasses) as actorType}
            {@const actorTypeName = localize(`TYPES.Actor.${actorType}`)}

            <li class="nimble-actor-type-list__option">
                <button
                    class="nimble-card"
                    onclick={() => dialog.submit.call(dialog, actorType)}
                >
                    <img
                        class="nimble-card__img"
                        src={actorTypeBanners[actorType]}
                        alt={actorTypeName}
                    />

                    <h3 class="nimble-card__title nimble-heading" data-heading-variant="section">
                        {actorTypeName}
                    </h3>
                </button>
            </li>
        {/each}
    </ul>
</article>

<style lang="scss">
    article {
        padding: 1rem;
    }

    .nimble-actor-type-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
        margin: 0;
        padding: 0;
        list-style: none;

        &__option {
            display: contents;
        }
    }

    .nimble-actor-type-list {
        --nimble-card-content-grid:
            "img"
            "title";
        --nimble-card-column-dimensions: 1fr;
        --nimble-card-row-dimensions: repeat(10rem, 1fr);
        --nimble-card-width: 100%;
        --nimble-card-image-height: 10rem;
        --nimble-card-image-width: 100%;
        --nimble-card-image-bl-border-radius: 0;
        --nimble-card-image-tr-border-radius: 4px;
        --nimble-card-image-tl-border-radius: 4px;

        --nimble-document-list-columns: repeat(3, 1fr);
        --nimble-document-list-gap: 0.375rem;

        --nimble-heading-justification: center;
        --nimble-heading-padding: 0.5rem;
        --nimble-heading-size: var(--nimble-md-text);
    }
</style>
