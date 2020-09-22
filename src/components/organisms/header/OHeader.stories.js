import { storiesOf } from '@storybook/vue'
import { OHeader, MNavItem } from '@/entry'
import MLogo from '@/components/molecules/logo/MLogo.vue'


const wrapper = {
    components: { OHeader, MNavItem, MLogo }
}

storiesOf('Organisms/header', module)
    .add('Header default', () => ({
        ...wrapper,
        template:
            `<OHeader>
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

    .add('Header with logo SVG', () => ({
        ...wrapper,
        template:
            `<OHeader>
                <template #addLogo>
                    <MLogo>
                        <img src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />
                    </MLogo>
                </template>
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
