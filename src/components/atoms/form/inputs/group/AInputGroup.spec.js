import { shallowMount } from '@vue/test-utils'
import AInputGroup from './AInputGroup.vue'

describe('Atom - AInputGroup', () => {
    test(' Renders correctly', () => {
        const wrapper = shallowMount(AInputGroup)

        expect(wrapper.attributes().class).toContain('a-input-group')
        expect(wrapper.html()).toContain('<div class="a-input-group"')

    })
    test('...with just 2 slots used', () => {
        const wrapper = shallowMount(AInputGroup, {
            slots: {
                'prepend': '<div><p></p></div>',
                'append': '<div><p></p></div>'
            }
        })
        expect(wrapper.html()).toContain('<div class="a-input-group"')

        expect(wrapper.html()).toContain(
            `<div class="prepend"`
        )

        expect(wrapper.html()).toContain(
            `<div class="append"`
        )
        expect(wrapper.vm.hasSlotPrepend).toBeTruthy()
        expect(wrapper.vm.hasSlotAppend).toBeTruthy()
    })

})
