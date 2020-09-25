import { mount } from '@vue/test-utils'
import AVideoYoutube from './AVideoYoutube.vue'

describe('Atom - AVideoYoutube', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(AVideoYoutube)
        expect(wrapper.find('iframe')).toBeTruthy()
        expect(wrapper.html()).toContain('<iframe width="640" height="315" src="https://www.youtube.com/embed/DkXhSAW5pTQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"')
    })

    test('...with wrong file path for src', () => {
        const wrapper = mount(AVideoYoutube, {
            propsData: {
                src: 'Lama rouge'
            }
        })

        expect(wrapper.attributes('src')).toBe('Lama rouge')
    })


    test('...with correct src', () => {
        const wrapper = mount(AVideoYoutube, {
            propsData: {
                src: 'https://youtu.be/DkXhSAW5pTQ'
            }
        })

        expect(wrapper.attributes('src')).toBe('https://youtu.be/DkXhSAW5pTQ')
    })

    test('...with autoplay /loop / muted / controls false', () => {
        const wrapper = mount(AVideoYoutube)

        expect(wrapper.vm.autoplay).toBeFalsy()
        expect(wrapper.vm.muted).toBeFalsy()
        expect(wrapper.vm.loop).toBeFalsy()
        expect(wrapper.vm.controls).toBeTruthy()

    })
    test("...validator works only with none, metadata, auto ", () => {
        const wrapper = mount(AVideoYoutube)
        const type = wrapper.vm.$options.props.preload

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('none')).toBeTruthy()
        expect(type.validator('metadata')).toBeTruthy()
        expect(type.validator('auto')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
    })

})
