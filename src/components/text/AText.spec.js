import { mount, shallowMount } from '@vue/test-utils'
import AText from './AText.vue'

describe('Atom - AText', () => {
    test('...has <p> tag and class="atom-text left"', () => {
        const wrapper = mount(AText)

        expect(wrapper.html()).toBe('<p class="atom-text left"></p>')
    })

    test('...with span tag and class="atom-text left"', () => {
        const wrapper = shallowMount(AText, {
            propsData: {
                span: true
            }
        })

        expect(wrapper.html()).toBe('<span class="atom-text left"></span>')
    })

    test("...align not in [left, right, center, justify] doesn't work", () => {
        const wrapper = mount(AText)
        const type = wrapper.vm.$options.props.align

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('left')).toBeTruthy()
        expect(type.validator('right')).toBeTruthy()
        expect(type.validator('center')).toBeTruthy()
        expect(type.validator('justify')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })
})
