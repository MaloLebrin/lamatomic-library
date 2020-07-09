import { mount, shallowMount } from '@vue/test-utils'
import AInputRadio from './AInputRadio.vue'

describe('Atom - AInputRadio', () => {
    test('...default has <AInputRadio> tag', () => {
        const wrapper = mount(AInputRadio)
        expect(wrapper.find('AInputRadio')).toBeTruthy()
    })
    test('... Radio  is required, placeholder is ', () => {
        const wrapper = shallowMount(AInputRadio, {
            propsData: {
                radio: true
            }
        })
        expect(wrapper.attributes().class).toContain('radio')
    })
})
