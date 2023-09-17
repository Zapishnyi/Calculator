const screen = document.querySelector(".screen");
screen.textContent = "";
sum_check_item = 0;
let buttons = document.querySelectorAll("td");

function calculation(items_array, sum_check_item) {
  // Square root calculation
  console.log(items_array);
  let etalon = sum_check_item;
  items_array.forEach(function (items_array_item, index) {
    if (items_array_item === "√") {
      if (isNaN(parseFloat(items_array[index - 1])) === false) {
        temp_item = Math.sqrt(items_array[index - 1]);
        items_array.splice(index - 1, 2, parseFloat(temp_item));
        sum_check_item++;
      } else if (isNaN(parseFloat(items_array[index + 1])) === false) {
        temp_item = Math.sqrt(items_array[index + 1]);
        items_array.splice(index, 2, parseFloat(temp_item));
        sum_check_item++;
      }
    }
  });
  // Procentage calculation
  items_array.forEach(function (items_array_item, index) {
    if (items_array_item === "%") {
      switch (items_array[index - 2]) {
        case "+":
          temp_item =
            items_array[index - 3] +
            (items_array[index - 3] * items_array[index - 1]) / 100;
          items_array.splice(index - 3, 4, parseFloat(temp_item));
          sum_check_item++;
          break;
        case "-":
          temp_item =
            items_array[index - 3] -
            (items_array[index - 3] * items_array[index - 1]) / 100;
          items_array.splice(index - 3, 4, parseFloat(temp_item));
          sum_check_item++;
          break;
        case "×":
          temp_item =
            (items_array[index - 3] *
              items_array[index - 3] *
              items_array[index - 1]) /
            100;
          items_array.splice(index - 3, 4, parseFloat(temp_item));
          sum_check_item++;
          break;
        case "÷":
          temp_item =
            ((items_array[index - 3] / items_array[index - 3]) *
              items_array[index - 1]) /
            100;
          items_array.splice(index - 3, 4, parseFloat(temp_item));
          sum_check_item++;
          break;
      }
      console.log(items_array);
    }
  });
  // Multiply
  items_array.forEach(function (items_array_item, index) {
    if (items_array_item === "×") {
      temp_item = items_array[index - 1] * items_array[index + 1];
      items_array.splice(index - 1, 3, parseFloat(temp_item));
      sum_check_item++;
      console.log(items_array);
    }
  });
  // Divide
  items_array.forEach(function (items_array_item, index) {
    if (items_array_item === "÷") {
      temp_item = items_array[index - 1] / items_array[index + 1];
      items_array.splice(index - 1, 3, parseFloat(temp_item));
      sum_check_item++;
      console.log(items_array);
    }
  });
  // Summ
  items_array.forEach(function (items_array_item, index) {
    if (items_array_item === "+") {
      temp_item = items_array[index - 1] + items_array[index + 1];
      items_array.splice(index - 1, 3, parseFloat(temp_item));
      sum_check_item++;
      console.log(items_array);
    }
  });
  // Subtraction
  items_array.forEach(function (items_array_item, index) {
    if (items_array_item === "-") {
      temp_item = items_array[index - 1] - items_array[index + 1];
      items_array.splice(index - 1, 3, parseFloat(temp_item));
      sum_check_item++;
      console.log(items_array);
    }
  });
  console.log("etalon", etalon);
  console.log("sum_check", sum_check_item);
  // check, is calculated line contain only one item? is this  item a figure?
  items_array.length === 1 && isNaN(items_array[0]) === false
    ? // if yes - publish result on the screen
      (screen.textContent += "=" + items_array[0])
    : // if not - check, is any math operation  event occure during last calculation round
    etalon === sum_check_item
    ? // if not - publish error message
      (screen.textContent += "=error")
    : // if yes - initiate another calculation round
      calculation(items_array, sum_check_item);
}

buttons.forEach(function (btn_item) {
  btn_item.addEventListener("click", () => {
    switch (btn_item.className) {
      case "btn_clear":
        screen.textContent = "";
        break;
      case "btn_backspace":
        screen.textContent = document
          .querySelector(".screen")
          .textContent.slice(0, screen.textContent.length - 1);
        break;
      case "btn_=":
        {
          // Transform screen line to array
          items_array = document
            .querySelector(".screen")
            .textContent.split(/\b/);
          console.log(items_array);
          items_in_array = items_array.length - 1;
          // Check and combine figures, example - '4'+','+'5'=4,5 and tranform all string figures to to float
          for (let counter = 0; counter <= items_in_array; counter++) {
            if (items_array[counter] === ".") {
              (temp_item =
                items_array[counter - 1] + "." + items_array[counter + 1]),
                items_array.splice(counter - 1, 3, parseFloat(temp_item));
              items_in_array = items_array.length - 1;
            } else {
              // convert string number to float, or split string by elements if not a number
              if (isNaN(parseFloat(items_array[counter])) === false) {
                items_array.splice(
                  counter,
                  1,
                  parseFloat(items_array[counter])
                );
                items_in_array = items_array.length - 1;
              } else {
                temp_array = items_array[counter].split("");
                items_array.splice(counter, 1, ...temp_array);
                items_in_array = items_array.length - 1;
              }
            }
          }
          // convert positive numbers to negative where applicapable
          console.log("initial array", items_array);
          items_array.forEach(function (items_array_item, index) {
            if (items_array_item === "-") {
              console.log(items_array[index - 1]);
              if (index === 0 || isNaN(items_array[index - 1]) === true) {
                console.log("NaN");
                console.log(items_array);
                items_array.splice(index, 2, -items_array[index + 1]);
                console.log(items_array);
              } else {
                console.log(items_array);
                items_array.splice(index, 2, "+", -items_array[index + 1]);
                console.log(items_array);
              }
            }
          });
          // check is any calculations had been done before?
          if (items_array.findLastIndex((item) => item === "=") !== -1) {
            // if yes, cut out calculation line from last '=' till and of line
            items_array = items_array.slice(
              items_array.findLastIndex((item) => item === "=") + 1,
              items_array.length
            );
          }

          // Result output, or additional calculation cycle initiate
          items_array.length === 1 && isNaN(items_array[0]) === false
            ? (screen.textContent += "=" + items_array[0])
            : calculation(items_array, sum_check_item);
        }
        break;
      default: // add item to calculate line
        screen.textContent += btn_item.className;
    }
  });
});
