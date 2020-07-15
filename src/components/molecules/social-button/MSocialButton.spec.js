import { shallowMount } from '@vue/test-utils'
import MSocialButton from './MSocialButton.vue'
import MSocialButtonFacebook from './MSocialButton/MSocialButtonFacebook.vue'
import MSocialButtonInstagram from './MSocialButton/MSocialButtonInstagram.vue'
import MSocialButtonTwitter from './MSocialButton/MSocialButtonTwitter.vue'
import MSocialButtonLinkedin from './MSocialButton/MSocialButtonLinkedin.vue'





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
    })
    test('.. social button Instagram', () => {
        const wrapper = shallowMount(MSocialButtonInstagram, { stubs }, { 
            href: 'https://www.Instagram.com'
        })
        expect(wrapper.attributes().href).toBe('https://www.Instagram.com')
    })
    test('.. social button Twitter', () => {
        const wrapper = shallowMount(MSocialButtonTwitter, { stubs }, { 
            href: 'https://www.Twitter.com'
        })
        expect(wrapper.attributes().href).toBe('https://www.Twitter.com')
    })
    test('.. social button Linkedin', () => {
        const wrapper = shallowMount(MSocialButtonLinkedin, { stubs }, { 
            href: 'https://www.Linkedin.com'
        })
        expect(wrapper.attributes().href).toBe('https://www.Linkedin.com')
    })

    

})