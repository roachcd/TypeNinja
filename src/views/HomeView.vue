<template>
  <div class="warning">
    <h1>Sadly, this game does not work on phone.</h1>
  </div>
  <div class="home">
    <h1>Type Ninja</h1>
    <br>
    <div style="margin-left: 150px;margin-right: 150px;">
      <letter v-for="(letter, index) in quotes[quote].excerpt">
        <cursor class="blink" v-if = "index == this.typed.length">|</cursor>
        <h2 class="right" v-if = "this.typed[index] == letter">{{ letter }}</h2>
        <h2 class="wrong" v-if = "this.typed[index] != letter && index < this.typed.length">{{ letter }}</h2>
        <h2 v-if = "index >= this.typed.length">{{ letter }}</h2>
      </letter>
  </div>
  <div class="aboutDiv">
    <h3 class="aboutBook">Title: {{ quotes[quote].title }}</h3><br>
    <h3 class="aboutBook">Author: {{ quotes[quote].author }}</h3>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { triggerRef } from 'vue';
import {useTimeStore} from '@/stores/time.js'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  created(){
    this.getTeams();
    this.getColor();
    const max = 5;
    const min = 0;
    this.quote = Math.floor(Math.random() * (max - min + 1)) + min;
    window.addEventListener('keydown', (e) => {
      if(e.key == 'Shift'){
        this.shift = true;
      }
      else if(e.key == 'Backspace'){
        this.typed = this.typed.substring(0, this.typed.length - 1)
      }
      else{
        if(this.shift){
          this.typed = this.typed + e.key.toUpperCase();
          this.shift = false;
        }
        else{
          this.typed = this.typed + e.key;
        }
        this.isDone();
      }
    });
  },
  data(){
        return {
            quotes:[

            ],
            quote: 1,
            typed: "",
            shift: false,
            startDate: 0,
            endDate: 0,
            wpm: 0
        };
    },
  methods: {
    async getTeams(){
            let res = await fetch('data/quotes.json'); ////Excerpts from shortstoryguide.com
            let data = await res.json();

            this.quotes = data;
        },
        async getColor(){
            let res = await fetch('data/colors.json');
            let data = await res.json();

            const colors = data;
            var r = document.querySelector(':root');
            const numberOfColors = 6;
            r.style.setProperty('--main', colors[Math.floor(Math.random() * numberOfColors)].hex);

            //overide color
            //r.style.setProperty('--main', "#1db36d");
        },
        isDone(){
            if(this.typed.length == 1){
              this.startDate = new Date().getTime(); //on first character create time instance with current time
              console.log(this.startDate);
            }
            if(this.typed.length == this.quotes[this.quote].excerpt.length){
              this.endDate = new Date().getTime(); //on last character create time instance with current time
              const time = (this.endDate - this.startDate) / 1000; //get time difference
              this.wpm = (this.quotes[this.quote].count) / ((time)/60);
              
              var correct = 0;
              for (let i = 0; i < this.typed.length; i++) {
                console.log(this.typed[i]);
                console.log(this.quotes[this.quote].excerpt[i]);
                if(this.typed[i] == this.quotes[this.quote].excerpt[i]){
                  correct = correct + 1;
                }
              }
              const accuracy = (correct/this.quotes[this.quote].excerpt.length)*100;

              const timeStore = useTimeStore();

              timeStore.setWpm(this.wpm); 
              timeStore.setAccuracy(accuracy);

              this.$router.push({ path: '/done' })
            }
        }
  }
}
</script>

<style>
  :root {
      --main: #0398fc;
      --second: #0398fc;
  }
  body{
    background-color: #14120D;
  }
  h1{
    color: var(--main);
    font-size: 50px;
  }
  h2{
    color: gray;
    display: inline;
  }
  .wrong{
    color:rgb(202, 0, 0);
  }
  .right{
    color:white;
  }
  cursor{
    color: orange;
    font-size: 20px;
    position: relative;
    top: -2px;
    width: 0px;
    display: inline;
    margin: -2px;
  }
  @keyframes blink {  
    0% { color: var(--main); }
    50% { color: black; }
    100% { color: var(--main); }
  }
  @-webkit-keyframes blink {
      0% { color: var(--main); }
      50% { color: black; }
      100% { color: var(--main); }
  }
  .blink {
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    animation: blink 1s linear infinite;
  } 

  a{
    border: 2px var(--main) solid;
    padding: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: large;
    color: var(--main);
    margin-top: 50px;
    display: inline-block;
    transition: .3s;
    text-decoration: none;
  }
  a:hover{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);   
    cursor: pointer;
  }
  .aboutBook{
    float: left;
    text-align: left;
    color: gray;
    font-size: small;
    font-weight: lighter;
    margin: 0px;
  }
  .aboutDiv{
    position: fixed;
    bottom: 30px;
  }
  .warning{
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    color: white;
    background-color: #14120D;
    z-index: 99;
  }
  @media all and (max-width: 631px){
    .warning{
      display: block;
    }
  }
</style>