import { storiesOf } from '@storybook/vue'
import { OPartners, MPartner } from '@/entry'

const wrapper = {
    components: { OPartners, MPartner }
}

storiesOf('Organisms/Partners', module)
    .add('Default', () => ({
        ...wrapper,

        template: `<OPartners>
                        <MPartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />
                        <MPartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />
                    </OPartners>`
    }))

    .add('Vertical', () => ({
        ...wrapper,

        template: `<OPartners :horizontal="false">
                        <MPartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />
                        <MPartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />
                    </OPartners>`
    }))
