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

    test('...with align right', () => {
        const wrapper = mount(AHeading, {
            propsData: {
                align: 'right'
            }
        })

        expect(wrapper.attributes().class).toContain('right')
    })

    test("...align must in [left, right, center, justify]", () => {
        const wrapper = mount(AHeading)
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
        const wrapper = mount(AHeading, {
            propsData: {
                weight: 'bold'
            }
        })

        expect(wrapper.attributes().class).toContain('bold')
    })

    test('...weight must in [thin, normal, bold, bolder]', () => {
        const wrapper = mount(AHeading)
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
        const wrapper = mount(AHeading, {
            propsData: {
                decoration: 'underline'
            }
        })

        expect(wrapper.attributes().class).toContain('underline')
    })

    test('...decoration must in [no-decoration, blink, dashed, dotted, double, underline]', () => {
        const wrapper = mount(AHeading)
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
        const wrapper = mount(AHeading, {
            propsData: {
                italic: true
            }
        })

        expect(wrapper.attributes().class).toContain('italic')
    })
})
