import { mount } from '@vue/test-utils'
import AInputNumber from './AInputNumber.vue'

const factory = () => {
    return mount(AInputNumber, {
        data() {
            return {
                nnumber: '7485'
            }
        }
    })
}

describe('Atom - AInputNumber', () => {
    test('...has <input> tag', () => {
        const wrapper = factory()

        expect(wrapper.html()).toContain('<div class="a-input-number-wrapper">')
        expect(wrapper.find('input.a-input.a-input-number')).toBeTruthy()
    })

    test('...regex check correctly the given number', () => {
        const wrapper = factory()

        const regexNumber = wrapper.vm.REGEX_NUMBER

        expect('+33974839283').not.toMatch(regexNumber)
        expect('0974839283').toMatch(regexNumber)
        expect('09847').toMatch(regexNumber)
        expect('autruche').not.toMatch(regexNumber)
    })

    test('...number pass the checknumber function and correctly populate "isNumberValid" data', () => {
        const wrapper = factory()

        wrapper.vm.number = 98
        expect(wrapper.vm.isNumberValid).toBeTruthy()

        wrapper.vm.number = "Ceci n'est pas un tel, ni une banane d'ailleurs"

        expect(wrapper.vm.isNumberValid).toBeFalsy()
    })
})
