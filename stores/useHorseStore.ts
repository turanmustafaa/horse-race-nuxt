import { defineStore } from 'pinia'
import type IHorse from '@/types/IHorse'
import { makeColor } from '@/utils/makeColor'

export const useHorseStore = defineStore('horseStore', {
  state: () => ({
    horses: [] as IHorse[],
    runHorses: [] as IHorse[],
    laps: [200,300,400,500,600,700],
    playState : false,
    currentLap : 0,
    isLapDone :false,
    isFinish : false,
    lapWinnerList : [] as IHorse[],
    totalWinnerList : [] as Array<IHorse[]>,
    programList: [] as IHorse[][],
    isGenarated : false,
    resetProgram : false
  }),
  actions: {
    async fetchHorses() {
      try {
        const res = await fetch('https://json-server-vercel-ten-pink.vercel.app/horses')
        const data = await res.json()

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
      let list = this.runHorses
      this.programList.push(list); // burada lap kazananlarını listeye ekliyorum
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
    
            //pozisyonu max currentlap kadar yapıyorum boylelikle atlar 200 u gecerse bile duruyor
            if (newPosition > this.laps[this.currentLap]) {
              newPosition = this.laps[this.currentLap];
            }
    
            // burada currentlapı geçmiş ve winnerlistte yoksa ekliyorum
            if (
              newPosition >= this.laps[this.currentLap] &&
              this.lapWinnerList.filter((h) => h.id === horse.id).length === 0 &&
              !this.lapWinnerList.includes(horse)
            ) {
              this.lapWinnerList.push(horse);
            }
    
            // eger pozisyonu currentlapa esit veya buyukse yeni pozisyonu currentlapa atiyorum
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
  },
  runIsGenarated() {
      this.isGenarated = !this.isGenarated
  },
  changeResetProgramVal(){
    this.resetProgram = !this.resetProgram
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
