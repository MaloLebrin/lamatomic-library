import { mount } from '@vue/test-utils'
import List from '~/components/atoms/list/List.vue'

describe('Atom - List', () => {
    test('...default has <ul> tag', () => {
        const wrapper = mount(List)
        expect(wrapper.find('ul')).toBeTruthy()
    })

    test('...tag should be <ol> if type is ol', () => {
        const wrapper = mount(List, {
            propsData: { type: 'ol' }
        })

        expect(wrapper.find('ol')).toBeTruthy()
    })

    test('...list has items', () => {
        const wrapper = mount(List, {
            propsData: { items: ['ohoh', 'héhé', 'hihi'] }
        })

        expect(wrapper.find('ol')).toBeTruthy()
        expect(wrapper.html()).toContain('<li>ohoh</li>')
        expect(wrapper.html()).toContain('<li>héhé</li>')
        expect(wrapper.html()).toContain('<li>hihi</li>')
    })
    test('Renders the correct classes based on props passed', () => {
        const wrapper = mount(List, {
            propsData: {
                withoutChips: true,
                horizontal: true
            }
        })
        expect(wrapper.attributes().class).toContain('withoutChips')
        expect(wrapper.attributes().class).toContain('horizontal')
    })
})
