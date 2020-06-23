import { mount } from '@vue/test-utils'
import AImage from './AImage.vue'

describe('Atom - AImage', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(AImage)
        expect(wrapper.find('img')).toBeTruthy()
    })
})

test('...with title', () => {
    const wrapper = mount(AImage, {
        propsData: {
            title: 'Lama vert'
        }
    })

    expect(wrapper.attributes('title')).toBe('Lama vert')
})

test('...with src', () => {
    const wrapper = mount(AImage, {
        propsData: {
            src: 'Lama rouge'
        }
    })

    expect(wrapper.attributes('src')).toBe('Lama rouge')
})

test('...with alt', () => {
    const wrapper = mount(AImage, {
        propsData: {
            alt: 'Lama jaune'
        }
    })

    expect(wrapper.attributes('alt')).toBe('Lama jaune')
})
