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
            `<div class="o-footer-cols default">`
        )

        expect(wrapper.html()).toContain(
            '<button title="Revenir en haut de la page" class="a-button m-scroll-to-top dark">'
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
            `class="o-footer-col o-footer-col-1 default"`
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
            `class="o-footer-col o-footer-col-1 default"`
        )

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-2 default"`
        )
    })

    test('...with all 3 slots used', () => {
        const wrapper = mount(OFooter, {
            slots: {
                'col-1': '<div><p>Content col 1</p></div>',
                'col-2': '<div><p>Content col 2</p></div>',
                'col-3': '<div><p>Content col 3</p></div>'
            }
        })

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-1 default"`
        )

        expect(wrapper.html()).toContain(
            `Content col 1`
        )

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-2 default"`
        )

        expect(wrapper.html()).toContain(
            `Content col 2`
        )

        expect(wrapper.html()).toContain(
            `class="o-footer-col o-footer-col-3 default"`
        )

        expect(wrapper.html()).toContain(
            `Content col 3`
        )
    })

    test('...custom classes change correctly computed', () => {
        const wrapper = mount(OFooter)

        expect(wrapper.vm.computedColsClasses).toBe('default')
        expect(wrapper.vm.computedColClasses).toBe('default')

        wrapper.setProps({
            customColsClasses: 'row'
        })
        expect(wrapper.vm.computedColsClasses).toBe('row')

        wrapper.setProps({
            customColClasses: 'col-12 col-lg-4'
        })
        expect(wrapper.vm.computedColClasses).toBe('col-12 col-lg-4')
    })
})
