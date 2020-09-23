import { mount, shallowMount } from '@vue/test-utils'
import ASvg from './ASvg.vue'

describe('Atom - ASvg', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(ASvg)

        expect(wrapper.html()).toContain(
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"'
        )
        expect(wrapper.html()).toContain('<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" aria-labelledby="" role="presentation" class="a-svg"')
        expect(wrapper.html()).toContain('<g fill="currentColor"></g>')
    })

    test('...with personnalize name', () => {
        const wrapper = shallowMount(ASvg, {
            propsData: { iconName: 'name' }
        })

        expect(wrapper.html()).toContain('aria-labelledby="name"')
        expect(wrapper.html()).toContain('<title id="name" lang="en">')
        expect(wrapper.html()).toContain('name icon')
    })

    test('...with personnalize width et height', () => {
        const wrapper = shallowMount(ASvg, {
            propsData: {
                width: 64,
                height: 64
            }
        })

        expect(wrapper.html()).toContain('width="64" height="64"')
    })

    test('...with personnalize sizeX et sizeY', () => {
        const wrapper = shallowMount(ASvg, {
            propsData: {
                sizeX: 128,
                sizeY: 128
            }
        })

        expect(wrapper.html()).toContain('viewBox="0 0 128 128"')
    })

    test('...with personnalize color', () => {
        const wrapper = shallowMount(ASvg, {
            propsData: {
                iconColor: 'Blue'
            }
        })

        expect(wrapper.html()).toContain('<g fill="Blue"></g>')
    })

    test('...renders slots', () => {
        const wrapper = mount(ASvg, {
            slots: {
                default: 'Choux de Bruxelles'
            }
        })

        expect(wrapper.text()).toContain('Choux de Bruxelles')
    })
})
