import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import ALink from './ALink.vue'

describe('Atom - ALink', () => {
    test('...has <a> tag', () => {
        const wrapper = mount(ALink)
        expect(wrapper.html()).toBe(
            '<a class="a-link underlined underlined--thin"></a>'
        )
    })

    // /////// Props tests /////// //
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
            propsData: { to: 'contact' }
        })

        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
        expect(wrapper.html()).toBe(
            '<a to="contact" title="Se rendre à la page contact" class="a-link underlined underlined--thin"></a>'
        )
        expect(wrapper.attributes('title')).toBe('Se rendre à la page contact')

        wrapper.setProps({
            href: 'prout'
        })

        expect(wrapper.vm.computedHref).toBe(null)
    })

    test('...with external = true', () => {
        const wrapper = mount(ALink, {
            propsData: {
                external: true
            }
        })

        expect(wrapper.html()).toBe('<a class="a-link external underlined underlined--thin"></a>')
    })

test('...without "underlined" class when "no-line" prop is true', () => {
        const wrapper = mount(ALink, {
            propsData: {
                'no-line': true
            }
        })

        expect(wrapper.html()).toBe('<a class="a-link"></a>')
    })

    // /////// Functions tests /////// //
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
                href: '0123456789',
                tel: true
            }
        })

        expect(wrapper.attributes('href')).toBe('tel:0123456789')
        expect(wrapper.attributes('title')).toBe('Appeler le 0123456789')

        wrapper.setProps({
            href: '+3312345'
        })

        expect(wrapper.vm.computedHref).toBe('+3312345')
    })

    test('...with rel = next', () => {
        const wrapper = mount(ALink, {
            propsData: {
                rel: 'next'
            }
        })

        expect(wrapper.attributes('rel')).toBe('next')
    })

    test('...with target', () => {
        const wrapper = shallowMount(ALink, {
            propsData: {
                href: '#'
            }
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
