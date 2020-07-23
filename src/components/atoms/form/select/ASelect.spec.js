import { mount } from '@vue/test-utils'
import ASelect from './ASelect.vue'

describe('Atoms/ASelect', () => {
  test('Renders the correct options', () => {
    const wrapper = mount(ASelect, {
      propsData: {
        options: [
          {
            label: 'option 1',
            value: 'option1'
          },
          {
            label: 'option 2',
            value: 'option2'
          }
        ]
      }
    })
    expect(wrapper.html()).toContain('class="a-select"')
    expect(wrapper.findAll('option').length).toBe(3)
    expect(wrapper.findAll('option').at(1).text()).toContain('option 1')
    expect(wrapper.findAll('option').at(1).attributes().value).toBe('option1')
    expect(wrapper.findAll('option').at(2).text()).toContain('option 2')
    expect(wrapper.findAll('option').at(2).attributes().value).toBe('option2')

  })

  test('Emits the change event', () => {
    const wrapper = mount(ASelect, {
      propsData: {
        options: [
          {
            label: 'Option 1',
            value: 'option1'
          }
        ]
      }
    })

    wrapper.find('select').trigger('change')

    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('...options has array', () => {
    const wrapper = mount(ASelect, {
        propsData: { options: ['ohoh', 'héhé', 'hihi'] }
    })
    expect(wrapper.props().options).toContain('ohoh')
    expect(wrapper.props().options).toContain('héhé')
    expect(wrapper.props().options).toContain('hihi')
    })
})
