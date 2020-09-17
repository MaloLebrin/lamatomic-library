import { shallowMount } from '@vue/test-utils'
// import AButton from '@/components/atoms/button/AButton.vue'
// import ALink from '@/components/atoms/link/ALink.vue'
// import AListItem from '@/components/atoms/list/AListItem.vue'
import MNavbar from './MNavbar.vue'

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

describe('Molecule - MNavbar', () => {
    test('...as default has nav wrapper, a list component and horizontal props is true', () => {
        const wrapper = shallowMount(MNavbar)

        expect(wrapper.html()).toContain('<nav class="m-navbar"')
        expect(wrapper.html()).toContain('<alist-stub type="ul" withoutchips="true" horizontal="true"')
        expect(wrapper.props().horizontal).toBeTruthy()
    })

    test('...items injected are correctly rendered', () => {

        const wrapper = shallowMount(MNavbar, {
            slots: {
                default: `<li><p>Content col 1</p></li>
                <li><p>Content col 2</p></li>`
            }
        })

        expect(wrapper.html()).toContain('<alist-stub type="ul" withoutchips="true" horizontal="true"')
        expect(wrapper.html()).toContain('<li>')
        expect(wrapper.html()).toContain('<p>Content col 1</p>')
        expect(wrapper.html()).toContain('<p>Content col 2</p>')

    })
})
