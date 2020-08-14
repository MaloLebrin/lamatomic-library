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
    test('...items & mobileItems to be array', () => {
        const wrapper = shallowMount(OHeader)

        wrapper.setProps({
            items: Array
        })

        expect(wrapper.vm.computedMobileItems).toBe(Array)

        wrapper.setProps({
            mobileItems: Array
        })
        expect(wrapper.vm.computedMobileItems).toBe(Array)

        wrapper.setProps({
            items: ['ohoh', 'héhé', 'hihi']
        })

        expect(wrapper.vm.computedMobileItems).toStrictEqual(['ohoh', 'héhé', 'hihi'])

        wrapper.setProps({
            mobileItems: ['ahah', 'héhé', 'hihi']
        })

        expect(wrapper.vm.computedMobileItems).toStrictEqual(['ahah', 'héhé', 'hihi'])


    })
})
