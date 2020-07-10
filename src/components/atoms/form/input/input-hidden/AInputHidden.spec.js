import { shallowMount } from '@vue/test-utils'
import AInputHidden from './AInputHidden.vue'

describe('Atom - AInputHidden', () => {
    test('...default has <AInputHidden> tag', () => {
        const wrapper = shallowMount(AInputHidden)
        expect(wrapper.find('AInputHidden')).toBeTruthy()
    })
    test('Renders the correct classes based on props passed', () => {
        const wrapper = shallowMount(AInputHidden, {
            propsData: {
                hidden: true,
                value: 'Catcat1',
                required: false
            }
        })
        expect(wrapper.attributes().hidden).toBeTruthy()
        expect(wrapper.attributes().value).toBe('Catcat1')
        expect(wrapper.attributes().required).toBeFalsy()

    })
})
