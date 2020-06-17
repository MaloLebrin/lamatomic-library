import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Button from '~/components/atoms/button/Button.vue'

describe('Atom - Button', () => {
    test('...default has <button> tag', () => {
        const wrapper = mount(Button)
        expect(wrapper.html()).toBe(
            '<button state="default" styles="default" class="button"></button>'
        )
    })

    test('...tag should be <a> if href is available and title for href', () => {
        const wrapper = mount(Button, {
            propsData: { href: 'https://lamacompta.co' }
        })

        expect(wrapper.html()).toContain('a')
        expect(wrapper.attributes().href).toBe('https://lamacompta.co')
        expect(wrapper.attributes('title')).toBe(
            "Se rendre à l'adresse https://lamacompta.co"
        )
    })

    test('...tag should be <nuxt-link> if "to" prop is available', () => {
        const wrapper = shallowMount(Button, {
            propsData: { to: 'contact' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.find('nuxt-link')).toBeTruthy()
        expect(wrapper.html()).toContain('a')
        expect(wrapper.vm.computedTitle).toBe('Se rendre à la page contact')
        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
    })

    test('...with id', () => {
        const wrapper = mount(Button, {
            propsData: { id: 'Lamaid' }
        })

        expect(wrapper.attributes('id')).toBe('Lamaid')
    })

    test('...target with herf, then with target, then with to', () => {
        const wrapper = shallowMount(Button, {
            propsData: { href: '#' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.attributes('target')).toBe('_blank')

        wrapper.setProps({
            target: '_self'
        })

        expect(wrapper.vm.computedTarget).toBe('_self')

        wrapper.setProps({
            to: 'contact'
        })

        expect(wrapper.vm.computedTarget).toBe(null)
    })

    test('...disabled and default state and styles', () => {
        const wrapper = mount(Button, {
            propsData: {
                disabled: true,
                state: 'default',
                styles: 'default'
            }
        })

        expect(wrapper.attributes().class).not.toContain('default')
        expect(wrapper.attributes().class).toContain('disabled')
    })

    test('...with white and success', () => {
        const wrapper = mount(Button, {
            propsData: {
                state: 'success',
                styles: 'white'
            }
        })

        expect(wrapper.attributes().class).toContain('success')
        expect(wrapper.attributes().class).toContain('white')
    })

    test('...with black and warning', () => {
        const wrapper = mount(Button, {
            propsData: {
                state: 'warning',
                styles: 'black'
            }
        })

        expect(wrapper.attributes().class).toContain('warning')
        expect(wrapper.attributes().class).toContain('black')
    })

    test('...with error', () => {
        const wrapper = mount(Button, {
            propsData: {
                state: 'error'
            }
        })

        expect(wrapper.attributes().class).toContain('error')
    })

    test('...with type submit, title change', () => {
        const wrapper = mount(Button, {
            propsData: {
                type: 'submit'
            }
        })

        expect(wrapper.attributes('type')).toBe('submit')
        expect(wrapper.attributes('title')).toBe('Validate formulaire')
    })

    test('Renders slots', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'Choux de Bruxelles'
            }
        })

        expect(wrapper.text()).toContain('Choux de Bruxelles')
    })

    test('Emits click event', () => {
        const wrapper = mount(Button)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted().click).toBeTruthy()
        expect(wrapper.emitted().click.length).toBe(1)
    })

    test('test state validator with false value', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                state: 'coconut'
            }
        })

        expect(wrapper.attributes('state')).toBe('default')
    })
})
