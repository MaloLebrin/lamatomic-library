import { mount } from '@vue/test-utils'
import MTypingAnimation from '~/components/Molecules/typed/MTypingAnimation.vue'

describe('Molecules - MTypingAnimation', () => {
    test('... default <vue-typed-js</vue-typed-js>', () => {
        const wrapper = mount(MTypingAnimation)
        expect(wrapper.find('vue-typed-js')).toBeTruthy()
    })
    test(' Typer is a bar', () => {
        const wrapper = mount(MTypingAnimation, {
            propsData: {
                strings: ['ohoh', 'héhé', 'hihi'],
                backSpeed: '10'
            }
        })
        expect(wrapper.vm.strings).toStrictEqual(['ohoh', 'héhé', 'hihi'])
    })
    test(' loop true default ', () => {
        const wrapper = mount(MTypingAnimation)
        expect(wrapper.vm.loop).toBeTruthy()
    })

    test(' test that default backspeed is 10 ', () => {
        const wrapper = mount(MTypingAnimation)
        expect(wrapper.vm.backSpeed).toBe(10)
    })
})
