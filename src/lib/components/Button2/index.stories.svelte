<script>
    import {Meta, Story, Template} from "@storybook/addon-svelte-csf";
    import Button from "./index.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
        argTypes={{
    label: { control: "text" },
    cls: {
      control: { type: 'select' },
      options: ['primary', 'secondary']
    }
  }}
        component={Button}
        title="Elements/Button"
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
    <Button {...args}/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
        args={{
    label: "Button",
  }}
        name="Default"
/>


<Story
        args={{
    label: "Button",
    cls: "primary"
  }}
        name="Primary"
/>

<Story
        args={{
    label: "Button",
    cls: "secondary"
  }}
        name="Secondary"
/>
