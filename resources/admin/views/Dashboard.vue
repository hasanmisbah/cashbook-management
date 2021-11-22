<template>
<div ><h1>Hello</h1></div>
</template>

<script>
import {defineComponent, onMounted} from 'vue'
import Auth from "../Services/Auth";
export default defineComponent({
    name: 'Dashboard',
   setup(){
      onMounted(()=>{
       // Auth.user();
      })
   }
})
</script>
