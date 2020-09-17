import { storiesOf } from '@storybook/vue'
import AList from './AList.vue'
import AListItem from './AListItem.vue'

const wrapper = {
    components: { AList, AListItem }
}

storiesOf('Atoms/List', module)
    .addParameters({ component: AList})

    .add('Vertical with chips (default)', () => ({
        ...wrapper,
        template: `<AList>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                    </AList>`,
    }))

    .add('Vertical without chips', () => ({
        ...wrapper,
        template: `<AList withoutChips>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                    </AList>`,
    }))

    .add('Vertical, no chips, no padding', () => ({
        ...wrapper,
        template: `<AList withoutChips noPadding>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                    </AList>`,
    }))

    .add('Horizontal with chips', () => ({
        ...wrapper,
        template: `<AList horizontal>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                    </AList>`,
    }))

    .add('Horizontal without chips', () => ({
        ...wrapper,
        template: `<AList horizontal withoutChips>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                    </AList>`,
    }))

    .add('Horizontal, no chips, no padding', () => ({
        ...wrapper,
        template: `<AList horizontal withoutChips noPadding>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                        <AListItem>default</AListItem>
                    </AList>`,
    }))
