import { shallowMount } from '@vue/test-utils'
import AInputPassword from './AInputPassword.vue'

const factory = () => {
    return shallowMount(AInputPassword, {
        data() {
            return { password: 'A!def9fjg' }
        }
    })
}

describe('Atom - AInputPassword', () => {
    test('...has <input> tag', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('<input')
    })
    test('... has valid or not Password', () => {
        const wrapper = factory()

        const regexPassword = wrapper.vm.REGEX_PASSWORD

        expect(wrapper.vm.password).toMatch(regexPassword)

        wrapper.setData({ password: 'A!deffjg' })

        expect(wrapper.vm.password).not.toMatch(regexPassword)
    })
    test('... password pass the validPassword', () => {
        const wrapper = factory()
        expect(wrapper.vm.passwordValid).toBe(false)
        wrapper.vm.password = 'A!deff9jg'
        wrapper.vm.validPassword()
        expect(wrapper.vm.passwordValid).toBe(true)
    })

    test('...password fail the validPassword', () => {
        const wrapper = factory()
        expect(wrapper.vm.passwordValid).toBe(false)
        wrapper.vm.password = 'fsffffff'
        wrapper.vm.validPassword()
        expect(wrapper.vm.passwordValid).toBe(false)
    })
    test('... hidePassword pass or not ', () => {
        const wrapper = factory()
        expect(wrapper.vm.hidePassword).toBeTruthy()
        wrapper.vm.hidePassword = true

        expect(wrapper.vm.passwordType).toContain('password')
        wrapper.vm.hidePassword = false
        expect(wrapper.vm.passwordType).toContain('text')


    })
})
