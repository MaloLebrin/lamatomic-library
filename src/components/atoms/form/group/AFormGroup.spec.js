import { shallowMount } from '@vue/test-utils'
import AFormGroup from './AFormGroup.vue'

describe('Atom - AFormGroup', () => {
    test(' Renders correctly', () => {
        const wrapper = shallowMount(AFormGroup)

        expect(wrapper.attributes().class).toContain('a-form-group')
        expect(wrapper.html()).toContain('alabel-stub')

    })
    test('renders a * if the label is required', () => {
        const wrapper = shallowMount(AFormGroup, {
            propsData: {
                required: true
            },
            slots: {
                default: 'Full Name'
            }
        })

        expect(wrapper.html()).toContain(`<span class="required-indicator">*</span>`)
    })

})
