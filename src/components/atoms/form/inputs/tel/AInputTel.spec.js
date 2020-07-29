import { mount } from '@vue/test-utils'
import AInputTel from './AInputTel.vue'

const factory = () => {
    return mount(AInputTel, {
        data() {
            return {
                telNumber: '0654637485'
            }
        }
    })
}

describe('Atom - AInputTel', () => {
    test('...has <input> tag', () => {
        const wrapper = factory()

        expect(wrapper.html()).toContain('<div class="a-input-tel-wrapper">')
        expect(wrapper.find('input.a-input.a-input-tel')).toBeTruthy()
    })

    test('...regex check correctly the given tel', () => {
        const wrapper = factory()

        const regexTel = wrapper.vm.REGEX_TEL

        expect('+33974839283').toMatch(regexTel)
        expect('0974839283').toMatch(regexTel)
        expect('09847').not.toMatch(regexTel)
        expect('autruche').not.toMatch(regexTel)
    })

    test('...tel pass the checkEmail function and correctly populate "isTelValid" data', () => {
        const wrapper = factory()

        expect(wrapper.vm.isTelValid).toBeTruthy()

        wrapper.vm.telNumber = "Ceci n'est pas un tel, ni une banane d'ailleurs"

        expect(wrapper.vm.isTelValid).toBeFalsy()
    })
})
