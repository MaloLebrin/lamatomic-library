import { mount, shallowMount } from '@vue/test-utils'
import AIcon from './AIcon.vue'

describe('Atom - AIcon', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(AIcon)

        expect(wrapper.html()).toContain(
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"'
        )
        expect(wrapper.html()).toContain('aria-labelledby="lama" role="presentation" class="a-icon"')
        expect(wrapper.html()).toContain('<title id="lama" lang="en">')
        expect(wrapper.html()).toContain('<g fill="currentColor"></g>')
    })

    test('...with personnalize name', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: { iconName: 'name' }
        })

        expect(wrapper.html()).toContain('aria-labelledby="name"')
        expect(wrapper.html()).toContain('<title id="name" lang="en">')
        expect(wrapper.html()).toContain('name icon')
    })

    test('...with personnalize width et height', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: {
                width: 64,
                height: 64
            }
        })

        expect(wrapper.html()).toContain('width="64" height="64"')
    })

    test('...with personnalize sizeX et sizeY', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: {
                sizeX: 128,
                sizeY: 128
            }
        })

        expect(wrapper.html()).toContain('viewBox="0 0 128 128"')
    })

    test('...with personnalize color', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: {
                iconColor: 'Blue'
            }
        })

        expect(wrapper.html()).toContain('<g fill="Blue"></g>')
    })

    test('...renders slots', () => {
        const wrapper = mount(AIcon, {
            slots: {
                default: 'Choux de Bruxelles'
            }
        })

        expect(wrapper.text()).toContain('Choux de Bruxelles')
    })
})
