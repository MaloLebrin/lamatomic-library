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

const socialButton1 = getMountedComponent(MSocialButtonInstagram, {})
const socialButton2 = getMountedComponent(MSocialButtonLinkedin, {})
const socialButton3 = getMountedComponent(MSocialButtonTwitter, {})
const socialButton4 = getMountedComponent(MSocialButtonFacebook, {})

const socialButtonItems = [socialButton1, socialButton2, socialButton3, socialButton4]

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
    .addParameters({ component: OFooter })

    .add('Default, 3 columns', () => ({
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

    .add('Default, 2 columns', () => ({
        ...wrapper,
        data() {
            return {
                items,
                socialButtonItems
            }
        },
        template: `
            <OFooter>
                <template #ccol-1><AText>© Copyright 2020</AText></template>
                <template #col-3>
                    <MNavbar :items="items" :horizontal="false" />
                </template>
            </OFooter>
        `
    }))

    .add('Default, 1 column', () => ({
        ...wrapper,
        data() {
            return {
                items,
                socialButtonItems
            }
        },
        template: `
            <OFooter>
                <template #ccol-1><AText>© Copyright 2020</AText></template>
            </OFooter>
        `
    }))

    .add('1 col without scrollToTop', () => ({
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

