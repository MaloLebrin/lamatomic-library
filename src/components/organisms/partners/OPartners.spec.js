import { mount } from '@vue/test-utils'
import { OPartners, MPartner } from '@/entry'
import { getMountedComponent } from '@/utils'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
})

describe('Organism - OPartners', () => {
    test('...as default', () => {
        const wrapper = mount(OPartners)

        expect(wrapper.html()).toContain(`<div class="o-partners">`)
    })

    test('...OPartners contains MPartner', () => {
        const img1 = getMountedComponent(MPartner, { src:'https://placehold.it/350x150' }, { title: 'Bge'})
        const img2 = getMountedComponent(MPartner, { src:'https://placehold.it/400x150' }, { title: 'france active 🍌'})

        const items = [img1, img2]

        const wrapper = mount(OPartners, {
            propsData: {
                items,
            }
        })

        expect(wrapper.html()).toContain(
            `<li class="list-item"><a title="Partner's logo" class="link m-partner"><img src="https://placehold.it/350x150" alt="Partner's logo" class="image img-partner"></a></li>`
        )
    })
})
