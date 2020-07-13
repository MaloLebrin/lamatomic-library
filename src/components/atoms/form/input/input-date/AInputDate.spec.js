import { mount } from '@vue/test-utils'
import AInputDate from './AInputDate.vue'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
})

describe('Atom - AInputDate', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        })
    })

    test('...default has <button> tag', () => {
        const wrapper = mount(AInputDate)

        expect(wrapper.html()).toContain('type="input"')
    })

    test('...with isDark', () => {
        const wrapper = mount(AInputDate, {
            propsData: { isDark: true }
        })

        expect(wrapper.attributes().class).toContain('is-dark')
    })

    test("...mode not in [single, multiple, range] doesn't work", () => {
        const wrapper = mount(AInputDate)
        const type = wrapper.vm.$options.props.mode

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('single')).toBeTruthy()
        expect(type.validator('multiple')).toBeTruthy()
        expect(type.validator('range')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })

    test("...color not in [gray, red, orange, yellow, green, teal, blue, indigo, purple, pink] doesn't work", () => {
        const wrapper = mount(AInputDate)
        const type = wrapper.vm.$options.props.color

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('gray')).toBeTruthy()
        expect(type.validator('red')).toBeTruthy()
        expect(type.validator('orange')).toBeTruthy()
        expect(type.validator('yellow')).toBeTruthy()
        expect(type.validator('green')).toBeTruthy()
        expect(type.validator('teal')).toBeTruthy()
        expect(type.validator('blue')).toBeTruthy()
        expect(type.validator('indigo')).toBeTruthy()
        expect(type.validator('purple')).toBeTruthy()
        expect(type.validator('pink')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })
})
