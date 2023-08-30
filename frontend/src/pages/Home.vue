<template>
  <div>title: {{ title }}</div>
  <div>name: {{ fullName }}</div>
  <div>sex: {{ person.sex }}</div>
  <div>age: {{ person.age }}</div>
  <div v-if="person.phone">phone: {{ person.phone }}</div>
  <button @click="addAge">Add Age</button>
  <button @click="addPhone">Add Phone</button>
  <button @click="addTitle">Add Title</button>
  <button @click="jumpPage('/settings')">To Settings Page</button>
  <button @click="jumpPage('/login')">To Login Page</button>
</template>

<script>
import { ref, reactive, computed } from "vue";

export default {
  name: "Home",
  setup() {
    const title = ref("Home Page")
    const person = reactive({
      firstName: "Karber",
      lastName: "Lee",
      sex: "male",
      age: 0
    })

    const computeds = {
      fullName: computed(()=>{
        return person.firstName + ' ' + person.lastName
      })
    }

    const methods = {
      addAge() {
        person.age++
      },
      addPhone() {
        person.phone = 12345
      },
      addTitle() {
        console.log(title.value)
        title.value += "1";
        console.log(title.value)
      },
      jumpPage(path) {
        this.$router.push(path)
      },
    }

    return {
      title,
      person,
      ...computeds,
      ...methods
    }
  }
}
</script>

<style>

</style>