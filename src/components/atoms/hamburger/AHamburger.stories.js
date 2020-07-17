import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import AHamburger from './AHamburger.vue'

const wrapper = {
  components: { AHamburger }
}

storiesOf('Atoms/Hamburger', module)
  .add('Default', () => ({
    ...wrapper,
    template: '<AHamburger :onClick="action" />',
    methods: {
      action: action('hamburger clicked')
    }
  }))
  .add('Open', () => ({
    ...wrapper,
    template: '<AHamburger isOpen />'
  }))
