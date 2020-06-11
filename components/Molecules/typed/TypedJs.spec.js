import { mount } from '@vue/test-utils'
import VueTypedJs from 'VueTypedJs.vue'

describe('Molecules - VueTypedJs', () => {
    test('... default <vue-typed-js</vue-typed-js>', () => {
        const wrapper = mount(VueTypedJs)
        expect(wrapper.find('vue-typed-js')).toBeTruthy()
    })
})
