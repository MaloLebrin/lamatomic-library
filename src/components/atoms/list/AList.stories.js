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
                        <AListItem>Lapin 🐇</AListItem>
                        <AListItem>Banane 🍌</AListItem>
                        <AListItem>Papier toilette 🧻</AListItem>
                    </AList>`,
    }))

    .add('Vertical without chips', () => ({
        ...wrapper,
        template: `<AList withoutChips>
                        <AListItem>Hérisson 🦔</AListItem>
                        <AListItem>Pique ♠</AListItem>
                        <AListItem>Kamoulox 💩</AListItem>
                    </AList>`,
    }))

    .add('Vertical, no chips, no padding', () => ({
        ...wrapper,
        template: `<AList withoutChips noPadding>
                        <AListItem>Ohohoh</AListItem>
                        <AListItem>Héhéhé</AListItem>
                        <AListItem>Hihihi</AListItem>
                    </AList>`,
    }))

    .add('Horizontal with chips', () => ({
        ...wrapper,
        template: `<AList horizontal>
                        <AListItem>Poisson 🐠</AListItem>
                        <AListItem>Rouge 🟥</AListItem>
                        <AListItem>La mer 🌊</AListItem>
                        <AListItem>Coquillage 🐚</AListItem>
                    </AList>`,
    }))

    .add('Horizontal without chips', () => ({
        ...wrapper,
        template: `<AList horizontal withoutChips>
                        <AListItem>Evènement 📅</AListItem>
                        <AListItem>Contact 📞</AListItem>
                        <AListItem>Protection 😷</AListItem>
                    </AList>`,
    }))

    .add('Horizontal, no chips, no padding', () => ({
        ...wrapper,
        template: `<AList horizontal withoutChips noPadding>
                        <AListItem>Concert 🎙</AListItem>
                        <AListItem>Evènement 📅</AListItem>
                        <AListItem>Contact 📞</AListItem>
                        <AListItem>Protection 😷</AListItem>
                    </AList>`,
    }))
