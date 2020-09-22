import { shallowMount } from '@vue/test-utils'
import AIcon from './AIcon.vue'

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

describe('Atom - AIcon', () => {
    test(' has svg tag', () => {
        const wrapper = shallowMount(AIcon)

        expect(wrapper.html()).toContain('<asvg-stub iconname="" width="100px" height="100px" iconcolor="currentColor" sizex="512" sizey="512" class="a-icon"')
    })

    test('...with personnalize width et height', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: {
                size: 'xs',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('23px')

        expect(wrapper.html()).toContain('<asvg-stub iconname="" width="23px" height="23px" iconcolor="currentColor" sizex="512" sizey="512" class="a-icon"')
    })

    test('...with personnalize width et height', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: {
                size: 's',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('50px')

        expect(wrapper.html()).toContain('<asvg-stub iconname="" width="50px" height="50px" iconcolor="currentColor" sizex="512" sizey="512" class="a-icon"')
    })
    test('...with personnalize width et height', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: {
                size: 'm',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('100px')

        expect(wrapper.html()).toContain('<asvg-stub iconname="" width="100px" height="100px" iconcolor="currentColor" sizex="512" sizey="512" class="a-icon"')
    })
    test('...with personnalize width et height', () => {
        const wrapper = shallowMount(AIcon, {
            propsData: {
                size: 'l',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('200px')

        expect(wrapper.html()).toContain('<asvg-stub iconname="" width="200px" height="200px" iconcolor="currentColor" sizex="512" sizey="512" class="a-icon"></asvg-stub>')
    })


})
