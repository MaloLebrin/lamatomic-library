import { storiesOf } from '@storybook/vue'
import ASelect from './ASelect.vue'

const wrapper = {
  components: { ASelect }
}

storiesOf('Atoms/ASelect', module)
  .add('single', () => ({
    ...wrapper,
    template: `
      <div>
        <label>Select one of these options</label>
        <ASelect v-model="selectedValue" :options="options"/>

        <br/><br/>

        Value is : "{{ selectedValue }}"
      </div>
    `,
    data () {
      return {
        selectedValue: 'b',
        options: [
          {
            label: 'Option A',
            value: 'a'
          },
          {
            label: 'Option B',
            value: 'b'
          },
          {
            label: 'Option C',
            value: 'c'
          },
          {
            label: 'Option D',
            value: 'd',
            disabled: true
          }
        ]
      }
    }
  }),)
