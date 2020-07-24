import { shallowMount } from '@vue/test-utils'
import MLogo from './MLogo.vue'

describe('Molecule - MLogo', () => {
    test('...has <alink> component and logo class', () => {
        const wrapper = shallowMount(MLogo)

        expect(wrapper.html()).toContain(`<alink`)

        expect(wrapper.html()).toContain(`<aimage`)

        expect(wrapper.html()).toContain(`class="m-logo"`)
    })
})
