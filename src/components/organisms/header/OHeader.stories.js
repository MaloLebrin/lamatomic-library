import { storiesOf } from '@storybook/vue'
import { OHeader, MNavItem } from '@/entry'

const wrapper = {
    components: { OHeader, MNavItem }
}

storiesOf('Organisms', module)
    .add('Header', () => ({
        ...wrapper,
        template:
            `<OHeader srcLogo="https://lamacompta.co/wp-content/uploads/2020/06/Logo-lamacompta-blanc-SVG.svg">
                <template #navBarItems>
                    <MNavItem>
                        <button>Bonjour 1</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 2</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 3</button>
                    </MNavItem>
                </template>
            </OHeader>`
    }))

