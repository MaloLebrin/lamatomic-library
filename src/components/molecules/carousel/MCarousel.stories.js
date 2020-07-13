import { storiesOf } from '@storybook/vue'
import MCarousel from './MCarousel.vue'

const wrapper = {
    components: { MCarousel }
}

storiesOf('Molecules/Carousel', module)
    .add('Default', () => ({
        ...wrapper,
        template: 
        `<MCarousel>
            <carousel :per-page="1" :mouse-drag="false">
                <slide>
                    <slot>première slide</slot>
                </slide>
                <slide>
                    <slot></slot>
                </slide>
            </carousel> 
        </MCarousel>`
    }))
    .add('Default', () => ({
        ...wrapper,
        template: 
        `<MCarousel>
            <carousel :per-page="1" :mouse-drag="false">
                <slide>
                    <slot>première slide</slot>
                </slide>
                <slide>
                    <slot></slot>
                </slide>
            </carousel> 
        </MCarousel>`
    }))

