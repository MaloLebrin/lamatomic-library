import { mount } from '@vue/test-utils'
import AInputEmail from './AInputEmail.vue'

const factory = () => {
    return mount(AInputEmail, {
        data() {
            return {
                email: 'lama@lamacompta.co'
            }
        }
    })
}

describe('Atom - AInputEmail', () => {
    test('...has <input> tag', () => {
        const wrapper = factory()

        expect(wrapper.html()).toContain('<div class="a-input-email-wrapper">')
        expect(wrapper.find('input.a-input-email')).toBeTruthy()
    })

    test('...regex check correctly the given email', () => {
        const wrapper = factory()

        const regexMail = wrapper.vm.REGEX_MAIL

        expect(wrapper.vm.email).toMatch(regexMail)

        wrapper.setData({
            email: '@lamacompta.co'
        })

        expect(wrapper.vm.email).not.toMatch(regexMail)
    })

    test('...email pass the checkEmail function and correctly populate "isEmailValid" data', () => {
        const wrapper = factory()

        expect(wrapper.vm.isEmailValid).toBeTruthy()

        wrapper.vm.email = "Ceci n'est pas un email, ni une banane d'ailleurs"

        expect(wrapper.vm.isEmailValid).toBeFalsy()
    })
})
