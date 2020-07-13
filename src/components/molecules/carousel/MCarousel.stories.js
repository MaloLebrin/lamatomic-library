import { storiesOf } from '@storybook/vue'
import { getMountedComponent } from '@/utils'
import { MCarousel, AImage } from '@/entry'


const wrapper = {
    components: { MCarousel }
}
const image1 = getMountedComponent(AImage,
     { src: require("../logo/svg/logo-white-inline.svg")}, 
     { alt: "logodefault"}
)
const image2 = getMountedComponent(AImage, 
    { src: require("../logo/svg/logo-white.svg")}, 
    { alt: "inline" }
)

const slides = [image1, image2]

storiesOf('Molecules/Carousel', module)
    .add('Default', () => ({
        ...wrapper,
        data() {
            return {
                slides
            }

        },
        template: 
        `<MCarousel :slides="slides" />`
    }))

