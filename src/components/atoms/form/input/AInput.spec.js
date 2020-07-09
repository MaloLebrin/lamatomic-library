import { shallowMount } from '@vue/test-utils'
import AInput from './AInput.vue'

describe('Atom - AInput', () => {
    test('...default has <AInput> tag', () => {
        const wrapper = shallowMount(AInput)
        expect(wrapper.find('AInput')).toBeTruthy()
    })
    test('.... pros are string', () => {
        const wrapper = shallowMount(AInput, {
            propsData: {
                type: 'type',
                placeholder: 'placeholder',
                id: 'id'
            }
        })
        expect(wrapper.attributes().type).toBe('type')
        expect(wrapper.attributes().placeholder).toBe('placeholder')
        expect(wrapper.attributes().id).toBe('id')
    })
})
