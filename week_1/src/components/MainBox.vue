<template>
  <div>
    <!--Form-->
    <div
      class="w-1/2 m-auto p-6 shadow flex flex-col justify-between bg-blue-100 border border-blue-200 rounded"
    >
      <form>

        <div class="flex flex-wrap justify-center items-center">
          <label class="w-full pb-3" for="textMessage">Insert your message below</label>
          <textarea
            name="textMessage"
            class="w-full border border-blue-400 focus:border-none shadow px-3 py-2 mb-3 rounded"
            v-model.trim="messageToSubmit"
          ></textarea>

          <div class="w-full flex justify-end  items-center mb-3">
            <div
              class=" "
              :class="{
                'font-bold text-red-700': !canSubmit()
              }"
            >
              {{ countCharacters() }} character
              <span v-if="Math.abs(countCharacters()) > 1" >
                s
              </span> left
            </div>
            <button
              class="px-3 py-2 ml-3 border rounded bg-blue-600 text-blue-100 border-blue-800 hover:bg-blue-900 hover:text-gray-200"
              :disabled="!canSubmit()"
              :title="getButtonTitle()"
              :class="{
                'cursor-not-allowed opacity-25': !canSubmit()
              }"
              @click.prevent="addMessage"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

    </div>

    <!--List-->
    <div
      class="w-1/2 m-auto mt-6" v-if=" hasMessages() ">
      <div class="py-2 font-bold ">Latest messages</div>
      <div class="">

        <div class="shadow py-2 px-3 mb-2 shadow overflow-auto" v-for="message in messageList" :key="message.id">
          <div>Posted @ {{ message.time }}</div>
          <textarea class="w-full" readonly :value="message.text">

          </textarea>
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
      textLimit: 255,
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

    getButtonTitle() {
      var message = "click to submit";
      if(this.countCharacters()<0) {
          message = "Exceeeding by " + Math.abs(this.countCharacters()) + " characters";
      }
      return message;
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