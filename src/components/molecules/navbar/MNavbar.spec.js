import { mount } from '@vue/test-utils'
import MNavbar from './MNavbar.vue'

describe('Molecule - MNavbar', () => {
    test('...has a list <ul> of <alink> & <abutton> component', () => {
        const wrapper = mount(MNavbar)
        expect(wrapper.html()).toContain('<nav class="navbar"')
        expect(wrapper.html()).toContain('<ul class="without-chips horizontal">')
        expect(wrapper.html()).toContain('<li class="nav-item">')
        expect(wrapper.html()).toContain('<a class="link underlined underlined--thin">')
        expect(wrapper.html()).toContain('<button class="button">')
    })
    test('... default value props', () => {
        const wrapper = mount(MNavbar, {
            propsData: {
                withoutChips: true,
                horizontal: true,
                footer: false
            }
        })
        expect(wrapper.props().withoutChips).toBeTruthy()
        expect(wrapper.props().horizontal).toBeTruthy()
        expect(wrapper.props().footer).toBeFalsy()

    })
    test('.... if footer = true then button are replace by link', () => {
        const wrapper = mount(MNavbar, {
            propsData: { 
                footer:true
            }
        })
        expect(wrapper.html()).not.toContain('<button class="button">')
    })
})