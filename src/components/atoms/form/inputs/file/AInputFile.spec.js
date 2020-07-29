import { shallowMount } from '@vue/test-utils'
import AInputFile from './AInputFile.vue'

describe('Atom - AInputFile', () => {
    test('...default has <label> tag with <div> a-button and <input>', () => {
        const wrapper = shallowMount(AInputFile)

        expect(wrapper.attributes().class).toContain('a-input-file-wrapper')
        expect(wrapper.find('input[type="file"]')).toBeTruthy()
        expect(wrapper.find('div.a-button.select-button')).toBeTruthy()
        expect(wrapper.find('input.a-input.a-input-file')).toBeTruthy()
    })

    test('...event is correctly handled', () => {
        const wrapper = shallowMount(AInputFile)

        const event = {
            target: {
                files: [
                    {
                        name: '',
                        size: 50000,
                        type: 'image/png',
                    },
                ],
            },
        }

        wrapper.vm.handleFileChange(event)

        // Check emitted event
        const emittedInput = wrapper.emitted().input

        expect(emittedInput).toBeTruthy()
        expect(emittedInput[0][0]).toBe(event.target.files[0])
        expect(wrapper.vm.value).toBe(event.target.files[0])
    })
})
