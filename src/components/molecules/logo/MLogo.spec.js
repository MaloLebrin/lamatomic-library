import { shallowMount } from '@vue/test-utils'
import MLogo from './MLogo.vue'

describe('Molecule - MLogo', () => {
    let stubs

    beforeEach(() => {
        stubs = {
            AImage: { template: '<div></div>' }
        }
    })

    test('...has <alink> component and logo class', () => {
        const wrapper = shallowMount(MLogo, { stubs })

        expect(wrapper.html()).toContain(
            `<alink`
        )

        expect(wrapper.html()).toContain(
            `class="m-logo"`
        )
    })

    test('...has correct Default (with null type prop value) logo filename', () => {
        const wrapper = shallowMount(MLogo, {
            propsData: {
                type: null
            },
            stubs
        })

        expect(wrapper.vm.logoFileName).toBe('logo-default.svg')
    })

    test('...has correct Default logo filename', () => {
        const wrapper = shallowMount(MLogo, {
            propsData: {
                type: 'default'
            },
            stubs
        })

        expect(wrapper.vm.logoFileName).toBe('logo-default.svg')
    })

    test('...has correct Default Inline logo filename', () => {
        const wrapper = shallowMount(MLogo, {
            propsData: {
                type: 'default-inline'
            },
            stubs
        })

        expect(wrapper.vm.logoFileName).toBe('logo-default-inline.svg')
    })

    test('...has correct White logo filename', () => {
        const wrapper = shallowMount(MLogo, {
            propsData: {
                type: 'white'
            },
            stubs
        })

        expect(wrapper.vm.logoFileName).toBe('logo-white.svg')
    })

    test('...has correct White Inline logo filename', () => {
        const wrapper = shallowMount(MLogo, {
            propsData: {
                type: 'white-inline'
            },
            stubs
        })

        expect(wrapper.vm.logoFileName).toBe('logo-white-inline.svg')
    })
})
