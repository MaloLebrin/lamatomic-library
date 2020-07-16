import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import AHamburger from './AHamburger.vue'

const wrapper = {
  components: { AHamburger }
}

storiesOf('Atoms/Hamburger', module)
  .add('default', () => ({
    ...wrapper,
    template: '<AHamburger :onClick="action" />',
    methods: {
      action: action('hamburger clicked')
    }
  }))
  .add('open', () => ({
    ...wrapper,
    template: '<AHamburger isOpen />'
  }))
