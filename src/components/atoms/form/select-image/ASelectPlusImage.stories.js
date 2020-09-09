import { storiesOf } from '@storybook/vue'
import ASelectPlusImage from './ASelectPlusImage.vue'

const wrapper = {
  components: { ASelectPlusImage }
}

storiesOf('Atoms/Form/Selects', module)
    .addParameters({ component: ASelectPlusImage })

    .add('Select Image', () => ({
        ...wrapper,
        template: `
        <div>
            <ASelectPlusImage v-model="imageValue"
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
                      uri: "https://picsum.photos/300/150"
                    },
                    {
                      title: "Cool image",
                      desc: "Accusantium veritatis nesciunt quaerat debitis",
                      uri: "https://picsum.photos/300/151"
                    },
                    {
                      title: "Another cool one",
                      desc: "Sit amet consectetur adipisicing elit",
                      uri: "https://picsum.photos/300/152"
                    }
                  ]
            }
        }
  }),)
