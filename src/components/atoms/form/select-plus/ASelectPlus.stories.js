import { storiesOf } from '@storybook/vue'
import ASelectPlus from './ASelectPlus.vue'

const wrapper = {
  components: { ASelectPlus }
}

storiesOf('Atoms/Form/Selects', module)
    .addParameters({ component: ASelectPlus })

    .add('Select Plus', () => ({
        ...wrapper,

        template: `
        <div>
            <ASelectPlus :options="options" placeholder="Select" />
        </div>`,

        data () {
            return {
                options: ['Option A', 'Option B', 'Option C', 'Option D']
            }
        }
    }))

    .add('Searchable', () => ({
        ...wrapper,

        template: `
        <div>
            <ASelectPlus :options="options" placeholder="Search and select a city" searchable />
        </div>`,

        data() {
            return {
                options: ['Nantes', 'Londres', 'Budapest', 'Prague']
            }
        }
    }))
