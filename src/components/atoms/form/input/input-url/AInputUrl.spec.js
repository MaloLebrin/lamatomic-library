import { mount, shallowMount } from '@vue/test-utils'
import AInputUrl from './AInputUrl.vue'

describe('Atom - AInputUrl', () => {
    test('...default has <AInputUrl> tag', () => {
        const wrapper = mount(AInputUrl)
        expect(wrapper.find('AInputUrl')).toBeTruthy()
    })
    test('Renders the correct type based on props passed', () => {
        const wrapper = shallowMount(AInputUrl, {
            propsData: {
                id: 'id',
                url: 'url',
                placeholder: 'placeholder'
            }
        })
        expect(wrapper.attributes().id).toBe('id')
    })
    test('...URL default', () => {
        const wrapper = mount(AInputUrl)
        expect(wrapper.find('tapez votre URL ici')).toBeTruthy()
    })
})
