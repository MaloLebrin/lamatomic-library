import { shallowMount } from '@vue/test-utils'
import OHeader from './OHeader.vue'

describe('Organism - OHeader', () => {

    test('...has <header> tag', () => {
        const wrapper = shallowMount(OHeader)
        expect(wrapper.html()).toContain('<header')
    })


    test('toggleMenu', () => {
        const wrapper = shallowMount(OHeader)

        expect(wrapper.vm.menuIsOpen).toBeFalsy()
        wrapper.vm.toggleMenu()
        expect(wrapper.vm.menuIsOpen).toBeTruthy()

        wrapper.vm.menuIsOpen = true
        expect(wrapper.find('is-open')).toBeTruthy()
        expect(wrapper.vm.menuIsOpen).toBeTruthy()
        wrapper.find('.o-header-menu').trigger('click')
        expect(wrapper.vm.menuIsOpen).toBeTruthy()
        expect(wrapper.html()).toEqual(expect.not.stringContaining('is-open'))
    })
})
