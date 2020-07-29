import { mount } from '@vue/test-utils'
import AInputText from './AInputText.vue'

describe('Atom - AInputText', () => {
    test('...default has <input> tag', () => {
        const wrapper = mount(AInputText)

        expect(wrapper.find('input.a-input.a-input-text')).toBeTruthy()
    })

    test('...props are correctly used', async () => {
        const wrapper = mount(AInputText, {
            propsData: {
                placeholder: 'Ecrivez votre superbe texte ici',
            }
        })

        expect(wrapper.attributes().placeholder).toBe(
            'Ecrivez votre superbe texte ici'
        )
        expect(wrapper.attributes().contenteditable).toBe('true')

        await wrapper.setProps({
            editable: false
        })

        expect(wrapper.attributes().contenteditable).toBe('false')
    })
})
