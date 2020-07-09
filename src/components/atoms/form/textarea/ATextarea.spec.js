import { mount, shallowMount } from '@vue/test-utils'
import ATextarea from './ATextarea.vue'

describe('Atom - ATextarea', () => {
    test('...default has <ATextarea> tag', () => {
        const wrapper = mount(ATextarea)
        expect(wrapper.find('ATextarea')).toBeTruthy()
    })
    test('... text area is required, placeholder is ', () => {
        const wrapper = shallowMount(ATextarea, {
            propsData: {
                required: true,
                placeholder: 'Ecrivez ici'
            }
        })
        expect(wrapper.attributes().required).toBeTruthy()
        expect(wrapper.attributes().placeholder).toMatch('Ecrivez ici')
    })
})
