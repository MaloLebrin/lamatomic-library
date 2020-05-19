import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Link from '~/components/atoms/link/Link.vue'

describe('Atom - Link', () => {
    test('...has <a> tag', () => {
        const wrapper = mount(Link)
        expect(wrapper.find('a')).toBeTruthy()
    })

    test('...with href', () => {
        const wrapper = mount(Link, {
            propsData: { href: 'https://lamacompta.co' }
        })

        expect(wrapper.attributes('title')).toBe(
            "Se rendre à l'adresse https://lamacompta.co"
        )
    })

    test('...with to', () => {
        const wrapper = shallowMount(Link, {
            propsData: { to: 'contact' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
        expect(wrapper.attributes('title')).toBe('Se rendre à la page contact')
    })
})
