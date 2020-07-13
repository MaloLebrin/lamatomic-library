import { storiesOf } from '@storybook/vue'
import MSocialButton from './MSocialButton.vue'

const wrapper = {
    components: { MSocialButton }
}

storiesOf('Molecules/SocialButton', module)
    .add('facebook social button', () => ({
        ...wrapper,
        template: '<MSocialButton type="facebook"/>'
    }))

    .add('twitter social button', () => ({
        ...wrapper,
        template: '<MSocialButton type="twitter"/>'
    }))

    .add('instagram social button', () => ({
        ...wrapper,
        template: '<MSocialButton type="instagram"/>'
    }))

    .add('linkedin social button', () => ({
        ...wrapper,
        template: '<MSocialButton type="linkedin"/>'
    }))

    .add('personalise social button', () => ({
        ...wrapper,
        template: '<MSocialButton name="socialMedia" src="svg/instagram-brands.svg"/>'
    }))
