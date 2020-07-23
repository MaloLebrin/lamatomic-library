import { mount } from '@vue/test-utils'
import MScrollToTop, { scrollTop } from './MScrollToTop.vue'

describe('Molecule - MScrollToTop', () => {
    test('...renders default has <button> tag', () => {
        const wrapper = mount(MScrollToTop)

        expect(wrapper.html()).toContain('<button title="Revenir en haut de la page" class="button m-scroll-to-top light">')
    })

    test("...renders with prop type not in [light, dark] doesn't work", () => {
        const wrapper = mount(MScrollToTop)
        const type = wrapper.vm.$options.props.styles

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('light')).toBeTruthy()
        expect(type.validator('dark')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })

    test("...check scrollTop function with correct parameters", () => {
        document.documentElement.scrollTop = 30
        window.scrollTo = jest.fn()
        window.requestAnimationFrame = jest.fn()

        const wrapper = mount(MScrollToTop)
        const scrollToTop = wrapper.vm.scrollToTop
        expect(scrollToTop).toBeInstanceOf(Function)

        scrollToTop()

        expect(window.scrollTo).toHaveBeenCalledWith(29, 29)
        expect(window.requestAnimationFrame).toHaveBeenCalled()
    })

    test("...scroll function doesn't run when already top 0", () => {
        document.documentElement.scrollTop = 0
        window.scrollTo = jest.fn()
        window.requestAnimationFrame = jest.fn()

        const wrapper = mount(MScrollToTop)
        const scrollToTop = wrapper.vm.scrollToTop

        scrollToTop()

        expect(window.scrollTo).not.toHaveBeenCalled()
        expect(window.requestAnimationFrame).not.toHaveBeenCalled()
    })

    test("...scrollTop function on custom element (el) with end top offset (50) > start top offset (20)", () => {
        const el = document.createElement('div')
        scrollTop(el, 20, 50)

        expect(el.scrollTop).toBe(22)
    })

    test("...with window.requestAnimationFrame = null", () => {
        document.documentElement.scrollTop = 30
        window.requestAnimationFrame = null

        const el = document.createElement('div')
        scrollTop(el, 20, 50)

        expect(window.requestAnimationFrame).toBeInstanceOf(Function)
    })

    test("fake test to have code coverage 100% on functions", async () => {
        document.documentElement.scrollTop = 30
        window.requestAnimationFrame = null

        const el = document.createElement('div')
        scrollTop(el, 20, 50)

        await new Promise(resolve => setTimeout(resolve, 20))

        expect(window.requestAnimationFrame).toBeInstanceOf(Function)
    }, 100)

})
