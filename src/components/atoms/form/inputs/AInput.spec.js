import { mount, shallowMount } from '@vue/test-utils'
import AInput from './AInput.vue'

describe('Atom - AInput', () => {
    test('...default has <AInput> tag', () => {
        const wrapper = shallowMount(AInput)
        expect(wrapper.find('AInput')).toBeTruthy()
    })

    test('...pros are correctly populated', () => {
        const wrapper = shallowMount(AInput, {
            propsData: {
                type: 'type',
                placeholder: 'placeholder',
                id: 'id'
            }
        })

        expect(wrapper.attributes().type).toBe('type')
        expect(wrapper.attributes().placeholder).toBe('placeholder')
        expect(wrapper.attributes().id).toBe('id')
    })

    test('...event is correctly handled', () => {
        const wrapper = mount(AInput, {
            propsData: {
                type: 'text'
            }
        })

        // Trigger input
        const input = wrapper.find('input')
        input.element.value = 'Banana!'
        input.trigger('input')

        // Check emitted event
        const emittedInput = wrapper.emitted().input
        expect(emittedInput).toBeTruthy()
        expect(emittedInput[0][0]).toBe('Banana!')
    })
})
