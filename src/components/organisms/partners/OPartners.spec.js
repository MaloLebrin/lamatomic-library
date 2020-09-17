import { mount } from '@vue/test-utils'
import { OPartners } from '@/entry'

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
        const wrapper = mount(OPartners, {
            slots: {
                default: `  <MPartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />
                            <MPartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />
`
            }
        })

        expect(wrapper.html()).toContain(
            `<ul class="a-list without-chips horizontal"`
        )
        expect(wrapper.html()).toContain(
            `<mpartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super"`
        )
    })
})
