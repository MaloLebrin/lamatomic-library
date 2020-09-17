import { mount } from '@vue/test-utils'
import AList from './AList.vue'
import AListItem from './AListItem.vue'

describe('Atom - AList', () => {
    test('...default has <ul> tag', () => {
        const wrapper = mount(AList)
        expect(wrapper.find('ul')).toBeTruthy()
        expect(wrapper.html()).toContain(' class="a-list')
    })

    test('...tag should be <ol> if type is ol', () => {
        const wrapper = mount(AList, {
            propsData: { type: 'ol' }
        })

        expect(wrapper.find('ol')).toBeTruthy()
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

describe('Atom -AListItem', () => {
    test('...default has <li>', () => {
        const wrapper = mount(AListItem)
        expect(wrapper.find('li')).toBeTruthy()
    })
})
