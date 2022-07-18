import { mount, shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import Paginator from 'primevue/paginator';
import App from '@/App.vue'
import ShowCard from '@/components/ShowCard.vue'
import fetchMock from 'jest-fetch-mock';
import shows from './shows.json'


test('App component', async () => {
    const wrapper = shallowMount(App)
    expect(wrapper.text()).toContain('TV SHOWS')
})

test('homeview showing paginator', async () => {
    fetchMock.mockResponseOnce('', { status: 200 });

    const wrapper = shallowMount(HomeView)
    const paginator = wrapper.getComponent(Paginator)

    expect(paginator).toBeDefined()
})

test('homeview showing cards', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(shows));

    const wrapper = shallowMount(HomeView)
    wrapper.vm.$nextTick(() => {
        const card = wrapper.getComponent(ShowCard)
        const cards = wrapper.findAllComponents(ShowCard)
        expect(card).toBeDefined()
        expect(cards.length).toBe(9)
        expect(wrapper.text()).toContain('Under the Dome')
        expect(wrapper.text()).toContain('Person of Interest')
        expect(wrapper.text()).toContain('Bitten')
        expect(wrapper.text()).toContain('Arrow')
        expect(wrapper.text()).toContain('True Detective')
        expect(wrapper.text()).toContain('Scripted')
        expect(wrapper.text()).toContain('Homeland')
        expect(wrapper.text()).toContain('Glee')
        expect(wrapper.text()).toContain('Revenge')
    })

})