import { addParameters } from '@storybook/vue'

addParameters({
  themes: [
    { name: 'default', color: '#000000' },
    { name: 'lamacompta', class: 'lamatheme', color: '#009CDE', default: true }
  ],
});
