import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Index from '../index'
import { createStore } from '../../store'
import { resolvePromises } from './test-utils'

let wrapper, store

describe('index.vue', () => {
    beforeEach(() => {
        store = createStore()
    })

    it('...page rendering', async () => {
        wrapper = await renderComponent()
        expect(wrapper.text()).toContain("Ici la superbe page d'accueil")
    })
})

async function renderComponent() {
    const route = {
        path: '/'
    }
    store.state.route = route

    const wrapper = shallowMount(Index, {
        store,
        mocks: {
            $route: route
        },
        stubs: { NuxtLink: RouterLinkStub }
    })

    // wrapper.vm.$options.asyncData({ store, route })
    await resolvePromises()

    return wrapper
}
