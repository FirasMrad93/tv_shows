import { shallowMount } from '@vue/test-utils'
import ShowDetails from '@/views/ShowDetails.vue'
import fetchMock from 'jest-fetch-mock';
import shows from './shows.json'

jest.mock('vue-router', () => ({
    useRoute: jest.fn(() => ({ name: 'ShowDetails', params: { id: 1 } }))
}))


test('Show details', () => {
    fetchMock.mockResponseOnce(JSON.stringify(shows[0]), { status: 200 });

    const wrapper = shallowMount(ShowDetails)
    wrapper.vm.$nextTick(() => {
        expect(wrapper.text()).toContain('Under the Dome')
    })

})