import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import AButton from './AButton.vue'

describe('Atom - AButton', () => {
    test('...default has <button> tag', () => {
        const wrapper = mount(AButton)

        expect(wrapper.html()).toBe('<button class="a-button"></button>')
    })

    test('...with custom tag', () => {
        const wrapper = mount(AButton, {
            propsData: { customTag: 'div' }
        })

        expect(wrapper.html()).toBe('<div class="a-button"></div>')
    })

    test('...tag should be <a> if href is available', () => {
        const wrapper = mount(AButton, {
            propsData: { href: 'https://lamacompta.co' }
        })

        expect(wrapper.html()).toContain('</a>')
        expect(wrapper.attributes().href).toBe('https://lamacompta.co')
        expect(wrapper.attributes('title')).toBe(
            "Se rendre à l'adresse https://lamacompta.co"
        )
    })

    test('...tag should be <a> if "to" prop is available', () => {
        const wrapper = shallowMount(AButton, {
            propsData: { to: 'contact' }
        })

        expect(wrapper.find('a')).toBeTruthy()
        expect(wrapper.html()).toContain('</a>')
        expect(wrapper.vm.computedTitle).toBe('Se rendre à la page contact')
        expect(wrapper.findComponent(RouterLinkStub)).toBeTruthy()
    })

    test('...with id', () => {
        const wrapper = mount(AButton, {
            propsData: { id: 'LamaId' }
        })

        expect(wrapper.attributes().id).toBe('LamaId')
    })

    test('...target with herf, then with target, then with to', () => {
        const wrapper = shallowMount(AButton, {
            propsData: { href: '#' }
        })

        expect(wrapper.attributes().target).toBe('_blank')

        wrapper.setProps({
            target: '_self'
        })

        expect(wrapper.vm.computedTarget).toBe('_self')

        wrapper.setProps({
            to: 'contact'
        })

        expect(wrapper.vm.computedTarget).toBe(null)
    })

    test('...renders the correct classes based on props passed', () => {
        const wrapper = mount(AButton, {
            propsData: {
                disabled: true
            }
        })

        expect(wrapper.attributes().class).toContain('disabled')
    })

    test('...with light and success', () => {
        const wrapper = mount(AButton, {
            propsData: {
                state: 'success',
                styles: 'light'
            }
        })

        expect(wrapper.attributes().class).toContain('success')
        expect(wrapper.attributes().class).toContain('light')
    })

    test('...with dark and warning', () => {
        const wrapper = mount(AButton, {
            propsData: {
                state: 'warning',
                styles: 'dark'
            }
        })

        expect(wrapper.attributes().class).toContain('warning')
        expect(wrapper.attributes().class).toContain('dark')
    })

    test('...with error', () => {
        const wrapper = mount(AButton, {
            propsData: {
                state: 'error'
            }
        })

        expect(wrapper.attributes().class).toContain('error')
    })

    test('...with type submit, title change', () => {
        const wrapper = mount(AButton, {
            propsData: {
                type: 'submit'
            }
        })

        expect(wrapper.attributes('type')).toBe('submit')
        expect(wrapper.attributes('title')).toBe('Envoyer le formulaire')
    })

    test('...renders slots', () => {
        const wrapper = mount(AButton, {
            slots: {
                default: 'Choux de Bruxelles'
            }
        })

        expect(wrapper.text()).toContain('Choux de Bruxelles')
    })

    test('...emits click event', () => {
        const wrapper = mount(AButton)
        wrapper.find('button').trigger('click')

        expect(wrapper.emitted().click).toBeTruthy()
        expect(wrapper.emitted().click.length).toBe(1)
    })

    test("...type not in [button, reset, submit] doesn't work", () => {
        const wrapper = mount(AButton)
        const type = wrapper.vm.$options.props.type

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('button')).toBeTruthy()
        expect(type.validator('reset')).toBeTruthy()
        expect(type.validator('submit')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })

    test("...target not in [_blank, _self, _top] doesn't work", () => {
        const wrapper = mount(AButton)
        const target = wrapper.vm.$options.props.target

        expect(target.validator).toBeInstanceOf(Function)
        expect(target.validator('_blank')).toBeTruthy()
        expect(target.validator('_self')).toBeTruthy()
        expect(target.validator('_top')).toBeTruthy()
        expect(target.validator('banana')).toBeFalsy()
        expect(target.validator(8)).toBeFalsy()
    })

    test("...state not in [success, warning, error] doesn't work", () => {
        const wrapper = mount(AButton)
        const state = wrapper.vm.$options.props.state

        expect(state.validator).toBeInstanceOf(Function)
        expect(state.validator('success')).toBeTruthy()
        expect(state.validator('warning')).toBeTruthy()
        expect(state.validator('error')).toBeTruthy()
        expect(state.validator('banana')).toBeFalsy()
        expect(state.validator(8)).toBeFalsy()
    })

    test("...styles not in [light, dark] doesn't work", () => {
        const wrapper = mount(AButton)
        const styles = wrapper.vm.$options.props.styles

        expect(styles.validator).toBeInstanceOf(Function)
        expect(styles.validator('light')).toBeTruthy()
        expect(styles.validator('dark')).toBeTruthy()
        expect(styles.validator('banana')).toBeFalsy()
        expect(styles.validator(8)).toBeFalsy()
    })
})
