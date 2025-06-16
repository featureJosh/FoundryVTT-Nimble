<script>
let { label, subheading, tooltip, total } = $props();
</script>

<div class="roll" class:roll--no-subheading={!subheading}>
    <div
        class="roll__total"
        data-tooltip={tooltip}
        data-tooltip-class="nimble-tooltip nimble-tooltip--roll"
        data-tooltip-direction="LEFT"
    >
        {total}
    </div>

    <h3 class="roll__label">{label}</h3>

    {#if subheading}
        <span class="roll__subheading">
            {subheading}
        </span>
    {/if}
</div>

<style lang="scss">
    .roll {
        display: grid;
        grid-template-areas:
            "rollResult rollLabel editButton"
            "rollResult subHeading editButton";
        grid-template-columns: max-content 1fr max-content;
        gap: 0 0.5rem;

        &--no-subheading {
            grid-template-areas: "rollResult rollLabel editButton";
        }

        &__label {
            grid-area: rollLabel;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0;
            color: inherit;
            font-size: var(--nimble-sm-text);
            font-weight: 900;
            line-height: 1;
            border: 0;
        }

        &__subheading {
            grid-area: subHeading;
            width: 100%;
            font-size: var(--nimble-xs-text);
            line-height: 1;
            color: var(--nimble-medium-text-color);
            font-weight: 500;
        }

        &__total {
            grid-area: rollResult;
            position: relative;
            display: flex;
            flex-grow: 0;
            align-items: center;
            justify-content: center;
            height: 2.25rem;
            width: 2.5rem;
            font-size: var(--nimble-lg-text);
            font-weight: 700;
            border: 1px solid var(--nimble-card-border-color);
            border-radius: 4px;
        }
    }
</style>
