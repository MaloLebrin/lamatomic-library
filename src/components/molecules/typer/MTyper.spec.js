import { mount } from '@vue/test-utils'
import MTyper from './MTyper.vue'

describe('Molecules - MTyper', () => {
    test('...has tag <vue-typed-js>', () => {
        const wrapper = mount(MTyper)
        expect(wrapper.find('vue-typed-js')).toBeTruthy()
        expect(wrapper.html()).toContain('m-typer')
    })

    test('...has strings given', () => {
        const wrapper = mount(MTyper, {
            propsData: {
                strings: ['ohoh', 'héhé', 'hihi'],
                backSpeed: 10
            }
        })

        expect(wrapper.vm.strings).toStrictEqual(['ohoh', 'héhé', 'hihi'])
    })

    test('...has true for loop prop by default', () => {
        const wrapper = mount(MTyper)
        expect(wrapper.vm.loop).toBeTruthy()
    })

    test('...has 10 for backSpeed prop by default', () => {
        const wrapper = mount(MTyper)
        expect(wrapper.vm.backSpeed).toBe(10)
    })
})
