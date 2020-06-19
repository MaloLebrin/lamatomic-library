import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import AButton from './AButton.vue'

describe('Atom - AButton', () => {
    test('...default has <AButton> tag', () => {
        const wrapper = mount(AButton)
        expect(wrapper.find('AButton')).toBeTruthy()
    })

    test('...tag should be <a> if href is available', () => {
        const wrapper = mount(AButton, {
            propsData: { href: 'https://lamacompta.co' }
        })

        expect(wrapper.find('a')).toBeTruthy()
        expect(wrapper.attributes().href).toBe('https://lamacompta.co')
    })

    test('...tag should be <nuxt-link> if "to" prop is available', () => {
        const wrapper = shallowMount(AButton, {
            propsData: { to: 'contact' },
            stubs: { NuxtLink: RouterLinkStub }
        })

        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
        expect(wrapper.attributes('title')).toBe('Se rendre à la page contact')
    })

    test('Renders the correct classes based on props passed', () => {
        const wrapper = mount(AButton, {
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
        const wrapper = mount(AButton, {
            slots: {
                default: 'Choux de Bruxelles'
            }
        })

        expect(wrapper.text()).toContain('Choux de Bruxelles')
    })

    test('Emits click event', () => {
        const wrapper = mount(AButton)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted().click).toBeTruthy()
        expect(wrapper.emitted().click.length).toBe(1)
    })
})
