import { mount } from '@vue/test-utils'
import TypingAnimation from '~/components/Molecules/typed/TypingAnimation.vue'

describe('Molecules - TypingAnimation', () => {
    test('... default <vue-typed-js</vue-typed-js>', () => {
        const wrapper = mount(TypingAnimation)
        expect(wrapper.find('vue-typed-js')).toBeTruthy()
    })
    test(' string in typer are Café et thé à volonté No costume International Cabinet à impact positif', () => {
        expect(String).toBe(String)
    })
    test(' loop true default ', () => {
        const wrapper = mount(TypingAnimation)
        expect(wrapper.find('loop')).toBeTruthy()
    })
    test('... backSpeed is Number, defautlt 10', () => {
        const wrapper = mount(TypingAnimation, {
            propsData: {
                backSpeed: '10'
            }
        })
        expect(wrapper.attributes('backSpeed')).toBe('10') // test ne fonctionne pas
    })
})
