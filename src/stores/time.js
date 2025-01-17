import {ref, computed} from 'vue'
import { defineStore } from 'pinia'

export const useTimeStore = defineStore('time', () => {
  const time = ref({
    time: 0,
    wpm: 0,
    accuracy: 0
  });

  const setTime = (newTime) => {
    time.value.time = newTime;
  };

  const setWpm = (newWpm) => {
    time.value.wpm = newWpm;
  };

  const setAccuracy = (accuracy) => {
    time.value.accuracy = accuracy;
  };

  return{
    time,
    setTime,
    setWpm,
    setAccuracy
  }
});