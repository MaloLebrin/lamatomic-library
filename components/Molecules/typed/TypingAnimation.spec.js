import { mount } from '@vue/test-utils'
import TypingAnimation from '~/components/Molecules/typed/TypingAnimation.vue'

describe('Molecules - TypingAnimation', () => {
    test('... default <vue-typed-js</vue-typed-js>', () => {
        const wrapper = mount(TypingAnimation)
        expect(wrapper.find('vue-typed-js')).toBeTruthy()
    })
    test(' string in typer are toto', () => {
        const wrapper = mount(TypingAnimation, {
            propsData: {
                strings: ['ohoh', 'héhé', 'hihi'],
                backSpeed: '10'
            }
        })
        expect('ohohhéhéhihi|').toMatch(wrapper.text())
    })
})
