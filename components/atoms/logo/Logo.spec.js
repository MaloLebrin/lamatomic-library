import { mount } from '@vue/test-utils'
import Logo from '~/components/atoms/logo/Logo.vue'

describe('Atom - Logo', () => {
    test('...has <svg> tag', () => {
        const wrapper = mount(Logo)
        expect(wrapper.find('svg')).toBeTruthy()
    })
})
