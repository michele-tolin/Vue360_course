<template>
  <div id="app">
    <div id="nav" class="flex justify-between shadow mb-6 items-center p-3">
      <router-link class="w-1/4 text-left" to="/">Home</router-link>
      <div class="text-4xl">My photography gears</div>
      <router-link
        class="w-1/4 text-right"
        :class="{
          'opacity-50': !cartItems
        }"
        to="/checkout"
      >
        <div>Checkout</div>
        <div>{{ cartItems }} items, $ {{ cartTotal }}</div>
      </router-link>
    </div>
    <router-view
      @add="addToCart"
      :categories="categories"
      :productList="productList"
      :cartList="cartList"
    />
  </div>
</template>

<script>
export default {
  name: "myStoreFront",

  data() {
    return {
      productList: [
        {
          id: "c_1",
          img:
            "https://images.unsplash.com/photo-1482446078840-0c634e9eb6e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          name: "Camera full-frame",
          desc: "Great full camera for great experiences",
          cat: "Camera",
          price: 500,
          rateList: [5, 4, 5, 3, 3],
          availability: 4
        },
        {
          id: "c_2",
          img:
            "https://images.unsplash.com/photo-1478131535094-78de1c9450ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          name: "Camera aps",
          desc: "Intermediate camera level, the best for the best price",
          cat: "Camera",
          price: 150,
          rateList: [3, 3],
          availability: 0
        },
        {
          id: "o_1",
          img:
            "https://images.unsplash.com/photo-1550643257-a05c97faf5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
          name: "85mm fixed",
          desc: "Great for portraits",
          cat: "Objectives",
          price: 640,
          rateList: [3, 4, 5, 3, 3],
          availability: 2
        },
        {
          id: "o_2",
          img:
            "https://images.unsplash.com/photo-1518540914843-c612bb9170d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          name: "55-200mm",
          desc: "From details to portrait",
          cat: "Objectives",
          price: 350,
          rateList: [2, 2, 2, 3, 3],
          availability: 1
        },
        {
          id: "a_1",
          img:
            "https://images.unsplash.com/photo-1521134563007-647ff6127244?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          name: "Camera backback",
          desc: "The best companion for your travels",
          cat: "Accessories",
          price: 300,
          rateList: [5, 5, 4, 3],
          availability: 3
        },
        {
          id: "a_2",
          img:
            "https://images.unsplash.com/photo-1542291483-324c40fe398a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          name: "Old and new films...",
          desc: "OLd camera films and the latest memory...",
          cat: "Accessories",
          price: 25,
          rateList: [],
          availability: 5
        }
      ],
      categories: [
        {
          id: "Camera",
          name: "Cameras"
        },
        {
          id: "Objectives",
          name: "Objectives"
        },
        {
          id: "Accessories",
          name: "Accessories"
        },
        {
          id: "All",
          name: "All"
        }
      ],
      cartList: {},
      cartTotal: 0,
      cartItems: 0
    };
  },

  methods: {
    addToCart: function(value) {
      console.log("i want ", value);

      //1. decrease availability
      this.decreaseAvailability(value.id);

      //2. add to real cart
      this.pushtoCart(value.id);
    },

    decreaseAvailability: function(id) {
      var product = {};
      for (var idx = 0; idx < this.productList.length; idx++) {
        product = this.productList[idx];
        if (product.id === id && this.productList[idx].availability > 0) {
          this.productList[idx].availability -= 1;
          break;
        }
      }
    },

    pushtoCart: function(id) {
      var product = {};
      for (var idx = 0; idx < this.productList.length; idx++) {
        product = this.productList[idx];

        if (product.id === id) {
          var qty = Object.prototype.hasOwnProperty.call(this.cartList, id)
            ? this.cartList[id].qty + 1
            : 1;
          product.qty = qty;

          this.$set(this.cartList, id, product);
          break;
        }
      }
    },

    totItems: function() {
      var tmp = 0,
        bill = 0;
      var prdtoCheck = Object.values(this.cartList);
      if (prdtoCheck.length) {
        console.log(prdtoCheck);
        for (var idx = 0; idx < prdtoCheck.length; idx++) {
          tmp += prdtoCheck[idx].qty;
          bill += prdtoCheck[idx].qty * prdtoCheck[idx].price;
        }
      }
      return {
        count: tmp,
        amount: bill
      };
    }
  },

  watch: {
    cartList: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log("changed...", newVal, oldVal);
        var cart = this.totItems();
        this.cartItems = cart.count;
        this.cartTotal = cart.amount;
      }
    }
  }

  /*
  not reactive... ask Erik....
  computed: {
    totItems: function() {
      var tmp = 0;
      var prdtoCheck = Object.values(this.cartList);
      if (prdtoCheck.length) {
        console.log(prdtoCheck);
        for (var idx = 0; idx < prdtoCheck.length; idx++) {
          tmp += prdtoCheck[idx].qty;
        }
      }
      return tmp;
    }
  }*/
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
