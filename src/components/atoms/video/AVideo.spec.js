import { mount } from '@vue/test-utils'
import AVideo from './AVideo.vue'

describe('Atom - AVideo', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(AVideo)
        expect(wrapper.find('video')).toBeTruthy()
        expect(wrapper.html()).toContain('<video controls="controls" preload="none" class="a-video"')
    })

    test('...with title', () => {
        const wrapper = mount(AVideo, {
            propsData: {
                title: 'Lama vert'
            }
        })

        expect(wrapper.attributes('title')).toBe('Lama vert')
    })

    test('...with wrong file path for src', () => {
        const wrapper = mount(AVideo, {
            propsData: {
                src: 'Lama rouge'
            }
        })

        expect(wrapper.attributes('src')).toBe('Lama rouge')
    })


    test('...with correct src', () => {
        const wrapper = mount(AVideo, {
            propsData: {
                src: 'https://youtu.be/DkXhSAW5pTQ'
            }
        })

        expect(wrapper.attributes('src')).toBe('https://youtu.be/DkXhSAW5pTQ')
    })

    test('...with alt', () => {
        const wrapper = mount(AVideo, {
            propsData: {
                alt: 'Lama jaune'
            }
        })

        expect(wrapper.attributes('alt')).toBe('Lama jaune')
    })

    test('...with autoplay /loop / muted / controls false', () => {
        const wrapper = mount(AVideo)

        expect(wrapper.vm.autoplay).toBeFalsy()
        expect(wrapper.vm.muted).toBeFalsy()
        expect(wrapper.vm.loop).toBeFalsy()
        expect(wrapper.vm.controls).toBeTruthy()

    })
    test("...validator works only with none, metadata, auto ", () => {
        const wrapper = mount(AVideo)
        const type = wrapper.vm.$options.props.preload

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('none')).toBeTruthy()
        expect(type.validator('metadata')).toBeTruthy()
        expect(type.validator('auto')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
    })

})
