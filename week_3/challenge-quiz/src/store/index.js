import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      category: "20",
      qty: 10,
      nickname: ""
    },
    currentQuiz: {
      isFetching: false,
      quizJson: {},
      step: 0
    },
    stats: {
      errors: 0,
      started: false
    }
  },

  getters: {
    isFetching: state => state.currentQuiz.isFetching,

    getName: state => state.config.nickname,

    getChallenge: state => {
      var currentQuiz = state.currentQuiz.quizJson[state.currentQuiz.step];
      if (currentQuiz) {
        var allAnswer = currentQuiz.incorrect_answers;
        allAnswer.push(currentQuiz.correct_answer);
        allAnswer = shuffle(allAnswer);
        currentQuiz["all_answers"] = allAnswer;
      }

      return currentQuiz;
    },

    getSteps: state => {
      return {
        current: state.currentQuiz.step + 1,
        total: Object.values(state.currentQuiz.quizJson).length
      };
    },

    getStats: state => state.stats
  },

  mutations: {
    startFetching(state) {
      state.currentQuiz.isFetching = true;
      state.stats.started = true;
    },
    stopFetching(state) {
      state.currentQuiz.isFetching = false;
    },
    setQty(state, qty) {
      state.config.qty = qty;
    },
    setNik(state, nickname) {
      state.config.nickname = nickname;
    },
    setQuiz(state, quizJson) {
      state.currentQuiz.quizJson = quizJson;
      state.currentQuiz.step = 0;
      state.stats.errors = 0;
    },
    passStep(state) {
      state.currentQuiz.step++;
    },
    addError(state) {
      state.stats.errors++;
    }
  },
  actions: {
    async fetchData({ commit }) {
      commit("startFetching");
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=" +
            this.state.config.qty +
            "&category=20"
        );
        const json = await res.json();
        commit("setQuiz", json.results); // -> 'r/mutateLinks'

        commit("stopFetching");
      } catch (e) {
        console.log(e);
        commit("stopFetching");
      }
    }
  },
  modules: {}
});

//Support functions
var shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
