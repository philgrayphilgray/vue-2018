import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      steps: [
        {
          label: 'Make a selection',
          active: true,
          nextLabel: 'Review Order >>',
          component: 'Menu'
        },
        {
          label: 'Enter payment info',
          active: false,
          nextLabel: 'Order',
          component: 'Order'
        },
        {
          label: 'Pick up',
          active: false,
          nextLabel: 'Confirm Pickup',
          component: 'Pickup'
        }
      ],
      menu: [
        { label: 'Americano', price: 325 },
        { label: 'Herbal Tea', price: 300 },
        { label: 'Iced Latte', price: 400 },
        { label: 'Cold Brew', price: 400 }
      ],
      orders: [],
      tax: 0.1,
      currentOrder: {
        items: [],
        total: 0
      }
    },
    getters: {
      getSteps: state => state.steps,
      currentStep: state => state.steps.indexOf(state.steps.find(s => s.active))
    },
    mutations: {
      updateActiveStep(state) {
        const steps = [...state.steps];
        const currentIndex = this.getters.currentStep;
        const currentStep = steps[currentIndex];
        const nextStep = steps[currentIndex + 1];
        if (currentIndex < steps.length - 1) {
          currentStep.active = false;
          nextStep.active = true;
        }
        return state;
      },
      resetSteps(state) {
        const steps = [...state.steps];
        const currentIndex = this.getters.currentStep;
        const currentStep = steps[currentIndex];
        currentStep.active = false;
        steps[0].active = true;
        state.currentOrder = { items: [], total: 0 };
        return state;
      }
    },
    actions: {
      nextStep({ commit, state }, mutation) {
        switch (mutation) {
          default:
            commit('updateActiveStep');
        }
      }
    }
  });
};

export default createStore;
