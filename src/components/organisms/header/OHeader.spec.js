import { shallowMount } from '@vue/test-utils'
import OHeader from './OHeader.vue'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
})

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

    test('...items injected are correctly rendered', () => {

        const wrapper = shallowMount(OHeader, {
            slots: {
                "navBarItems": `<li><p>Content col 1</p></li>
                <li><p>Content col 2</p></li>`
            }
        })

        expect(wrapper.html()).toContain('<mnavbar-stub horizontal="true" class="m-navbar-desktop">')
        expect(wrapper.html()).toContain('<li>')
        expect(wrapper.html()).toContain('<p>Content col 1</p>')
        expect(wrapper.html()).toContain('<p>Content col 2</p>')

    })

})
