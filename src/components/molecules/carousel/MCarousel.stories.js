import { storiesOf } from '@storybook/vue'
import { getMountedComponent } from '@/utils'
import { MCarousel, AImage } from '@/entry'

const wrapper = {
    components: { MCarousel }
}

const wrapCarousel = (content) => {
    return '<div style="width: 750px">' + content + '</div>'
}

const image1 = getMountedComponent(
    AImage,
    { src: "https://placehold.it/400x150" },
    { alt: "logodefault" }
)

const image2 = getMountedComponent(
    AImage,
    { src: "https://placehold.it/350x150" },
    { alt: "inline" }
)

const image3 = getMountedComponent(
    AImage,
    { src: "https://placehold.it/350x200" },
    { alt: "inline" }
)

const slides = [image1, image2, image3]

storiesOf('Molecules/Carousel', module)
    .addParameters({ component: MCarousel })

    .add('Default', () => ({
        ...wrapper,
        data() {
            return {
                slides
            }
        },
        template: wrapCarousel(`<MCarousel :slides="slides" />`)
    }))

    .add('With nav buttons', () => ({
        ...wrapper,
        data() {
            return {
                slides
            }
        },
        template: wrapCarousel(`<MCarousel :slides="slides" nav-buttons />`)
    }))

    .add('With dots', () => ({
        ...wrapper,
        data() {
            return {
                slides
            }
        },
        template: wrapCarousel(`<MCarousel :slides="slides" dots />`)
    }))

    .add('With autoplay', () => ({
        ...wrapper,
        data() {
            return {
                slides
            }
        },
        template: wrapCarousel(`<MCarousel :slides="slides" autoplay />`)
    }))
