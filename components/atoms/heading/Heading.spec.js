import { mount } from '@vue/test-utils'
import Heading from '~/components/atoms/heading/Heading.vue'

describe('Atom - Heading', () => {
    test('...Heading par default est h2', () => {
        const wrapper = mount(Heading)
        expect(wrapper.find('h2')).toBeTruthy()
    })

    test('... h>6', () => {
        const wrapper = mount(Heading, {
            propsData: { level: 7 }
        })
        expect(wrapper.attributes('level')).toBe('2')
    })
})
