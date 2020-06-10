<template>
  <div class="h-full">
    <transition name="entrance">
      <CentralBody :key="getSteps.current">
        <template slot="card">
          <div v-if="getChallenge" class="h-full flex flex-col justify-between">
            <div class="p-3" v-html="getChallenge.question"></div>

            <div class="flex justify-between items-center flex-wrap">
              <div
                class="w-2/5 p-1 m-2 rounded"
                v-for="(answer,idx) in getChallenge.all_answers"
                :key="idx"
                :class="{
            'opacity-50 bg-red-700 pointer-events-none': checked['idx_'+idx]!=null && checked['idx_'+idx] === false,
            'bg-green-400 pointer-events-none': checked['idx_'+idx]!=null && checked['idx_'+idx] === true
          }"
                @click="checkAnswer(idx)"
              >
                <Answer>
                  <div v-html="answer"></div>
                </Answer>
              </div>
            </div>

            <div class="p-3">
              <CustomButton v-if="founded">
                <div @click="checkToContinue">Go next</div>
              </CustomButton>
            </div>
          </div>
          <div v-else class="py-2">
            Ade has made some mess...
            <router-link
              to="/"
              tag="button"
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >Restart</router-link>
          </div>
        </template>
      </CentralBody>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Answer from "./Answer";
import CentralBody from "./CentralBody";
import CustomButton from "../components/CustomButton";

export default {
  components: {
    Answer,
    CentralBody,
    CustomButton
  },

  data() {
    return {
      checked: {},
      founded: false
    };
  },

  computed: {
    ...mapGetters(["getSteps", "getChallenge"]),
    isFinshed() {
      return this.getSteps.current === this.getSteps.total;
    }
  },
  methods: {
    ...mapMutations(["passStep", "addError"]),

    resetState() {
      this.checked = {};
      this.founded = false;
    },

    checkToContinue() {
      //console.log("if right goes to next step...");

      this.resetState();
      //console.log(this.isFinshed);
      if (this.isFinshed) {
        this.$router.push({ name: "HallOfFame" });
      } else {
        this.passStep();
        var currstep = this.getSteps.current;
        this.$router.push({
          name: "Quiz",
          params: { step: currstep }
        });
      }
    },
    checkAnswer(idx) {
      var isCorrect =
        this.getChallenge.all_answers[idx] == this.getChallenge.correct_answer;
      this.checked = {
        ...this.checked,
        ["idx_" + idx]: isCorrect
      };
      if (isCorrect) {
        this.founded = true;
      } else {
        this.addError();
      }

      //this.checked["idx_" + idx] =
      //  this.getChallenge.all_answers[idx] == this.getChallenge.correct_answer;
    }
  }
};
</script>

<style scoped>
/*** animation */
.entrance-enter-active {
  backface-visibility: visible !important;
  animation: backInRight 0.5s;
}
.entrance-leave-active {
  backface-visibility: visible !important;
  animation: backOutLeft 0.2s;
  position: absolute;
}

@-webkit-keyframes backInRight {
  0% {
    -webkit-transform: translateX(2000px) scale(0.7);
    transform: translateX(2000px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateX(0) scale(0.7);
    transform: translateX(0) scale(0.7);
    opacity: 0.7;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes backInRight {
  0% {
    -webkit-transform: translateX(2000px) scale(0.7);
    transform: translateX(2000px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateX(0) scale(0.7);
    transform: translateX(0) scale(0.7);
    opacity: 0.7;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes backOutLeft {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  20% {
    -webkit-transform: translateX(0) scale(0.7);
    transform: translateX(0) scale(0.7);
    opacity: 0.7;
  }

  to {
    -webkit-transform: translateX(-2000px) scale(0.7);
    transform: translateX(-2000px) scale(0.7);
    opacity: 0.7;
  }
}

@keyframes backOutLeft {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  20% {
    -webkit-transform: translateX(0) scale(0.7);
    transform: translateX(0) scale(0.7);
    opacity: 0.7;
  }

  to {
    -webkit-transform: translateX(-2000px) scale(0.7);
    transform: translateX(-2000px) scale(0.7);
    opacity: 0.7;
  }
}
</style>
