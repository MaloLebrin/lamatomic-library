import { mount, shallowMount } from '@vue/test-utils'
import MCard from './MCard.vue'

describe('Molecule - MCard', () => {
    test('...default has <div> tag', () => {
        const wrapper = mount(MCard)

        expect(wrapper.html()).toContain(`<div class="m-card"></div>`)
    })

    test('...with link has <a> tag', () => {
        const wrapper = mount(MCard, {
            propsData: {
                isLink: true
            }
        })

        expect(wrapper.html()).toBe(`<a class="a-link m-card is-link"></a>`)
    })

    test('...without anim', () => {
        const wrapper = mount(MCard, {
            propsData: { noAnim: true }
        })

        expect(wrapper.html()).toContain(`<div class="m-card no-anim"></div>`)
    })

    test('...with link and noAnim', () => {
        const wrapper = mount(MCard, {
            propsData: {
                isLink: true,
                noAnim: true
            }
        })

        expect(wrapper.html()).toBe(`<a class="a-link m-card is-link no-anim"></a>`)
    })

    test('...with mail valid then not valid', () => {
        const wrapper = shallowMount(MCard)

        expect(wrapper.vm.tag).toBe('div')

        wrapper.setProps({
            isLink: true
        })

        expect(wrapper.vm.tag).toBe('ALink')
    })
})
