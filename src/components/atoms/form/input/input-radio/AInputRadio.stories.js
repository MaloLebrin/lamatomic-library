import { storiesOf } from '@storybook/vue'
import AInputRadio from './AInputRadio.vue'
const wrapper = {
    components: { AInputRadio }
}

storiesOf('Atoms/Form/Inputs', module)
    .addParameters({ component: AInputRadio })

    .add('Radio', () => ({
        ...wrapper,
        template: `
        <div>
            <label>
            <AInputRadio name="fruit" v-model="selectedValue" value="banana" />
            Banana 🍌
            </label>

            <label>
            <AInputRadio name="fruit" v-model="selectedValue" value="strawberry" checked />
            Strawberry 🍓
            </label>

            <label>
            <AInputRadio name="fruit" v-model="selectedValue" value="kiwi" />
            Kiwi 🥝
            </label>

            <br/><br/>

            Value is: {{ selectedValue }}
        </div>
        `,

        data() {
            return {
                selectedValue: null
            }
        }
    }))
