import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Link from '~/components/atoms/link/Link.vue'

describe('Atom - Link', () => {
    test('...has <a> tag', () => {
        const wrapper = mount(Link)
        expect(wrapper.find('a')).toBeTruthy()
    })

    test('...with href, then an to who pass href at null', () => {
        const wrapper = mount(Link, {
            propsData: { href: 'https://lamacompta.co' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.attributes('title')).toBe(
            "Se rendre à l'adresse https://lamacompta.co"
        )
        expect(wrapper.attributes('href')).toBe('https://lamacompta.co')

        wrapper.setData({
            propsData: { to: 'contact' }
        })

        expect(wrapper.attributes('href')).toBe(null)
    })

    test('...with to', () => {
        const wrapper = shallowMount(Link, {
            propsData: { to: 'contact' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
        expect(wrapper.attributes('title')).toBe('Se rendre à la page contact')
    })

    test('...with mail valid then not valid', () => {
        const wrapper = mount(Link, {
            propsData: {
                href: 'lamavert@lamacompta.co',
                mail: true
            }
        })

        expect(wrapper.attributes('href')).toBe('mailto:lamavert@lamacompta.co')
        expect(wrapper.attributes('title')).toBe(
            'Ecrire un mail à lamavert@lamacompta.co'
        )

        wrapper.setData({
            href: '@lamacompta.co'
        })

        expect(wrapper.attributes('href')).toBe('@lamacompta.co')

        wrapper.setData({
            href: 'lamavertlamacompta.co'
        })

        expect(wrapper.attributes('href')).toBe('lamavertlamacompta.co')

        wrapper.setData({
            href: 'lamavert@.co'
        })

        expect(wrapper.attributes('href')).toBe('@lamavert@.co')

        wrapper.setData({
            href: 'lamavert@lamacomptaco'
        })

        expect(wrapper.attributes('href')).toBe('lamavert@lamacomptaco')

        wrapper.setData({
            href: 'lamavert@lamacompta.'
        })

        expect(wrapper.attributes('href')).toBe('lamavert@lamacompta.')
    })

    test('...with tel valid then not valid', () => {
        const wrapper = shallowMount(Link, {
            propsData: {
                href: '0123456789',
                tel: true
            }
        })

        expect(wrapper.attributes('href')).toBe('tel:0123456789')
        expect(wrapper.attributes('title')).toBe('Appeler le 0123456789')

        wrapper.setData({
            href: '+33123456789'
        })

        expect(wrapper.attributes('href')).toBe('tel:+33123456789')

        wrapper.setData({
            href: '+33 123456789'
        })

        expect(wrapper.attributes('href')).toBe('tel:+33 123456789')

        wrapper.setData({
            href: '01 23 45 67 89'
        })

        expect(wrapper.attributes('href')).toBe('tel:01 23 45 67 89')

        wrapper.setData({
            href: '+33 1 23 45 67 89'
        })

        expect(wrapper.attributes('href')).toBe('tel:+33 1 23 45 67 89')

        wrapper.setData({
            href: '33123456789'
        })

        expect(wrapper.attributes('href')).toBe('33123456789')

        wrapper.setData({
            href: '+33 0123456789'
        })

        expect(wrapper.attributes('href')).toBe('+33 0123456789')
    })

    test('...with rel = next', () => {
        const wrapper = mount(Link, {
            propsData: {
                rel: 'next'
            }
        })

        expect(wrapper.attributes('rel')).toBe('next')
    })

    test('...with external = true', () => {
        const wrapper = mount(Link, {
            propsData: {
                rel: true
            }
        })

        expect(wrapper.attributes('external')).toBe(true)
    })

    test('...with target', () => {
        const wrapper = mount(Link, {
            propsData: {
                href: '#'
            }
        })

        expect(wrapper.attributes('target')).toBe('_blank')

        wrapper.setData({
            target: '_self'
        })

        expect(wrapper.attributes('target')).toBe('_self')

        wrapper.setData({
            to: 'contact'
        })

        expect(wrapper.attributes('target')).toBe(null)
    })
})
