import { shallowMount } from '@vue/test-utils'
import MSocialButton, { getLogoFileName, getTitles } from './MSocialButton.vue'

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

        expect(wrapper.html()).toContain(`title="Accéder à la page "`)

        expect(wrapper.html()).toContain(`class="m-social-button"`)
    })

    test("...type not in [new, facebook, instagram, linkedin, twitter] doesn't work", () => {
        const wrapper = shallowMount(MSocialButton, { stubs })
        const type = wrapper.vm.$options.props.type

        expect(type.validator).toBeInstanceOf(Function)
        expect(type.validator('new')).toBeTruthy()
        expect(type.validator('facebook')).toBeTruthy()
        expect(type.validator('instagram')).toBeTruthy()
        expect(type.validator('linkedin')).toBeTruthy()
        expect(type.validator('twitter')).toBeTruthy()
        expect(type.validator('banana')).toBeFalsy()
        expect(type.validator(8)).toBeFalsy()
    })

    test('...default has <button> tag', () => {
        const wrapper = shallowMount(MSocialButton, {
            stubs,
            propsData: {
                type: 'facebook'
            }
        })

        expect(wrapper.html()).toContain(`title="Accéder à la page facebook"`)
    })

    test("...function getLogoFileName", () => {
        let logoFileName = getLogoFileName('facebook')
        expect(logoFileName).toBe('facebook-brands.svg')

        logoFileName = getLogoFileName('instagram')
        expect(logoFileName).toBe('instagram-brands.svg')

        logoFileName = getLogoFileName('linkedin')
        expect(logoFileName).toBe('linkedin-brands.svg')

        logoFileName = getLogoFileName('twitter')
        expect(logoFileName).toBe('twitter-brands.svg')

        logoFileName = getLogoFileName('')
        expect(logoFileName).toBe('')
    })

    test("...function getTitles", () => {
        let titles = getTitles('facebook')
        expect(titles).toBe('facebook')

        titles = getTitles('instagram')
        expect(titles).toBe('instagram')

        titles = getTitles('linkedin')
        expect(titles).toBe('linkedin')

        titles = getTitles('twitter')
        expect(titles).toBe('twitter')

        titles = getTitles('', 'lamacompta')
        expect(titles).toBe('lamacompta')
    })
})
