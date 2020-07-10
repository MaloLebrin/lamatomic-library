import { shallowMount } from '@vue/test-utils'
import AInputTel from './AInputTel.vue'

describe('Atom - AInputTel', () => {
    test('...default has <AInputTel> tag', () => {
        const wrapper = shallowMount(AInputTel)
        expect(wrapper.find('AInputTel')).toBeTruthy()
    })
    test('... phoneNumber is required, is valid', () => {
        const wrapper = shallowMount(AInputTel, {
            propsData: {
                required: true,
                placeholder: 'Entrez votre numéro de téléphone',
                value: '0646830564'
            }
        })
        expect(wrapper.attributes().required).toBeTruthy()
        expect(wrapper.vm.value).toBe('0646830564')
    })

    test('... phone number pass the regex', () => {
        const wrapper = shallowMount(AInputTel, {
            propsData: {
                required: true,
                placeholder: 'Entrez votre numéro de téléphone',
            }
        })
        expect(wrapper.vm.phoneValid).toBe(false)
        wrapper.vm.phone = '0646830564'
        wrapper.vm.validTel()
        expect(wrapper.vm.phoneValid).toBe(true)
    })

    test('... phone number fail the regex', () => {
        const wrapper = shallowMount(AInputTel, {
            propsData: {
                required: true,
                placeholder: 'Entrez votre numéro de téléphone',
            }
        })
        expect(wrapper.vm.phoneValid).toBe(false)
        wrapper.vm.phone = '4562'
        wrapper.vm.validTel()
        expect(wrapper.vm.phoneValid).toBe(false)
    })
})
