import { storiesOf } from '@storybook/vue'
import ASelectImage from './ASelectImage.vue'

const wrapper = {
  components: { ASelectImage }
}

storiesOf('Atoms/Form/Selects', module)
    .addParameters({ component: ASelectImage })

    .add('Select Image', () => ({
        ...wrapper,
        template: `
        <div>
            <ASelectImage v-model="imageValue"
            :options="imageOptions"
            label="title"
            track-by="title"
            :show-labels="false" />

        </div>`,
        data () {
            return {
                imageOptions: [
                    {
                      title: "Random image",
                      desc: "Lorem ipsum dolo",
                      img: "https://picsum.photos/300/150"
                    },
                    {
                      title: "Cool image",
                      desc: "Accusantium veritatis nesciunt quaerat debitis",
                      img: "https://picsum.photos/300/151"
                    },
                    {
                      title: "Another cool one",
                      desc: "Sit amet consectetur adipisicing elit",
                      img: "https://picsum.photos/300/152"
                    }
                  ]
            }
        }
  }),)
