import { storiesOf } from '@storybook/vue'
import MCard from './MCard.vue'

const wrapper = {
    components: { MCard }
}

storiesOf('Molecules/Card', module)
    .addParameters({ component: MCard })

    .add("Card simple", () => ({
        ...wrapper,
        template:
            `<MCard><p>Voici une Card simple</p></MCard>`
    }))

    .add("Card link", () => ({
        ...wrapper,
        template:
            `<MCard isLink to="contact"> Voici une Card link</MCard>`
    }))

    .add("Card sans anim", () => ({
        ...wrapper,
        template:
            `<MCard noAnim to="contact"> Une card encore plus simple</MCard>`
    }))
