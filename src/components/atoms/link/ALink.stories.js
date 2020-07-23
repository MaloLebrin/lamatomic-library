import { storiesOf } from '@storybook/vue'
import ALink from './ALink.vue'

const wrapper = {
    components: { ALink }
}

storiesOf('Atoms/Link', module)
    .addParameters({ component: ALink })

    .add('Internal', () => ({
        ...wrapper,
        template:
            '<ALink to="contact" title="Me rendre au formulaire de contact">Lien vers la page contact</ALink>'
    }))

    .add('External', () => ({
        ...wrapper,
        template:
            '<ALink href="https://www.leroymerlin.fr/v3/p/produits/lien-alu-fou-argent-5-m-geolia-e167177">Lien alu-fou</ALink>'
    }))

    .add('Tel', () => ({
        ...wrapper,
        template:
            '<ALink tel href="01 23 45 67 89">Lien téléphone français</ALink>'
    }))

    .add('Mail', () => ({
        ...wrapper,
        template: '<ALink mail href="lamavert@lamacompta.co">Lien mail</ALink>'
    }))

    .add('No Line', () => ({
        ...wrapper,
        template: '<ALink href="#" no-line>Lien non souligné</ALink>'
    }))
