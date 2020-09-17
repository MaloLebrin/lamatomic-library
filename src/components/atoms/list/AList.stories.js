import { storiesOf } from '@storybook/vue'
import getMountedComponent from '@/utils.ts'
import AList from './AList.vue'
import AListItem from './AListItem.vue'

const wrapper = {
    components: { AList, AListItem }
}

const item1 = getMountedComponent(AListItem, {}, {default: 'premier item'})
const item2 = getMountedComponent(AListItem, {}, {default: 'deuxième item'})
const item3 = getMountedComponent(AListItem, {}, {default: '3eme item'})

const items = [item1, item2, item3]

storiesOf('Atoms/List', module)
    .addParameters({ component: AList})

    .add('Vertical with chips (default)', () => ({
        ...wrapper,
        template: `<AList :items="items"></AList>`,
        data () {
            return {
                items
            }
        }
    }))

    .add('Vertical without chips', () => ({
        ...wrapper,
        template: '<AList :items="items" withoutChips></AList>',
        data() {
            return {
                items
            }
        }
    }))

    .add('Vertical, no chips, no padding', () => ({
        ...wrapper,
        template: '<AList :items="items" withoutChips noPadding></AList>',
        data() {
            return {
                items
            }
        }
    }))

    .add('Horizontal with chips', () => ({
        ...wrapper,
        template: `<AList :items="items" horizontal></AList>`,
        data() {
            return {
                items
            }
        }
    }))

    .add('Horizontal without chips', () => ({
        ...wrapper,
        template: `<AList :items="items" horizontal withoutChips></AList>`,
        data() {
            return {
                items
            }
        }
    }))

    .add('Horizontal, no chips, no padding', () => ({
        ...wrapper,
        template: `<AList :items="items" horizontal withoutChips noPadding></AList>`,
        data() {
            return {
                items
            }
        }
    }))
