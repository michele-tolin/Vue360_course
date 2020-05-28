<template>
  <div>
    <!--Form-->
    <div
      class="w-1/2 m-auto p-6 shadow flex flex-col justify-between bg-blue-300"
    >
      <form>
        <div class="flex justify-center items-center">
          <textarea
            name="textMessage"
            class="border border-blue-400 focus:border-none shadow px-3 py-2 mr-3"
            v-model.trim="messageToSubmit"
          ></textarea>
          <button
            class="px-3 py-2 border rounded bg-blue-800 text-blue-100 border-gray-500 hover:bg-blue-900 hover:text-gray-200"
            :disabled="!canSubmit()"
            :class="{
              'cursor-not-allowed': !canSubmit()
            }"
            @click.prevent="addMessage"
          >
            Submit
          </button>
        </div>
      </form>
      <div
        class="font-bold mt-3"
        :class="{
          'text-red-500': !canSubmit()
        }"
      >
        {{ countCharacters() }} of {{ textLimit }} character
       <span v-if="Math.abs(countCharacters()) > 1" >
          s
       </span> left
      </div>
    </div>

    <!--List-->
    <div
      class="w-1/2 m-auto mt-6" v-if=" hasMessages() ">
      <div class="py-2 font-bold ">Latest messages</div>
      <div class="">
        <div class="shadow py-2 mb-2 shadow" v-for="message in messageList" :key="message.id">

          {{ message.text }} @ {{ message.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainBox",

  data() {
    return {
      textLimit: 10,
      messageToSubmit: "",
      messageList: []
    };
  },

  methods: {
    countCharacters() {
      return this.textLimit - this.messageToSubmit.length;
    },
    leftCharacters() {
      return Math.max(0, this.countCharacters());
    },
    canSubmit() {
      return this.countCharacters() >= 0;
    },
    addMessage() {

      if(!this.canSubmit()) {
          return;
      }

      console.log('should add message')
      // Creating meessage to add
      var currentMessage = {}
      // Adding autofields
      currentMessage.time = Date.now();
      currentMessage.id = Math.random()+'__'+currentMessage.time;
      // Setting the text
      currentMessage.text = this.messageToSubmit;

      //Adding message to list
      this.messageList.push(currentMessage);

      //Clenaup the messageToSubmit for the next one
      this.messageToSubmit = '';
      document.querySelector('textarea[name="textMessage"]').focus();
    },

    hasMessages() {
        return this.messageList.length > 0;
    }
  }

}
</script>

<style scoped>

</style>