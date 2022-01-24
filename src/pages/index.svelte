<script>
    import {url} from '@roxi/routify'
    import Button from '$components/Button2/index.svelte'
</script>


<Button label="Default"/>
<Button cls="primary" label="Primary"/>
<Button cls="secondary" label="Secondary"/>


<h1>Welcome to SvelteKit + Routify</h1>
<a class="text-blue-700" href={$url('/one')}>&#x2192; a page</a>
