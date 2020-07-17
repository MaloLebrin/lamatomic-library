import { shallowMount } from '@vue/test-utils'
import AHamburger from './AHamburger.vue'

describe('Atom - Hamburger', () => {
    test(' default tag button and span', () => {
        const wrapper = shallowMount(AHamburger)
        expect(wrapper.html()).toContain('button')
        expect(wrapper.html()).toContain('text')
    })
      test('renders correctly with the right props', () => {
    const wrapper = shallowMount(AHamburger, {
      propsData: {
        isOpen: true
      }
    })

    expect(wrapper.attributes().class).toContain('open')
  })
})
