import { shallowMount } from '@vue/test-utils'
import MBadge from './MBadge.vue'

describe('Molecule - MBadge', () => {

    test('...has Atext & aimage component and badge class', () => {
        const wrapper = shallowMount (MBadge)
        expect(wrapper.html()).toContain('<atext')
        expect(wrapper.html()).toContain('<aimage')
        expect(wrapper.html()).toContain('<div class="m-badge">')
    })
})
