import { mount, shallowMount } from '@vue/test-utils'
import AInputCheckbox from './AInputCheckbox.vue'

describe('Atom - AInputCheckbox', () => {
    test('...default has <AInputCheckbox> tag', () => {
        const wrapper = mount(AInputCheckbox)
        expect(wrapper.find('AInputCheckbox')).toBeTruthy()
    })
    test('... Checkbox  is required, placeholder is ', () => {
        const wrapper = shallowMount(AInputCheckbox, {
            propsData: {
                required: true
            }
        })
        expect(wrapper.attributes().class).toContain('checkbox')
    })
})
