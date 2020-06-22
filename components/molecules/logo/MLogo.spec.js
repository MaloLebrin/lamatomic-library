import { mount } from '@vue/test-utils'
import MLogo from '~/components/molecules/logo/MLogo.vue'

describe('Atom - MLogo', () => {
    test('...molecule MLogo to be', () => {
        const wrapper = mount(MLogo)
        expect(wrapper.html()).toBe(
            `<a class="link no-line="true">
                <img
                    :src="/_nuxt/components/molecules/logo/svg/logo.svg"
                    title="Le super Lamalogo"
                    alt="Logo Lamacompta"
                />
            </a>`
        )
    })
})
