import { mount } from '@vue/test-utils'
import ALogo from '~/components/atoms/logo/ALogo.vue'

describe('Atom - ALogo', () => {
    test('...has <svg> tag', () => {
        const wrapper = mount(ALogo)
        expect(wrapper.find('svg')).toBeTruthy()
    })
})
