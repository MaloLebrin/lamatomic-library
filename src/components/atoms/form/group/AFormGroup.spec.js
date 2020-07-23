import { shallowMount } from '@vue/test-utils'
import AFormGroup from './AFormGroup.vue'

describe('Atom - AFormGroup', () => {
    test(' Renders correctly', () => {
        const wrapper = shallowMount(AFormGroup)

        expect(wrapper.attributes().class).toContain('a-form-group')
        expect(wrapper.html()).toContain('alabel-stub')

    })
})
