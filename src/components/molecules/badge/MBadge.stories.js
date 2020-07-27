import { storiesOf } from '@storybook/vue'
import MBadge from './MBadge.vue'
import AImage from '@/components/atoms/image/AImage.vue'

const wrapper = {
    components: { MBadge, AImage }
}

storiesOf('Molecules/Badges', module)
    .addParameters({ component: MBadge })

    .add("Badge default", () => ({
        ...wrapper,
        template:
            `<MBadge label="Un badge" src="https://img.icons8.com/dotty/80/000000/coffee.png" />`
    }))

    .add("Badge without text", () => ({
        ...wrapper,
        template:
        `<MBadge label="Un badge" src="https://img.icons8.com/dotty/80/000000/coffee.png" without-text />`
    }))

    .add("Badge horizontal", () => ({
        ...wrapper,
        template:
        `<MBadge label="Un badge" src="https://img.icons8.com/dotty/80/000000/coffee.png" horizontal />`
    }))
