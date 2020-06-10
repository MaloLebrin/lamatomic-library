import { mount } from '@vue/test-utils'
import Picture from '~/components/atoms/picture/Picture.vue'

describe('Atom - Picture', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(Picture)
        expect(wrapper.find('img')).toBeTruthy()
    })
})

test('...with title', () => {
    const wrapper = mount(Picture, {
        propsData: {
            title: 'Lama vert'
        }
    })

    expect(wrapper.attributes('title')).toBe('Lama vert')
})

test('...with src', () => {
    const wrapper = mount(Picture, {
        propsData: {
            src: 'Lama rouge'
        }
    })

    expect(wrapper.attributes('src')).toBe('Lama rouge')
})

test('...with alt', () => {
    const wrapper = mount(Picture, {
        propsData: {
            alt: 'Lama jaune'
        }
    })

    expect(wrapper.attributes('alt')).toBe('Lama jaune')
})
