import { mount } from '@vue/test-utils'
import AInputSearch from './AInputSearch.vue'

describe('Atom - AInputSearch', () => {
    test('...default has <input> tag', () => {
        const wrapper = mount(AInputSearch)
        const input = wrapper.find('input.a-input.a-input-search[type="search"]')

        expect(input).toBeTruthy()
    })

    test('...given props are correctly used', () => {
        const wrapper = mount(AInputSearch, {
            propsData: {
                placeholder: 'Votre recherche fruitée'
            }
        })

        expect(wrapper.attributes().placeholder).toBe('Votre recherche fruitée')
    })
})
