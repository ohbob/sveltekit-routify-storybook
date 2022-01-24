<script>
    import {Meta, Story, Template} from "@storybook/addon-svelte-csf";
    import Button from "./index.svelte";
</script>

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

<Template let:args>
    <Button {...args}/>
</Template>

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

<Story args={{
    label: "Button",
    cls: "secondary"
  }}
       name="Secondary"
/>
