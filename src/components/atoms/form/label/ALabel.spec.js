import { mount } from '@vue/test-utils'
import ALabel from './ALabel.vue'

describe('Atom - ALabel', () => {
  test('Renders correctly', () => {
    const wrapper = mount(ALabel, {
      propsData: {
        htmlFor: 'text-input'
      },
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.attributes().for).toContain('text-input')
    expect(wrapper.html()).toContain('Full Name')
  })

  test('renders a * if the label is required', () => {
    const wrapper = mount(ALabel, {
      propsData: {
        required: true
      },
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.html()).toContain('<label class="label">*Full Name</label>')
  })
})