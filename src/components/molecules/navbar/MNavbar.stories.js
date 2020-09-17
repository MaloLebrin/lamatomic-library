import { storiesOf } from '@storybook/vue'
import { MNavbar, MNavItem,  } from '@/entry'

const wrapper = {
    components: { MNavbar, MNavItem,  }
}

storiesOf('Molecules/Navbar', module)
    .addParameters({ component: MNavbar })

    .add('Default', () => ({
        ...wrapper,
        template: `<MNavbar>
                        <template #navItems>
                            <MNavItem>
                                <template #navItem>
                                    <Button>bonjour</Button>
                                </template>
                            </MNavItem>
                            <MNavItem>
                                <template #navItem>
                                    <Button>bonjour</Button>
                                </template>
                            </MNavItem>
                            <MNavItem>
                                <template #navItem>
                                    <Button>bonjour</Button>
                                </template>
                            </MNavItem>
                        </template>
                    </MNavbar>`
    }))

    .add('Vertical', () => ({
        ...wrapper,
        template: `<MNavbar :horizontal="false">
                        <template #navItems>
                            <MNavItem>
                                <template #navItem>
                                    <Button>bonjour</Button>
                                </template>
                            </MNavItem>
                            <MNavItem>
                                <template #navItem>
                                    <Button>bonjour</Button>
                                </template>
                            </MNavItem>
                            <MNavItem>
                                <template #navItem>
                                    <Button>bonjour</Button>
                                </template>
                            </MNavItem>
                        </template>
                </MNavbar>`
    }))
