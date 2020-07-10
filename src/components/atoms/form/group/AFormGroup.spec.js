import { shallowMount } from '@vue/test-utils'
import AFormGroup from './AFormGroup.vue'

describe('Atom - AFormGroup', () => {
    test(' Renders correctly', () => {
        const wrapper = shallowMount(AFormGroup, {
            propsData: { id: 'name' }
        })
        expect(wrapper.attributes().id).toBe('name')
        expect(wrapper.attributes().class).toContain('form-group')    
    })
})