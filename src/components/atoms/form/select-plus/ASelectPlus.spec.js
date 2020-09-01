import { mount } from '@vue/test-utils'
import ASelectPlus from './ASelectPlus.vue'

describe('Atoms/ASelectPlus', () => {
  test('...options has array', () => {
        const wrapper = mount(ASelectPlus, {
            propsData: { options: ['ohoh', 'héhé', 'hihi'] }
        })

        expect(wrapper.html()).toContain('<div class="a-select-plus">')
        expect(wrapper.html()).toContain('<div tabindex="0" class="multiselect">')
        expect(wrapper.html()).toContain('<div class="multiselect__select"></div>')
        expect(wrapper.html()).toContain('<div class="multiselect__tags">')
        expect(wrapper.html()).toContain(
            '<li class="multiselect__element"><span data-select="" data-selected="" data-deselect="" class="multiselect__option multiselect__option--highlight"><span>ohoh</span>'
        )
    })
})
