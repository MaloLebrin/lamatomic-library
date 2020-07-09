import { shallowMount } from '@vue/test-utils'
import AInputMail from './AInputMail.vue'

const factory = () => {
    return shallowMount(AInputMail, {
        data() {
            return {
                mail: 'lama@lamacompta.co'
            }
        }
    })
}

describe('Atom - AInputMail', () => {
    test('...has <input> tag', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('<input')
    })
    test('...has valid or not email', () => {
        const wrapper = factory()

        const regexMail = wrapper.vm.REGEX_MAIL

        expect(wrapper.vm.mail).toMatch(regexMail)

        wrapper.setData({
            mail: '@lamacompta.co'
        })

        expect(wrapper.vm.mail).not.toMatch(regexMail)
    })

    test('... mail pass the validMail', () => {
        const wrapper = factory()
        expect(wrapper.vm.mailValid).toBe(false)
        wrapper.vm.mail = 'toto@lamacompta.co'
        wrapper.vm.validMail()
        expect(wrapper.vm.mailValid).toBe(true)
    })

    test('... mail fail the validMail', () => {
        const wrapper = factory()
        expect(wrapper.vm.mailValid).toBe(false)
        wrapper.vm.mail = 'ceci est pas un email'
        wrapper.vm.validMail()
        expect(wrapper.vm.mailValid).toBe(false)
    })
})
