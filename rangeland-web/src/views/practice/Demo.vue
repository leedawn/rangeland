<template>
<div class="ui bottom attached tab segment active" data-tab="demo">
    <div id="demo" v-bind:style="{color:activeColor}">
        {{message}}
        {{reversedMessage}}
        <div v-if="loginType==='username'">
            <label>username</label>
        </div>
        <div v-else>
            <label>email</label>
        </div>
        <div>
            <ul>
                <li v-for="value in object" v-bind:key="value.id">
                    {{value}}
                </li>
            </ul>
        </div>
        <div>
            <button v-on:click="say('hi')">say hi</button>
        </div>
        <div>
            <input v-model="age" placeholder="edit me">
            {{age}}
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'demo',
  data () {
    return {
      message: 'hello vue!',
      activeColor: 'red',
      loginType: 'name',
      object: {
        title: 'how to learn english',
        author: 'xiaohong'
      },
      age: 0
    }
  },
  computed: {
    reversedMessage () {
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    say (info) {
      alert(info)
    }
  }
}
</script>

<style scoped>

</style>
