new Vue({
  el: "#app",
  data: {
    lessons: [
      {
        id: 1,
        subject: "Mathematics",
        location: "London",
        price: 100,
        spaces: 5,
        image: "images/math.png",
      },
      {
        id: 2,
        subject: "English",
        location: "London",
        price: 90,
        spaces: 5,
        image: "images/english.png",
      },
      {
        id: 3,
        subject: "Science",
        location: "Manchester",
        price: 110,
        spaces: 5,
        image: "images/science.png",
      },
      {
        id: 4,
        subject: "History",
        location: "Bristol",
        price: 80,
        spaces: 5,
        image: "images/history.png",
      },
      {
        id: 5,
        subject: "Art",
        location: "London",
        price: 120,
        spaces: 5,
        image: "images/art.png",
      },
      {
        id: 6,
        subject: "Music",
        location: "Manchester",
        price: 95,
        spaces: 5,
        image: "images/music.png",
      },
      {
        id: 7,
        subject: "Geography",
        location: "Bristol",
        price: 85,
        spaces: 5,
        image: "images/geography.png",
      },
      {
        id: 8,
        subject: "Physical Education",
        location: "London",
        price: 75,
        spaces: 5,
        image: "images/pe.png",
      },
      {
        id: 9,
        subject: "Computer Science",
        location: "Manchester",
        price: 130,
        spaces: 5,
        image: "images/cs.png",
      },
      {
        id: 10,
        subject: "Drama",
        location: "Bristol",
        price: 105,
        spaces: 5,
        image: "images/drama.png",
      },
    ],
    cart: [],
    showcart: false,
    sortAttribute: "subject",
    sortOrder: "asc",
    name: '',
    phone: '',
    showCheckout: false,
    nameError: '',
    phoneError: '',
    orderConfirmed: false,
    confirmationMessage: '',
  },
  computed: {
    sortedLessons() {
      return this.lessons.sort((a, b) => {
        let comparison = 0;
        if (a[this.sortAttribute] > b[this.sortAttribute]) {
          comparison = 1;
        } else if (a[this.sortAttribute] < b[this.sortAttribute]) {
          comparison = -1;
        }
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },  
    },

    methods: {
        addToCart(lesson) {
            if (lesson.spaces > 0) {
                lesson.spaces--;
                this.cart.push(lesson);
            }
        },
        removeCart(item) {
            const index = this.cart.indexOf(item);
            this.cart.splice(index, 1);
            const lesson = this.lessons.find(lesson => lesson.id === item.id);
            lesson.spaces++;
        },
         validateForm() {
            this.nameError = '';
            this.phoneError = '';
            let valid = true;
            if (!/^[a-zA-Z\s]+$/.test(this.name)) {
                this.nameError = 'Name must contain only letters.';
                valid = false;
            }
            if (!/^\d+$/.test(this.phone)) {
                this.phoneError = 'Phone must contain only numbers.';
                valid = false;
            }
            return valid;
        },
        submitOrder() {
            if (this.validateForm()) {
                const order = {
                    name: this.name,
                    phone: this.phone,
                    cart: this.cart
                };
                fetch('https://example.com/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .then(data => {
                    this.orderConfirmed = true;
                    this.confirmationMessage = 'Your order has been placed successfully!';
                    this.cart = [];
                    this.name = '';
                    this.phone = '';
                    this.showCheckout = false;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        },
  },
});
