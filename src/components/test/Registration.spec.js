/* eslint-disable */
import { shallowMount } from "@vue/test-utils"
import MainComponent from '../Registration'

describe('Registration.vue', () => {
    it('should have "Registration" as name', () => {
        expect(MainComponent.name).toBe('Registration');
    });
    it('should render correctly', () => {
        const wrapper = shallowMount(MainComponent);
        expect(wrapper.element).toMatchSnapshot();
    });
});