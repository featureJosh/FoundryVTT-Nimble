<script>
import { getContext } from 'svelte';

import Editor from '../components/Editor.svelte';

let actor = getContext('actor');
</script>

<section class="nimble-sheet__body">
    <header class="nimble-sheet-section-header">
        <h3 class="nimble-heading" data-heading-variant="section">
            Notes
        </h3>
    </header>

    {#key actor.reactive.system.description}
        <Editor
            field="system.description"
            content={actor.reactive.system.description}
            document={actor}
        />
    {/key}
</section>

<style lang="scss">
    .nimble-sheet-section-header {
        display: flex;
        align-items: center;
        gap: 1ch;
        margin-block-end: 0.375rem;
        width: 100%;
    }
</style>
