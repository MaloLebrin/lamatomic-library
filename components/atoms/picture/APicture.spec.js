import { mount } from '@vue/test-utils'
import APicture from '~/components/atoms/picture/APicture.vue'

describe('Atom - APicture', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(APicture)
        expect(wrapper.find('img')).toBeTruthy()
    })
})

test('...with title', () => {
    const wrapper = mount(APicture, {
        propsData: {
            title: 'Lama vert'
        }
    })

    expect(wrapper.attributes('title')).toBe('Lama vert')
})

test('...with src', () => {
    const wrapper = mount(APicture, {
        propsData: {
            src: 'Lama rouge'
        }
    })

    expect(wrapper.attributes('src')).toBe('Lama rouge')
})

test('...with alt', () => {
    const wrapper = mount(APicture, {
        propsData: {
            alt: 'Lama jaune'
        }
    })

    expect(wrapper.attributes('alt')).toBe('Lama jaune')
})
