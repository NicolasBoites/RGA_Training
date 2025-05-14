class Book {
    constructor(title, price) {
        this.title = title
        this.price = price
    }

    borrow() {
        console.log(`${this.title} is borrowed`);

    }

    static rent() {
        // this.borrow()
        console.log(this.title); // wont work

    }
}


class FictionBook extends Book {
    borrow() { //overwrite functions
        console.log('override');
        super.borrow()//to use parent function
    }
}


const b1 = new Book("Learn HTML", 100);

console.log(b1);
Book.rent()

const fb = new FictionBook("Caves of Steel", 101);

console.log(fb);
fb.borrow();
