import { defineStore } from 'pinia'
import type IHorse from '@/types/IHorse'
import type { AxiosInstance } from 'axios'
import { makeColor } from '@/utils/makeColor'

export const useHorseStore = defineStore('horseStore', {
  state: () => ({
    horses: [] as IHorse[],
    runHorses: [] as IHorse[],
    laps: [200, 300, 400, 500, 600, 700],
    playState: false,
    currentLap: 0,
    isLapDone: false,
    isFinish: false,
    lapWinnerList: [] as IHorse[],
    totalWinnerList: [] as Array<IHorse[]>,
    programList: [] as IHorse[][],
    isGenarated: false,
    resetProgram: false,
    totalRunnedHorses: [] as IHorse[]
  }),
  actions: {
    async fetchHorses() {
      try {
        const { $axios } = useNuxtApp()
        const axiosInstance = $axios as AxiosInstance
        const res = await axiosInstance.get('/horses')
        const data = await res.data

        const updatedHorses = data.map((horse: IHorse) => ({
          ...horse,
          color: makeColor()
        }));

        this.horses = updatedHorses;
      } catch (error) {
        console.error('Error fetching horses:', error);
      }
    },
    generateRunHorses() {
      const shuffledHorses = [...this.horses].sort(() => 0.5 - Math.random());
      this.runHorses = shuffledHorses.slice(0, 10);
      this.runHorses = this.runHorses.map((horse: IHorse) => ({
        ...horse,
        lapTime: 0,
        startTime: Date.now()
      }));
      let list = this.runHorses
      this.programList.push(list);

    },
    changePlayState() {
      this.playState = !this.playState
    },
    updateHorsePosition(horseId: number) {
      if (this.playState) {
        this.runHorses = this.runHorses.map((horse) => {
          if (horse.id === horseId) {
            const randomNumber = Math.floor(Math.random() * (5 / 3));
            let newPosition = horse.position + (horse.condition / 10) + randomNumber * 2;

            if (newPosition > this.laps[this.currentLap]) {
              newPosition = this.laps[this.currentLap];
            }

            if (newPosition >= this.laps[this.currentLap] && this.lapWinnerList.filter((h) => h.id === horse.id).length === 0) {
              // o anki laptime'ı hesaplıyorum
              const currentLapTime = Number((Number(((Date.now() - horse.startTime) / 1000).toFixed(2)) / Number((this.laps[this.currentLap] / 200))).toFixed(2));
              // totalrunnedhorses'a daha once at eklendiyse average lap time hesaplıyorum
              const existingHorse = this.totalRunnedHorses.find(h => h.id === horse.id);

              if (existingHorse) {
                horse.lapTime = Number(((existingHorse.lapTime + currentLapTime) / 2).toFixed(2));

              } else {
                horse.lapTime = Number(currentLapTime.toFixed(2));
                this.totalRunnedHorses.push({ ...horse });
              }

              this.lapWinnerList.push(horse);
            }

            if (newPosition >= this.laps[this.currentLap]) {
              horse.position = this.laps[this.currentLap];
            }

            return {
              ...horse,
              position: newPosition,
            };
          }
          return horse;
        });

        const allHorsesFinished = this.runHorses.every(
          (horse) => horse.position >= this.laps[this.currentLap]
        );

        if (allHorsesFinished) {
          this.isLapDone = true;
          this.playState = false;
          this.addWinnersToTotal();
          this.generateRunHorses();
          this.runHorses.forEach((item) => (item.position = 0));
          this.setLap();
        }
      }
    },


    setLap() {
      if (this.isLapDone) {
        this.isLapDone = false;
        this.currentLap = this.currentLap + 1;
      }
    },
    addWinnersToTotal() {
      if (this.lapWinnerList.length > 0) {
        this.totalWinnerList.push([...this.lapWinnerList]);
        this.lapWinnerList = [];
      }
      if (this.totalWinnerList.length > 5) {
        this.gameIsFinished()
      }
    },
    runIsGenarated() {
      this.isGenarated = !this.isGenarated
    },
    changeResetProgramVal() {
      this.resetProgram = !this.resetProgram
    },
    gameIsFinished() {
      this.isFinish = !this.isFinish
    }
  },
  getters: {
    getAllHorses(state) {
      return state.horses;
    },
    getRunHorses(state) {
      return state.runHorses;
    },
    getLap(state) {
      return state.laps[this.currentLap];
    },
    getCurrentLap(state) {
      return state.currentLap;
    }
  },
});
