<template>
  <div class="done">
    <h1>Type Ninja</h1>
    <h2>WPM: {{this.wpm}}</h2><br>
    <h2>Accuracy: {{ this.accuracy }}%</h2><br>
    <a href="/typeninja">Play Again</a>
  </div>
</template>

<script>

import {useTimeStore} from '@/stores/time.js'

export default {
    name: 'Done',
    data(){
      return{
        wpm: -1,
        accuracy: -1
      }
    },
    created(){
    },
    mounted(){
      const timeStore = useTimeStore()
      this.wpm = Math.round(timeStore.time.wpm);
      this.accuracy = Math.round(timeStore.time.accuracy);
    }
  }
</script>
