import { mount } from '@vue/test-utils'
import MCard from './MCard.vue'

describe('Molecule - MCard', () => {
    test('...default has <div> tag', () => {
        const wrapper = mount(MCard)

        expect(wrapper.html()).toContain(`<div class="m-card">`)
    })

    test('...with link has <a> tag', () => {
        const wrapper = mount(MCard, {
            propsData: {
                isLink: true
            }
        })

        expect(wrapper.html()).toBe(`<div class="m-card is-link"><a no-line="true" class="link"></a></div>`)
    })

    test('...without anim', () => {
        const wrapper = mount(MCard, {
            propsData: { noAnim: true }
        })

        expect(wrapper.html()).toContain(`<div class="m-card no-anim">`)
    })

    test('...with link and noAnim', () => {
        const wrapper = mount(MCard, {
            propsData: {
                isLink: true,
                noAnim: true
            }
        })

        expect(wrapper.html()).toBe(`<div class="m-card is-link no-anim"><a no-line="true" class="link"></a></div>`)
    })
})
