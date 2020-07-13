import { shallowMount } from '@vue/test-utils'
import MSocialButton from './MSocialButton.vue'

describe('Molecule - MSocialButton', () => {
    let stubs

    beforeEach(() => {
        stubs = {
            AImage: { template: '<div></div>' }
        }
    })

    test('...default has <button> tag', () => {
        const wrapper = shallowMount(MSocialButton, { stubs })

        expect(wrapper.html()).toContain(`<abutton-stub`)

        expect(wrapper.html()).toContain(`title="Accéder à la page "`)

        expect(wrapper.html()).toContain(`class="m-social-button"`)
    })

    test("...type not in [new, facebook, instagram, linkedin, twitter] doesn't work", () => {
        const wrapper = shallowMount(MSocialButton, { stubs })
        const type = wrapper.vm.$options.props.type

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('new')).toBeTruthy()
        expect(type.validator('facebook')).toBeTruthy()
        expect(type.validator('instagram')).toBeTruthy()
        expect(type.validator('linkedin')).toBeTruthy()
        expect(type.validator('twitter')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })

    test('...default has <button> tag', () => {
        const wrapper = shallowMount(MSocialButton, {
            stubs,
            propsData: {
                type: 'facebook'
            }
        })

        expect(wrapper.html()).toContain(`title="Accéder à la page facebook"`)
    })
})
