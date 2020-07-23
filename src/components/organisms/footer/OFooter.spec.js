import { mount } from '@vue/test-utils'
import OFooter from './OFooter.vue'

describe('Organisms - OFooter', () => {

    test('...has <div> component, o-footer class and render of ScrollToTop button', () => {
        const wrapper = mount(OFooter)

        expect(wrapper.html()).toContain(
            `<div`
        )

        expect(wrapper.html()).toContain(
            `class="o-footer"`
        )

        expect(wrapper.html()).toContain(
            `<div class="cols-wrapper">`
        )

        expect(wrapper.html()).toContain(
            '<button title="Revenir en haut de la page" class="button m-scroll-to-top light">'
        )
    })

    test('...do not render MScrollToTop button', () => {
        const wrapper = mount(OFooter, {
            propsData: {
                withoutScrollToTop: true
            }
        })

        expect(wrapper.html()).not.toContain(
            '<button title="Revenir en haut de la page" class="button m-scroll-to-top light">'
        )
    })

    test('...with just 1 slot used', () => {
        const wrapper = mount(OFooter, {
            slots: {
                'col-1': '<div><p>col-1</p></div>'
            }
        })

        expect(wrapper.html()).toContain(
            `<p>col-1</p>`
        )
    })

    test('...with just 2 slots used', () => {
        const wrapper = mount(OFooter, {
            slots: {
                'col-1': '<div><p>col-1</p></div>',
                'col-2': '<div><p>prout</p></div>'
            }
        })

        expect(wrapper.html()).toContain(
            `<p>col-1</p>`
        )
        expect(wrapper.html()).toContain(
            `<p>prout</p>`
        )
    })

    test('...with all 3 slots used', () => {
        const wrapper = mount(OFooter, {
            slots: {
                'col-1': '<div><p>col-1</p></div>',
                'col-2': '<div><p>col-2 prout</p></div>',
                'col-3': '<div><p>col-3</p></div>'
            }
        })

        expect(wrapper.html()).toContain(
            `<p>col-1</p>`
        )
        expect(wrapper.html()).toContain(
            `<p>col-2 prout</p>`
        )
        expect(wrapper.html()).toContain(
            `<p>col-3</p>`
        )
    })
})
