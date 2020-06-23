import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import your global components.
import AButton from '../components/atoms/button/AButton.vue';
import AImage from '../components/atoms/image/AImage.vue';
import ALink from '../components/atoms/link/ALink.vue';
import AList from '../components/atoms/list/AList.vue';
// import AText from '../components/atoms/text/AText.vue';

// Register global components.
Vue.component('AButton', AButton);
Vue.component('AImage', AImage);
Vue.component('ALink', ALink);
Vue.component('AList', AList);
// Vue.component('AText', AText);

// configure(require.context('../components/atoms', true, /\*\.js$/), module);
configure(require.context('../components', true, /\.stories\.js$/), module);
