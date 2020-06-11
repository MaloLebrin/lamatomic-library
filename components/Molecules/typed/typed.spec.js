import { mount, shallowMount, destroy } from '@vue/test-utils'
import typed from '~/components/Molecules/typed/typed.vue'

describe('Molecules -  typed', () => {
    test(' defaut <vue-typed-js></vue-typed-js>', () => {
        const wrapper = mount(typed)
        expect(wrapper.find('<vue-typed-js></vue-typed-js>')).toBeTruthy()
    })
    test('... ')
})
