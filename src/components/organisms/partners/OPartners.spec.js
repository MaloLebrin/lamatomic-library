import { mount } from '@vue/test-utils'
import { OPartners, MPartner } from '@/entry'
import { getMountedComponent } from '@/utils'


describe('Organism - OPartners', () => {
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
      test('...as default', () => {
        const wrapper = mount( OPartners )
        expect(wrapper.html()).toContain(`<div class="o-partners">`)
    })

const img1 = getMountedComponent(MPartner, { src:'https://placehold.it/350x150' }, { title: 'Bge'})
const img2 = getMountedComponent(MPartner, { src:'https://placehold.it/350x150' }, { title: 'france active 🍌'})

const items = [img1, img2]
test('... OPartners contain MPartner', () => {
    const wrapper = mount(OPartners, {
        propsData: {
            items,
        }
    })
    expect(wrapper.html()).toContain(`<li class="list-item"><a title="Partner's logo" class="link m-partner"><img src="https://placehold.it/350x150" alt="Partner's logo" class="image img-partner"></a></li>`)

})
})
