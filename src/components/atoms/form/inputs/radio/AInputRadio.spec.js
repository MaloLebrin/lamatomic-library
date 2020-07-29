import { mount } from '@vue/test-utils'
import AInputRadio from './AInputRadio.vue'

const factory = () => {
    return mount(AInputRadio, {
        propsData: {
            name: 'radio-gaga',
            value: 'gogo'
        }
    })
}

describe('Atom - AInputRadio', () => {
    test('...default has <input type="radio"> tag', () => {
        const wrapper = factory()

        const input = wrapper.find('input.a-input.a-input-radio[type="radio"]')
        expect(input).toBeTruthy()
    })

    test('...given props are correctly used', () => {
        const wrapper = mount(AInputRadio, {
            propsData: {
                checked: true,
                value: 'Gogooooo'
            }
        })

        const input = wrapper.find('input.a-input.a-input-radio[type="radio"]')

        expect(input.attributes().checked).toBeTruthy()
        expect(input.attributes().value).toBe('Gogooooo')
    })

    test('...event correctly emits', () => {
        const wrapper = factory()

        const input = wrapper.find('input.a-input.a-input-radio[type="radio"]')

        input.trigger('change', true)
        expect(wrapper.emitted().change).toBeTruthy()
        expect(wrapper.emitted().change[0][0]).toBe('gogo')
    })

    test('...wach on checked is OK', async () => {
        const wrapper = factory()
        const spyToggle = jest.spyOn(wrapper.vm, 'toggle');
        const input = wrapper.find('input.a-input.a-input-radio[type="radio"]')

        await wrapper.setProps({ checked: true })

        expect(spyToggle).toHaveBeenCalled()
        expect(wrapper.emitted().change).toBeTruthy()
        expect(input.attributes().checked).toBeTruthy()

        await wrapper.setProps({ checked: false })

        expect(spyToggle).toHaveBeenCalled()
        expect(wrapper.emitted().change).toBeTruthy()
        expect(input.attributes().checked).toBeFalsy()
    })

    // test('...v-model (and shouldBeChecked) correctly used', () => {
    //     const wrapper = mount(AInputRadio, {
    //         propsData: {
    //             name: 'radio-gaga',
    //             value: 'Gogooooo'
    //         }
    //     })

    //     const input = wrapper.find('input.a-input.a-input-radio[type="radio"]')
    //     input.trigger('change', true)
    //     // TODO: Doesn't update this.modelValue, I don't know why...
    // })
})
