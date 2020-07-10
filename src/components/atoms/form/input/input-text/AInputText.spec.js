import { mount, shallowMount } from '@vue/test-utils'
import AInputText from './AInputText.vue'

describe('Atom - AInputText', () => {
    test('...default has <AInputText> tag', () => {
        const wrapper = mount(AInputText)
        expect(wrapper.find('AInputText')).toBeTruthy()
    })
    test('... text  is required, placeholder is ', () => {
        const wrapper = shallowMount(AInputText, {
            propsData: {
                text: true,
                required: true,
                placeholder: 'Ecrivez ici'
            }
        })
        expect(wrapper.attributes().class).toContain('text')
        expect(wrapper.attributes().required).toBeTruthy()
        expect(wrapper.attributes().placeholder).toMatch('Ecrivez ici')
    })
})
