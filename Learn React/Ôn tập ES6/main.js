// arrow function
const sum = (a, b) => {
  return {
    a: a,
    b: b,
  };
};

// arrow function doesn't have 'this'
// arrow function doesn't have 'super'

console.log(sum(1, 2));

// Enhanced object literals
// có thể dùng để định nghĩa key: value cho object: dùng để định nghĩa key: value nếu tên nó trùng nhau.

// định nghĩa method cho object

// định nghĩa key cho object dưới dạng biến

var name = "JavaScript";
var price = 10000;

const course = {
  name,
  price, // định nghĩa key:value cho object
  getMethod() {
    //định nghĩa method cho object
    return this.name;
  },
};

var fieldName = "name";
var fieldPrice = "price";

const course1 = {
  [fieldName]: "JavaScript", //định nghĩa key cho object dưới dạng biến
  [fieldPrice]: 1000,
};

//định nghĩa value cho object dưới dạng biến chỉ dùng khi tuỳ vào biến mà lấy ra value tương ứng của object

console.log(course.getMethod());
console.log(course1);

//Enhaced object literals dùng cho code JavaScript ngắn gọn hơn.

//Destructuring, Rest

// Destructuring: Phân rã, dùng với object và array
//Array:
var skills = ["JavaScript", "C", "Java"];

var [a, c] = skills; //cách viết destructuring

console.log(a, c);

var [a, ...rest] = skills; // Cách phân ra mảng sử dụng rest operator.

//Rest operator sẽ lấy ra các phần tử cuối cùng còn sót lại của mảng.
//Sử dụng dấu '... + tên biến'.
//Trả về mảng

console.log(a, rest);

/**
 * Nhận biết khi nào là rest khi nào là spread.
 *
 * 1. Rest được sử dụng kết hợp với Destructuring
 * 2. Sử dụng với thuộc tính của một function
 */

//Object: Dùng destructuring với object thì phải gọi đúng tên key, sai => unđefined

var learn = {
  name: "JavaScript",
  price: 1000,
  image: "image-url",
  subject: {
    name: "ES6",
    price: 2000,
    image: "url",
  },
};

var { name, price, image } = learn; //cách viết destructuring cho object

console.log(name, price, image);

var { name, ...rest } = learn; //Dùng rest operator cho object

console.log(rest); //rest trả lại object

var {
  name: parentName, //Đặt tên cho biến parent
  subject: { name, ...rest }, // cách destructuring của object con bên trong 1 object cha.
} = learn;

console.log(parentName, name, rest);

var { name, description = "mo ta" } = learn; // cách set giá trị cho một key không tồn tại trong object

console.log(description);

function logger(a, ...params) {
  // rest operator được sử dụng để thêm vô hạn giá trị làm tham số cho function
  console.log(params);
}

logger(1, 2, 3);

var logger1 = ([a, ...rest] = obj) => {
  // Có thể sử dụng destructuring ở ngay trong vị trí đặt tham số để tránh gọi tham số quá nhiều
  console.log(rest);
};

logger1([
  {
    name: "Java",
    price: 1000,
    image: "url",
  },
  {
    name: "C++",
    price: 2000,
    image: "url1",
  },
]);

/**
 * Spread Operator: toán tử giải.
 */

var courses = ["Java", "JavaScript", "C++"];

console.log(...courses); // sử dụng toán tử spread để copy hết phần tử của mảng hay object

var array1 = ["JavaScript", "Java", "Dart"];

var array2 = ["ReactJs", "Angular", "VueJs"];

var array3 = [...array1, ...array2];

console.log(array3);

var learner1 = {
  name: "Dung",
  age: 20,
  address: "Ha Noi",
};

var learner2 = {
  name: "Nhi",
  age: 20,
  address: "Ha Noi",
};

var courses1 = {
  name: "ES6",
  price: 1000,
};

var learnerAndCourse = {
  ...courses1,
  ...learner1, //Nếu 2 object khác key thì sẽ merge hết key lại thành 1 object mới
};

var learner3 = {
  ...learner1,
  ...learner2, //Nếu 2 object có key giống nhau thì sẽ ưu tiên lấy thằng phía sau
};

var learner4 = {
  ...learner1,
  class: "12A2", //Sử dụng spread operator với thêm key mới
};

console.log(learner3);
console.log(learner4);

var array10 = ["Javascript", "Java", "C++"];

var logger3 = (a, b, c) => {
  console.log(a, b, c);
};

logger3(...array10);
