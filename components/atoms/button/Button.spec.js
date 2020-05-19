import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Button from '~/components/atoms/button/Button.vue'

describe('Atom - Button', () => {
    test('...default has <button> tag', () => {
        const wrapper = mount(Button)
        expect(wrapper.find('button')).toBeTruthy()
    })

    test('...tag should be <a> if href is available', () => {
        const wrapper = mount(Button, {
            propsData: { href: 'https://lamacompta.co' }
        })

        expect(wrapper.find('a')).toBeTruthy()
        expect(wrapper.attributes().href).toBe('https://lamacompta.co')
    })

    test('...tag should be <nuxt-link> if "to" prop is available', () => {
        const wrapper = shallowMount(Button, {
            propsData: { to: 'contact' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
        expect(wrapper.attributes('title')).toBe('Se rendre à la page contact')
    })

    test('Renders the correct classes based on props passed', () => {
        const wrapper = mount(Button, {
            propsData: {
                success: true,
                warning: true,
                error: true,
                disabled: true,
                white: true,
                black: true
            }
        })

        expect(wrapper.attributes().class).toContain('success')
        expect(wrapper.attributes().class).toContain('warning')
        expect(wrapper.attributes().class).toContain('error')
        expect(wrapper.attributes().class).toContain('disabled')
        expect(wrapper.attributes().class).toContain('white')
        expect(wrapper.attributes().class).toContain('black')
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
})
