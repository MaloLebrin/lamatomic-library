import { mount } from '@vue/test-utils'
import AInputHidden from './AInputHidden.vue'

describe('Atom - AInputHidden', () => {
    test('...default has <input> tag', () => {
        const wrapper = mount(AInputHidden)

        expect(wrapper.find('input.a-input.a-input-checkbox[type="checkbox"]')).toBeTruthy()
    })

    test('...props are correctly setted', () => {
        const wrapper = mount(AInputHidden, {
            propsData: {
                id: 'id-hidden',
                name: 'name-hidden',
                value: 'good hidden value'
            }
        })

        expect(wrapper.attributes().id).toBe('id-hidden')
        expect(wrapper.attributes().name).toBe('name-hidden')
        expect(wrapper.attributes().value).toBe('good hidden value')
    })
})
