import { mount } from '@vue/test-utils'
import MTypingAnimation from '~/components/Molecules/typed/MTypingAnimation.vue'

describe('Molecules - MTypingAnimation', () => {
    test('... default <vue-typed-js</vue-typed-js>', () => {
        const wrapper = mount(MTypingAnimation)
        expect(wrapper.find('vue-typed-js')).toBeTruthy()
    })
    test(' string in typer are toto', () => {
        const wrapper = mount(MTypingAnimation, {
            propsData: {
                strings: ['ohoh', 'héhé', 'hihi'],
                backSpeed: '10'
            }
        })
        expect('|').toMatch(wrapper.text())
    })
    test(' loop true default ', () => {
        const wrapper = mount(MTypingAnimation)
        expect(wrapper.find('loop')).toBeTruthy()
    })
})
