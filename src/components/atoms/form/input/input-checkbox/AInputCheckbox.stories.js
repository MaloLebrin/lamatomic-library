import { storiesOf } from '@storybook/vue'
import AInputCheckbox from './AInputCheckbox.vue'

const wrapper = {
    components: { AInputCheckbox }
}

storiesOf('Atoms/Form/Inputs/Checkbox', module)
    .add('Single', () => ({
        ...wrapper,
        template: `
            <div>
                <label>
                    <AInputCheckbox v-model="selectedValue" value="accept" checked />
                    Do you accept to eat a lot of bananas?
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

    .add('Multiple choices', () => ({
        ...wrapper,
        template: `
            <div style="display: flex; flex-direction: column;">
                <p>What are my favorite animals?</p>
                <label style="margin-bottom: 1rem;">
                    <AInputCheckbox v-model="selectedValues" value="koala" />
                    Koala 🐨
                </label>

                <label style="margin-bottom: 1rem;">
                    <AInputCheckbox v-model="selectedValues" value="lama" />
                    Lamaaa 🦙
                </label>

                <label style="margin-bottom: 1rem;">
                    <AInputCheckbox v-model="selectedValues" value="giraffe" />
                    Giraffe 🦒
                </label>

                <p>Choice{{ selectedValues.length > 1 ? "s are" : " is" }} : {{ selectedValues }}</p>
            </div>
        `,
        data() {
            return {
                selectedValues: ['koala', 'giraffe']
            }
        }
    }))
