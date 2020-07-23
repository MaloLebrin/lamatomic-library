import { mount } from '@vue/test-utils'
import AList from './AList.vue'

describe('Atom - AList', () => {
    test('...default has <ul> tag', () => {
        const wrapper = mount(AList)
        expect(wrapper.find('ul')).toBeTruthy()
    })

    test('...tag should be <ol> if type is ol', () => {
        const wrapper = mount(AList, {
            propsData: { type: 'ol' }
        })

        expect(wrapper.find('ol')).toBeTruthy()
    })

    test('...list has items', () => {
        const wrapper = mount(AList, {
            propsData: { items: ['ohoh', 'héhé', 'hihi'] }
        })

        expect(wrapper.find('ol')).toBeTruthy()
        expect(wrapper.html()).toContain('<li class="list-item">ohoh</li>')
        expect(wrapper.html()).toContain('<li class="list-item">héhé</li>')
        expect(wrapper.html()).toContain('<li class="list-item">hihi</li>')
    })

    test('...renders the correct classes based on props passed', () => {
        const wrapper = mount(AList, {
            propsData: {
                withoutChips: true,
                horizontal: true,
                noPadding: true
            }
        })

        expect(wrapper.attributes().class).toContain('without-chips')
        expect(wrapper.attributes().class).toContain('horizontal')
        expect(wrapper.attributes().class).toContain('no-padding')
    })
})
