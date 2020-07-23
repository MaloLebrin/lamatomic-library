import { mount } from '@vue/test-utils'
import AInputUrl from './AInputUrl.vue'

const factory = () => {
    return mount(AInputUrl, {
        data() {
            return {
                url: 'https://lamacompta.co'
            }
        }
    })
}

describe('Atom - AInputUrl', () => {
    test('...has <input> tag', () => {
        const wrapper = factory()

        expect(wrapper.html()).toContain('<div class="a-input-url-wrapper">')
        expect(wrapper.find('input.a-input-url')).toBeTruthy()
    })

    test('...regex check correctly the given url', () => {
        const wrapper = factory()

        const regexUrl = wrapper.vm.REGEX_URL

        expect('https://lamacompta.co').toMatch(regexUrl)
        expect('autruche.').not.toMatch(regexUrl)
        expect('autruche.fr').not.toMatch(regexUrl)
        expect('https://frite').not.toMatch(regexUrl)
    })

    test('...url pass the checkEmail function and correctly populate "isUrlValid" data', () => {
        const wrapper = factory()

        expect(wrapper.vm.isUrlValid).toBeTruthy()

        wrapper.vm.url = "Ceci n'est pas un url, ni une banane d'ailleurs"

        expect(wrapper.vm.isUrlValid).toBeFalsy()
    })
})
