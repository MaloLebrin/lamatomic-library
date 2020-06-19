import { mount } from '@vue/test-utils'
import MLogo from './MLogo.vue'

describe('Atom - MLogo', () => {
    test('...has <svg> tag', () => {
        const wrapper = mount(MLogo)
        expect(wrapper.find('svg')).toBeTruthy()
    })
})
