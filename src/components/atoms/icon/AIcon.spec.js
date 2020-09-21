import { mount } from '@vue/test-utils'
import AIcon from './AIcon.vue'

describe('Atom - AIcon', () => {
    test(' has svg tag', () => {
        const wrapper = mount(AIcon)

        expect(wrapper.html()).toContain('<asvg height="100px" width="100px" class="a-icon"')
    })

    test('...with personnalize width et height', () => {
        const wrapper = mount(AIcon, {
            propsData: {
                size: 'xs',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('23px')

        expect(wrapper.html()).toContain('<asvg height="23px" width="23px" class="a-icon"></asvg>')
    })

    test('...with personnalize width et height', () => {
        const wrapper = mount(AIcon, {
            propsData: {
                size: 's',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('50px')

        expect(wrapper.html()).toContain('<asvg height="50px" width="50px" class="a-icon"></asvg>')
    })
    test('...with personnalize width et height', () => {
        const wrapper = mount(AIcon, {
            propsData: {
                size: 'm',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('100px')

        expect(wrapper.html()).toContain('<asvg height="100px" width="100px" class="a-icon"></asvg>')
    })
    test('...with personnalize width et height', () => {
        const wrapper = mount(AIcon, {
            propsData: {
                size: 'l',
            }
        })
        expect(wrapper.vm.sizeIcon).toBe('200px')

        expect(wrapper.html()).toContain('<asvg height="200px" width="200px" class="a-icon"></asvg>')
    })


})
