import { shallowMount } from '@vue/test-utils'
import MSocialButton from './MSocialButton.vue'
import MSocialButtonFacebook from './MSocialButtonFacebook.vue'
import MSocialButtonInstagram from './MSocialButtonInstagram.vue'
import MSocialButtonTwitter from './MSocialButtonTwitter.vue'
import MSocialButtonLinkedin from './MSocialButtonLinkedin.vue'

describe('Molecule - MSocialButton', () => {
    let stubs

    beforeEach(() => {
        stubs = {
            AImage: { template: '<div></div>' }
        }
    })

    test('...default has <button> tag', () => {
        const wrapper = shallowMount(MSocialButton, { stubs })

        expect(wrapper.html()).toContain(`<abutton-stub`)
        expect(wrapper.html()).toContain(`class="m-social-button"`)
    })

    test('.. social button Facebook', () => {
        const wrapper = shallowMount(MSocialButtonFacebook, { stubs }, {
            href: 'https://www.facebook.com'
        })
        expect(wrapper.attributes().href).toBe('https://www.facebook.com')
        expect(wrapper.html()).toContain('href="https://www.facebook.com"')
    })

    test('.. social button Instagram', () => {
        const wrapper = shallowMount(MSocialButtonInstagram, { stubs }, {
            href: 'https://www.instagram.com'
        })
        expect(wrapper.attributes().href).toBe('https://www.instagram.com')
        expect(wrapper.html()).toContain('href="https://www.instagram.com"')
    })

    test('.. social button Twitter', () => {
        const wrapper = shallowMount(MSocialButtonTwitter, { stubs }, {
            href: 'https://www.twitter.com'
        })
        expect(wrapper.attributes().href).toBe('https://www.twitter.com')
        expect(wrapper.html()).toContain('href="https://www.twitter.com"')
    })

    test('.. social button Linkedin', () => {
        const wrapper = shallowMount(MSocialButtonLinkedin, { stubs }, {
            href: 'https://www.linkedin.com'
        })
        expect(wrapper.attributes().href).toBe('https://www.linkedin.com')
        expect(wrapper.html()).toContain('href="https://www.linkedin.com"')
    })
})
