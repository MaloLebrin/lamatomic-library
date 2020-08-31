import { mount } from '@vue/test-utils'
import ASelectPlus from './ASelectPlus.vue'

describe('Atoms/ASelectPlus', () => {
  test('...options has array', () => {
    const wrapper = mount(ASelectPlus, {
        propsData: { options: ['ohoh', 'héhé', 'hihi'] }
    })
    expect(wrapper.props().options).toContain('ohoh')
    expect(wrapper.props().options).toContain('héhé')
    expect(wrapper.props().options).toContain('hihi')
    })
})
