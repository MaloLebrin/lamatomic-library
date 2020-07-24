import { mount } from '@vue/test-utils'
import MNavbar from './MNavbar.vue'
import AButton from '@/components/atoms/button/AButton.vue'
import ALink from '@/components/atoms/link/ALink.vue'
import { getMountedComponent } from '@/utils'

describe('Molecule - MNavbar', () => {
    test('...as default has nav wrapper, a list component and horizontal props is true', () => {
        const wrapper = mount(MNavbar)

        expect(wrapper.html()).toContain('<nav class="m-navbar"')
        expect(wrapper.html()).toContain('<ul class="a-list without-chips horizontal">')
        expect(wrapper.props().horizontal).toBeTruthy()
    })

    test('...items injected are correctly rendered', () => {
        const link1 = getMountedComponent(
            ALink,
            { href: 'https://bananas.com/' },
            { default: 'Super lien' }
        )
        const btn1 = getMountedComponent(
            AButton,
            { state: 'success' },
            { default: 'Ohohoh' }
        )
        const btn2 = getMountedComponent(
            AButton,
            { state: 'error' },
            { default: 'Yes!' }
        )

        const items = [link1, btn1, btn2]

        const wrapper = mount(MNavbar, {
            propsData: {
                items,
                horizontal: false
            }
        })

        expect(wrapper.props().horizontal).toBeFalsy()
        expect(wrapper.html()).toContain('<ul class="a-list without-chips">')
        expect(wrapper.html()).toContain('<li class="a-list-item"')
        expect(wrapper.html()).toContain('href="https://bananas.com/')
        expect(wrapper.html()).toContain('<a ')
        expect(wrapper.html()).toContain('Super lien')
        expect(wrapper.html()).toContain('<button ')
        expect(wrapper.html()).toContain('Ohohoh')
        expect(wrapper.html()).toContain('Yes!')
    })
})
