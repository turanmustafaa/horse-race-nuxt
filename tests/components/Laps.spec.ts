// import { mount } from '@vue/test-utils'
// import { describe, it, expect, vi } from 'vitest'
// import HorseList from '@/components/HorseList.vue'
// import { useHorseStore } from '@/stores/useHorseStore'
// import { createTestingPinia } from '@pinia/testing'

// describe('HorseList.vue', () => {
//   it('render horselist', () => {
//     const wrapper = mount(HorseList, {
//       global: {
//         plugins: [createTestingPinia({
//           initialState: {
//             horseStore: {
//               horses: [
//                 { id: 1, name: 'Thunder', color: 'gray', condition: 80 },
//                 { id: 2, name: 'Blaze', color: 'black', condition: 90 }
//               ]
//             }
//           },
//           stubActions: false,
//         })]
//       }
//     })

//     expect(wrapper.findAll('.item').length).toBe(2)
//     expect(wrapper.html()).toContain('Thunder')
//     expect(wrapper.html()).toContain('Blaze')
//   })

//   it('render when no avaible', () => {
//     const wrapper = mount(HorseList, {
//       global: {
//         plugins: [createTestingPinia({
//           initialState: {
//             horseStore: { horses: [] }
//           },
//           stubActions: false,
//         })]
//       }
//     })

//     expect(wrapper.text()).toContain('No horses available')
//   })
// })
