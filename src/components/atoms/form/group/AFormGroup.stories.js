import { storiesOf } from '@storybook/vue'
import AInputText from '../input/input-text/AInputText.vue'
import AFormGroup from './AFormGroup.vue'

const wrapper = {
  components: { AFormGroup, AInputText }
}

storiesOf('Atoms/Form/FormGroup', module)
  .add('default as FormGroup', () => ({
    ...wrapper,
    template: `<AFormGroup label="Nom"> <AInputText /> </AFormGroup>`,
  }),)
