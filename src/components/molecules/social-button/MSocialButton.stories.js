import { storiesOf } from '@storybook/vue'
import MSocialButtonFacebook from './MSocialButton/MSocialButtonFacebook.vue'
import MSocialButtonTwitter from './MSocialButton/MSocialButtonTwitter.vue'
import MSocialButtonInstagram from './MSocialButton/MSocialButtonInstagram.vue'
import MSocialButtonLinkedin from './MSocialButton/MSocialButtonLinkedin.vue'


const wrapperFB = {
    components: { MSocialButtonFacebook }
}
const wrapperTwitter = {
    components: { MSocialButtonTwitter }
}
const wrapperInsta = {
    components: {  MSocialButtonInstagram }
}
const wrapperLinkedin = {
    components: {  MSocialButtonLinkedin }
}

storiesOf('Molecules/SocialButton', module)
    .add('Facebook', () => ({
        ...wrapperFB,
        template: '<MSocialButtonFacebook/>'
    }))

    .add('Twitter', () => ({
        ...wrapperTwitter,
        template: '<MSocialButtonTwitter />'
    }))

    .add('Instagram', () => ({
        ...wrapperInsta,
        template: '<MSocialButtonInstagram/>'
    }))

    .add('Linkedin', () => ({
        ...wrapperLinkedin,
        template: '<MSocialButtonLinkedin/>'
    }))
