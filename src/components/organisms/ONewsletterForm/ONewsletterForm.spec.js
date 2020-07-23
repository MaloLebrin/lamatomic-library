import { mount } from '@vue/test-utils'
import { ONewsletterForm } from '@/entry'

describe('Organism - ONewsletterForm', () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          value: jest.fn(() => {
            return {
              matches: true,
              addListener: jest.fn(),
              removeListener: jest.fn()
            };
          })
        });
      });

    test('...ONewsletterForm has h2 as default tag', () => {
        const wrapper = mount(ONewsletterForm)
        expect(wrapper.find('h2')).toBeTruthy()
        expect(wrapper.html()).toContain('<p')
        expect(wrapper.html()).toContain('<img')
        expect(wrapper.html()).toContain('<button')
        expect(wrapper.html()).toContain('<input')
    })
    test('... with title or not ', () => {
        const wrapper = mount(ONewsletterForm, {
            propsData: {
                withoutImage: true,
                withoutTitle: true
            }})
        expect(wrapper.vm.withoutImage).toBeTruthy()
        expect(wrapper.find('without-image')).toBeTruthy()
        expect(wrapper.vm.withoutTitle).toBeTruthy()
        expect(wrapper.find('without-title')).toBeTruthy()

        })

})
