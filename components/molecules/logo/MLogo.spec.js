import { mount } from '@vue/test-utils'
import MLogo from '~/components/molecules/logo/MLogo.vue'

describe('Molecule - MLogo', () => {
    test('...molecule MLogo to be', () => {
        const wrapper = mount(MLogo)
        expect(wrapper.html()).toContain(
            `<alink to="accueil" title="Logo Lamacompta" external="" rel="sidebar" no-line="" class="logo-lamacompta">`
        )
    })
})
