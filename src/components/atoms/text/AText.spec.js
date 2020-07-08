import { mount } from '@vue/test-utils'
import AText from './AText.vue'

describe('Atom - AText', () => {
    test('...has <p> tag and class="a-text left"', () => {
        const wrapper = mount(AText)

        expect(wrapper.html()).toBe('<p class="a-text"></p>')
    })

    test('...with span tag', () => {
        const wrapper = mount(AText, {
            propsData: {
                span: true
            }
        })

        expect(wrapper.html()).toBe('<span class="a-text"></span>')
    })

    test('...with align right', () => {
        const wrapper = mount(AText, {
            propsData: {
                align: 'right'
            }
        })

        expect(wrapper.attributes().class).toContain('right')
    })

    test("...align must in [left, right, center, justify]", () => {
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

    test('...with weight bold', () => {
        const wrapper = mount(AText, {
            propsData: {
                weight: 'bold'
            }
        })

        expect(wrapper.attributes().class).toContain('bold')
    })

    test('...weight must in [thin, normal, bold, bolder]', () => {
        const wrapper = mount(AText)
        const type = wrapper.vm.$options.props.weight

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('thin')).toBeTruthy()
        expect(type.validator('normal')).toBeTruthy()
        expect(type.validator('bold')).toBeTruthy()
        expect(type.validator('bolder')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })

    test('...with decoration underline', () => {
        const wrapper = mount(AText, {
            propsData: {
                decoration: 'underline'
            }
        })

        expect(wrapper.attributes().class).toContain('underline')
    })

    test('...decoration must in [no-decoration, blink, dashed, dotted, double, underline]', () => {
        const wrapper = mount(AText)
        const type = wrapper.vm.$options.props.decoration

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('no-decoration')).toBeTruthy()
        expect(type.validator('blink')).toBeTruthy()
        expect(type.validator('dashed')).toBeTruthy()
        expect(type.validator('dotted')).toBeTruthy()
        expect(type.validator('double')).toBeTruthy()
        expect(type.validator('underline')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })

    test('...with italic style', () => {
        const wrapper = mount(AText, {
            propsData: {
                italic: true
            }
        })

        expect(wrapper.attributes().class).toContain('italic')
    })
})
