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
            `<div class="o-footer-cols">`
        )

        expect(wrapper.html()).toContain(
            '<button title="Revenir en haut de la page" class="a-button m-scroll-to-top'
        )
    })

    test('...do not render MScrollToTop button', () => {
        const wrapper = mount(OFooter, {
            propsData: {
                withoutScrollToTop: true
            }
        })

        expect(wrapper.html()).not.toContain(
            '<button title="Revenir en haut de la page" class="a-button m-scroll-to-top'
        )
    })

    test('...with just 1 slot used', () => {
        const wrapper = mount(OFooter, {
            slots: {
                'col-1': '<div><p>Content col 1</p></div>'
            }
        })

        expect(wrapper.html()).toContain(
            `<p>Content col 1</p>`
        )
        
        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-1"`
        )

        expect(wrapper.html()).not.toContain(
            `class="o-footer-col o-footer-col-2"`
        )

        expect(wrapper.html()).not.toContain(
            `class="o-footer-col o-footer-col-3"`
        )
    })

    test('...with just 2 slots used', () => {
        const wrapper = mount(OFooter, {
            slots: {
                'col-1': '<div><p>Content col 1</p></div>',
                'col-2': '<div><p>Content col 2</p></div>'
            }
        })

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-1"`
        )

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-2"`
        )

        expect(wrapper.html()).not.toContain(
            `class="o-footer-col o-footer-col-3"`
        )
    })

    test('...with all 3 slots used', () => {
        const wrapper = mount(OFooter, {
            slots: {
                'o-footer-col-1': '<div><p>Content col 1</p></div>',
                'o-footer-col-2': '<div><p>Content col 2</p></div>',
                'o-footer-col-3': '<div><p>Content col 3</p></div>'
            }
        })

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-1"`
        )

        expect(wrapper.html()).toContain(
            `Content col 1`
        )

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-2"`
        )

        expect(wrapper.html()).toContain(
            `Content col 2`
        )

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-3"`
        )

        expect(wrapper.html()).toContain(
            `Content col 3`
        )
    })
})

