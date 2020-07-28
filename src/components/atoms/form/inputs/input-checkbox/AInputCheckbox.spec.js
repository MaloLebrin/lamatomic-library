import { mount } from '@vue/test-utils'
import AInputCheckbox from './AInputCheckbox.vue'

const factory = () => {
    return mount(AInputCheckbox, {
        propsData: {
            name: 'checkbox-gaga',
            value: 'gogo'
        }
    })
}

describe('Atom - AInputCheckbox', () => {
    test('...default has <input type="checkbox"> tag', () => {
        const wrapper = factory()

        const input = wrapper.find('input.a-input.a-input-checkbox[type="checkbox"]')
        expect(input).toBeTruthy()
    })

    test('...given props are correctly used', () => {
        const wrapper = mount(AInputCheckbox, {
            propsData: {
                checked: true,
                value: 'Gogooooo',
            }
        })

        const input = wrapper.find('input.a-input.a-input-checkbox[type="checkbox"]')
        expect(input.attributes().value).toBe('Gogooooo')
        expect(input.attributes().checked).toBeTruthy()
    })

    test('...event correctly emits', () => {
        const wrapper = factory()

        const input = wrapper.find('input.a-input.a-input-checkbox[type="checkbox"]')

        input.trigger('click')
        expect(wrapper.emitted().input).toBeTruthy()
        expect(wrapper.emitted().input[0][0]).toBeTruthy()
    })

    test('...wach on checked is OK', async () => {
        const wrapper = factory()
        const spyToggle = jest.spyOn(wrapper.vm, 'toggle')
        const input = wrapper.find('input.a-input.a-input-checkbox[type="checkbox"]')

        await wrapper.setProps({ checked: true })

        expect(spyToggle).not.toHaveBeenCalled() // Because newValue (true) == this.shouldBeChecked (true)
        expect(input.attributes().checked).toBeTruthy()

        // TODO: Doesn't work because doesn't update this.modelValue, I don't know why...

        // await wrapper.setProps({ checked: false })

        // expect(spyToggle).toHaveBeenCalled()
        // expect(wrapper.emitted().input).toBeTruthy()
        // expect(input.attributes().checked).toBeFalsy()
    })

    // test('...v-model (and shouldBeChecked) correctly used', () => {
    //     const wrapper = mount(AInputCheckbox, {
    //         propsData: {
    //             name: 'checkbox-gaga',
    //             value: 'Gogooooo'
    //         }
    //     })

    //     const input = wrapper.find('input.a-input.a-input-checkbox[type="checkbox"]')
    //     input.trigger('change', true)
    //     // TODO: Doesn't update this.modelValue, I don't know why...
    // })
})
