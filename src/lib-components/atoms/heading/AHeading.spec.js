import { mount } from '@vue/test-utils'
import AHeading from './AHeading.vue'

describe('Atom - AHeading', () => {
    test('...AHeading has h2 as default tag', () => {
        const wrapper = mount(AHeading)
        expect(wrapper.find('h2')).toBeTruthy()
    })

    test('...AHeading with level 4 return h4', () => {
        const wrapper = mount(AHeading, {
            propsData: { level: 4 }
        })

        expect(wrapper.find('h4')).toBeTruthy()
    })

    test("...level not in [1, 2, 3, 4, 5, 6] doesn't work", () => {
        const wrapper = mount(AHeading)
        const level = wrapper.vm.$options.props.level

        expect(level.validator).toBeInstanceOf(Function)
        expect(level.validator(3)).toBeTruthy()
        expect(level.validator(8)).toBeFalsy()
        expect(level.validator(-1)).toBeFalsy()
        expect(level.validator('banana')).toBeFalsy()
    })
})
