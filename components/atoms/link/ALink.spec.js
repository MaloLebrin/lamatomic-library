import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import ALink from '~/components/atoms/link/ALink.vue'

describe('Atom - ALink', () => {
    test('...has <a> tag', () => {
        const wrapper = mount(ALink)
        expect(wrapper.html()).toBe(
            '<a class="link underlined underlined--thin"></a>'
        )
    })

    test('...with href, then an to who pass href at null', () => {
        const wrapper = shallowMount(ALink, {
            propsData: {
                href: 'https://lamacompta.co'
            }
        })

        expect(wrapper.attributes('title')).toBe(
            "Se rendre à l'adresse https://lamacompta.co"
        )
        expect(wrapper.attributes('href')).toBe('https://lamacompta.co')
    })

    test('...with to', () => {
        const wrapper = shallowMount(ALink, {
            propsData: { to: 'contact' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
        expect(wrapper.html()).toBe(
            '<a title="Se rendre à la page contact" class="link underlined underlined--thin"></a>'
        )
        expect(wrapper.attributes('title')).toBe('Se rendre à la page contact')

        wrapper.setProps({
            href: 'prout'
        })

        expect(wrapper.vm.computedHref).toBe(null)
    })

    test('...with mail valid then not valid', () => {
        const wrapper = shallowMount(ALink, {
            propsData: {
                href: 'lama@lamacompta.co',
                mail: true
            }
        })

        expect(wrapper.attributes('href')).toBe('mailto:lama@lamacompta.co')
        expect(wrapper.attributes('title')).toBe(
            'Ecrire un mail à lama@lamacompta.co'
        )

        wrapper.setProps({
            href: 'prout'
        })

        expect(wrapper.vm.computedHref).toBe('prout')
    })

    test('...with tel valid then not valid', () => {
        const wrapper = mount(ALink, {
            propsData: {
                'no-line': true
            }
        })

        expect(wrapper.html()).toBe('<a no-line="true" class="link"></a>')
    })

    test('...with tel valid then not valid', () => {
        const wrapper = mount(ALink, {
            propsData: {
                href: '0123456789',
                tel: true
            }
        })

        expect(wrapper.attributes('href')).toBe('tel:0123456789')
        expect(wrapper.attributes('title')).toBe('Appeler le 0123456789')

        wrapper.setProps({
            href: '+33123456789'
        })

        expect(wrapper.vm.computedHref).toBe('tel:+33123456789')

        wrapper.setProps({
            href: '+33 123456789'
        })

        expect(wrapper.vm.computedHref).toBe('tel:+33 123456789')

        wrapper.setProps({
            href: '01 23 45 67 89'
        })

        expect(wrapper.vm.computedHref).toBe('tel:01 23 45 67 89')

        wrapper.setProps({
            href: '+33 1 23 45 67 89'
        })

        expect(wrapper.vm.computedHref).toBe('tel:+33 1 23 45 67 89')

        wrapper.setProps({
            href: '33123456789'
        })

        expect(wrapper.vm.computedHref).toBe('33123456789')

        wrapper.setProps({
            href: '+33 0123456789'
        })

        expect(wrapper.vm.computedHref).toBe('+33 0123456789')
    })

    test('...with rel = next', () => {
        const wrapper = mount(ALink, {
            propsData: {
                rel: 'next'
            }
        })

        expect(wrapper.attributes('rel')).toBe('next')
    })

    test('...with external = true', () => {
        const wrapper = mount(ALink, {
            propsData: {
                external: true
            }
        })

        expect(wrapper.attributes('external')).toBe('true')
    })

    test('...with target', () => {
        const wrapper = shallowMount(ALink, {
            propsData: {
                href: '#'
            },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.vm.computedTarget).toBe('_blank')

        wrapper.setProps({
            target: '_self'
        })

        expect(wrapper.vm.computedTarget).toBe('_self')

        wrapper.setProps({
            to: 'contact'
        })

        expect(wrapper.vm.computedTarget).toBe(null)
    })
})
