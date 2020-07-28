import { mount } from '@vue/test-utils'
import AInputPassword from './AInputPassword.vue'

let stubs

beforeEach(() => {
    stubs = {
        AImage: { template: '<div></div>' }
    }
})

const factory = () => {
    return mount(AInputPassword, {
        data() {
            return { password: 'A!def9fjg%' }
        },
        stubs
    })
}

describe('Atom - AInputPassword', () => {
    test('...has <input> tag', () => {
        const wrapper = factory()

        expect(wrapper.html()).toContain('<div class="a-input-password-wrapper">')
        expect(wrapper.find('input.a-input.a-input-password[type="password"]')).toBeTruthy()
    })

    test('...regex check correctly the given password', () => {
        const wrapper = factory()

        const regexPassword = wrapper.vm.REGEX_PASSWORD

        expect(wrapper.vm.password).toMatch(regexPassword)

        wrapper.setData({ password: 'A!deffjg' })

        expect(wrapper.vm.password).not.toMatch(regexPassword)
    })

    test('...password pass the checkPassword function and correctly populate "isPasswordValid" data', () => {
        const wrapper = factory()
        expect(wrapper.vm.isPasswordValid).toBeTruthy()

        wrapper.vm.password = 'fsffffff'

        expect(wrapper.vm.isPasswordValid).toBeFalsy()
    })

    test('...check hidePassword is correctly used and passwordType is correclty populated', () => {
        const wrapper = factory()

        expect(wrapper.vm.hidePassword).toBeTruthy()
        expect(wrapper.vm.passwordType).toContain('password')

        wrapper.vm.hidePassword = false

        expect(wrapper.vm.passwordType).toContain('text')
    })
})
