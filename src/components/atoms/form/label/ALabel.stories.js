import { storiesOf } from '@storybook/vue'
import ALabel from './ALabel.vue'

const wrapper = {
    components: { ALabel }
}

storiesOf('Atoms/Form/Label', module)
    .add('Default as radio input', () => ({
        ...wrapper,
        template: `
            <div>
                Choose One of these options:
                <br/><br/>

                <ALabel>
                    <input type="radio" v-model="option" value="1" />
                    Option 1
                </ALabel>

                <ALabel>
                    <input type="radio" v-model="option" value="2" />
                    Option 2
                </ALabel>

                <ALabel>
                    <input type="radio" v-model="option" value="3" />
                    Option 3
                </ALabel>
            </div>
        `,
        data() {
            return {
                option: null
            }
        }
    }))

    .add('Required and HTML "for"', () => ({
        ...wrapper,
        template: `
            <div>
                <ALabel htmlFor="text-input" required>Full Name</ALabel>
                <input type="text" id="text-input" />
            </div>
        `
    }))
