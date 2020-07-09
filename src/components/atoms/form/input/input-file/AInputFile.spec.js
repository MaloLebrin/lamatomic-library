import { mount, shallowMount } from '@vue/test-utils'
import AInputFile from './AInputFile.vue'

describe('Atom - AInputFile', () => {
    test('...default has <AInputFile> tag', () => {
        const wrapper = mount(AInputFile)
        expect(wrapper.find('AInputFile')).toBeTruthy()
    })
    test('... File  is required, placeholder is ', () => {
        const wrapper = shallowMount(AInputFile, {
            propsData: {
                file: true,
                required: true,
            }
        })
        expect(wrapper.attributes().class).toContain('file')
        expect(wrapper.attributes().required).toBeTruthy()
    })
    // test ('.... method handleFileChange', )
})
