import { storiesOf } from '@storybook/vue'
import ASelectPlus from './ASelectPlus.vue'

const wrapper = {
  components: { ASelectPlus }
}

storiesOf('Atoms/Form/SelectPlus', module)
    .addParameters({ component: ASelectPlus })

    .add('default', () => ({
        ...wrapper,
        template: `
        <div>
            <ASelectPlus :options="options" placeholder="sélectionner" />

        </div>`,
        data () {
            return {
                options: ['Option A','Option B','Option C','Option D']
            }
        }
  }),)
