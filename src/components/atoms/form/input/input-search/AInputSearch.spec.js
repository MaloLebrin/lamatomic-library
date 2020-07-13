import { mount, shallowMount } from '@vue/test-utils'
import AInputSearch from './AInputSearch.vue'

describe('Atom - AInputSearch', () => {
    test('...default has <AInputSearch> tag', () => {
        const wrapper = mount(AInputSearch)
        expect(wrapper.find('AInputSearch')).toBeTruthy()
    })
    test('... Search  is required, placeholder is ', () => {
        const wrapper = shallowMount(AInputSearch, {
            propsData: {
                search: true,
                required: true,
                placeholder: 'Ecrivez ici'
            }
        })
        expect(wrapper.attributes().class).toContain('search')
        expect(wrapper.attributes().required).toBeTruthy()
        expect(wrapper.attributes().placeholder).toMatch('Ecrivez ici')
    })
})
