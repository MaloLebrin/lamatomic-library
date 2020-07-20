import { storiesOf } from '@storybook/vue'
import { getMountedComponent } from '@/utils'
import { OFooter, MSocialButtonInstagram, MSocialButtonLinkedin, MSocialButtonTwitter, MSocialButtonFacebook, MNavbar, AList, ALink, AText } from '@/entry'

const wrapper = {
    components: {
        AText,
        AList,
        OFooter,
        MNavbar
     }
}

const SocialButton1 = getMountedComponent(MSocialButtonInstagram, {})
const SocialButton2 = getMountedComponent(MSocialButtonLinkedin, {})
const SocialButton3 = getMountedComponent(MSocialButtonTwitter, {})
const SocialButton4 = getMountedComponent(MSocialButtonFacebook, {})

const socialButtonItems = [SocialButton1, SocialButton2, SocialButton3, SocialButton4]

const link1 = getMountedComponent(
    ALink,
    { href: 'https://bananas.com/' },
    { default: 'Our Bananas' }
)

const link2 = getMountedComponent(
    ALink,
    { href: 'https://kiwis.com/' },
    { default: 'Our Kiwis' }
)

const link3 = getMountedComponent(
    ALink,
    { href: 'https://oranges.com/' },
    { default: 'Our Oranges' }
)

const items = [link1, link2, link3]

storiesOf('Organisms/Footer', module)
    .add('Default, 3 colonnes', () => ({
        ...wrapper,
        data() {
            return {
                items,
                socialButtonItems
            }
        },
        template: `
        <OFooter>
            <template #col-1><AText>© Copyright 2020</AText></template>
            <template #col-2>
                <div>
                    <AList :items="socialButtonItems" :horizontal="true" without-chips />
                </div>
            </template>
            <template #col-3>
                <MNavbar :items="items" :horizontal="false" />
            </template>
        </OFooter>
        `
    }))

    .add('Default, 2 colonnes', () => ({
        ...wrapper,
        data() {
            return {
                items,
                socialButtonItems
            }
        },
        template: `
        <OFooter>
            <template #col-1><AText>© Copyright 2020</AText></template>
            <template #col-3>
                <MNavbar :items="items" :horizontal="false" />
            </template>
        </OFooter>
        `
    }))

    .add('Default, 1 colonne', () => ({
        ...wrapper,
        data() {
            return {
                items,
                socialButtonItems
            }
        },
        template: `
        <OFooter>
            <template #col-1><AText>© Copyright 2020</AText></template>
        </OFooter>
        `
    }))

    .add('1 colonne without scrollToTop button', () => ({
        ...wrapper,
        data() {
            return {
                items,
                socialButtonItems
            }
        },
        template: `
        <OFooter withoutScrollToTop>
            <template #col-1><AText>© Copyright 2020</AText></template>
        </OFooter>
        `
    }))
