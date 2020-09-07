import { mount } from '@vue/test-utils'
import ASelectPlusImage from './ASelectPlusImage.vue'

describe('Atoms/ASelectPlusImage', () => {
  test('...options has array', () => {
    const wrapper = mount(ASelectPlusImage, {
        propsData: { options: ['ohoh', 'héhé', 'hihi'] }
    })
    expect(wrapper.props().options).toContain('ohoh')
    expect(wrapper.props().options).toContain('héhé')
    expect(wrapper.props().options).toContain('hihi')
    expect(wrapper.html()).toContain('<div class="a-select-plus a-select-plus-image"')
    expect(wrapper.html()).toContain('<div tabindex="-1" class="multiselect"')
    expect(wrapper.html()).toContain('<div class="multiselect__tags"')
    expect(wrapper.html()).toContain('<div class="multiselect__tags-wrap" style="display: none;"')
    expect(wrapper.html()).toContain('<transition-stub name="multiselect__loading"')
    expect(wrapper.html()).toContain('<div tabindex="-1" class="multiselect__content-wrapper"')
    expect(wrapper.html()).toContain('<ul class="multiselect__content"')
    expect(wrapper.html()).toContain('<li class="multiselect__element"')
    })
})
