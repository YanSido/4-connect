/**
 * @class Model
 * Manages the data of the application.
 */
class Model {
  constructor() {
    this.board = [
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
    ];
    this.color = "red";
  }

  bindBoardChange(callback) {
    this.onBoardChange = callback;
  }

  #_commit(board, color) {
    this.onBoardChange(board);
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("color", JSON.stringify(color));
  }

  getCurrentColor() {
    console.log("30", localStorage.getItem("color"));
    return localStorage.getItem("color");
  }

  addMove(column) {
    let color = localStorage.getItem("color");
    color = color.substring(1, color.length - 1);
    if (this.board[Number(column)].includes("grey")) {
      this.board[Number(column)].shift();
      this.board[Number(column)].push(color);
      if (color === "red") {
        this.#_commit(this.board, "black");
      } else if (color === "black") {
        this.#_commit(this.board, "red");
      }
      this.oppositeTable(this.board);
      this.checkStatus(this.oppositeTable(this.board));
    }
  }

  resetBoard() {
    this.board = [
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
    ];
    this.color = "red";
    this.#_commit(this.board, this.color);
    location.reload();
  }

  oppositeTable(table) {
    let newTable = [[], [], [], [], [], [], []];
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table[i].length; k++) {
        if (table[i][k] !== "grey") {
          newTable[i].push(table[i][k]);
        }
      }
    }
    return newTable;
  }
  checkStatus(table) {
    // check if row winner
    let redSequence = 0;
    let blackSequence = 0;
    for (let i = 0; i < table.length; i++) {
      for (let a = 0; a < table[i].length; a++) {
        for (let j = 1; j <= 3; j++) {
          try {
            if (table[i][a] !== undefined && table[i + j][a] !== undefined) {
              if (table[i][a] === table[i + j][a] && table[i][a] === "red") {
                redSequence++;
                if (redSequence === 3) {
                  alert("RED Winner");
                }
              } else redSequence = 0;
              if (table[i][a] === table[i + j][a] && table[i][a] === "black") {
                blackSequence++;

                if (blackSequence === 3) {
                  alert("BLACK Winner");
                }
              } else blackSequence = 0;
            }
          } catch {}
        }
        redSequence = 0;
        blackSequence = 0;
      }
    }
    // check if column winner
    redSequence = 0;
    blackSequence = 0;
    for (let i = 0; i < table.length; i++) {
      for (let a = 0; a < table[i].length; a++) {
        for (let j = 1; j <= 3; j++) {
          try {
            if (table[i][a] !== undefined && table[i][a + j] !== undefined) {
              if (table[i][a] === table[i][a + j] && table[i][a] === "red") {
                redSequence++;
                if (redSequence === 3) {
                  alert("RED Winner");
                }
              } else redSequence = 0;
              if (table[i][a] === table[i][a + j] && table[i][a] === "black") {
                blackSequence++;

                if (blackSequence === 3) {
                  alert("BLACK Winner");
                }
              } else blackSequence = 0;
            }
          } catch {}
        }
        redSequence = 0;
        blackSequence = 0;
      }
    }
    // check if check if diagonal positive
    redSequence = 0;
    blackSequence = 0;
    for (let i = 0; i < table.length; i++) {
      for (let a = 0; a < table[i].length; a++) {
        for (let j = 1; j <= 3; j++) {
          try {
            if (
              table[i][a] !== undefined &&
              table[i + j][a + j] !== undefined
            ) {
              if (
                table[i][a] === table[i + j][a + j] &&
                table[i][a] === "red"
              ) {
                redSequence++;
                if (redSequence === 3) {
                  alert("RED Winner");
                }
              } else redSequence = 0;
              if (
                table[i][a] === table[i + j][a + j] &&
                table[i][a] === "black"
              ) {
                blackSequence++;

                if (blackSequence === 3) {
                  alert("BLACK Winner");
                }
              } else blackSequence = 0;
            }
          } catch {}
        }
        redSequence = 0;
        blackSequence = 0;
      }
    }
    // check if diagonal negative
    redSequence = 0;
    blackSequence = 0;
    for (let i = 0; i < table.length; i++) {
      for (let a = 0; a < table[i].length; a++) {
        for (let j = 1; j <= 3; j++) {
          try {
            if (
              table[i][a] !== undefined &&
              table[i + j][a - j] !== undefined
            ) {
              if (
                table[i][a] === table[i + j][a - j] &&
                table[i][a] === "red"
              ) {
                redSequence++;
                if (redSequence === 3) {
                  alert("RED Winner");
                }
              } else redSequence = 0;
              if (
                table[i][a] === table[i + j][a - j] &&
                table[i][a] === "black"
              ) {
                blackSequence++;

                if (blackSequence === 3) {
                  alert("BLACK Winner");
                }
              } else blackSequence = 0;
            }
          } catch {}
        }
        redSequence = 0;
        blackSequence = 0;
      }
    }
  }
}

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
  constructor() {
    this.app = this.getElement("#root");
    this.table = this.createElement("table");
    this.tbody = this.createElement("tbody");
    for (let i = 0; i < 7; i++) {
      this.row = this.createElement("tr");
      for (let a = 0; a < 7; a++) {
        this.cell = this.createElement("td");
        this.button = this.createElement("button");
        this.button.setAttribute("class", `${a}`);
        this.cell.append(this.button);
        this.row.append(this.cell);
      }
      this.tbody.append(this.row);
    }
    this.table.append(this.tbody);
    this.title = this.createElement("h1");
    this.title.textContent = "4-Connect";
    this.subTitle = this.createElement("h3");
    this.subTitle.textContent = "Current Playing:";
    this.currentPlayer = this.createElement("h2");
    this.currentPlayer.textContent = "red";
    this.currentPlayer.style.color = "red";
    this.reset = this.createElement("button");
    this.reset.setAttribute("id", "reset-btn");
    this.reset.textContent = "Reset";
    this.app.append(
      this.title,
      this.subTitle,
      this.currentPlayer,
      this.table,
      this.reset
    );
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  render(table) {
    // Delete all nodes
    for (let i = 0; i <= document.getElementsByTagName("td").length - 1; i++) {
      document.getElementsByTagName("td")[i].children[0].style.backgroundColor =
        "grey";
    }
    // Painting cells
    for (let i = 0; i < table.length; i++) {
      for (let k = 0; k < table[i].length; k++) {
        for (
          let j = document.getElementsByClassName(`${i}`).length - 1;
          j >= 0;
          j--
        ) {
          if (
            document
              .getElementsByClassName(`${i}`)
              [j].outerHTML.includes("grey")
          ) {
            if (table[i][k] === "red") {
              document.getElementsByClassName(`${i}`)[j].style.backgroundColor =
                "red";
            }
            if (table[i][k] === "black") {
              document.getElementsByClassName(`${i}`)[j].style.backgroundColor =
                "black";
            }

            j = -1;
          }
        }
      }
    }
  }

  checkIfTableEmpty(table) {
    let flag = 0;
    for (let i = 0; i < table.length; i++) {
      for (let a = 0; a < table[i].length; a++) {
        if (table[i][a] !== "grey") {
          flag++;
        }
      }
      if (flag !== 0) {
        return false;
      }
    }
    return true;
  }

  oppositeColor(color) {
    if (color === `"red"`) return "black";
    if (color === `"black"`) return "red";
  }

  bindAddMove(addHandler, color) {
    this.tbody.addEventListener("click", (event) => {
      event.preventDefault();
      this.currentPlayer.textContent = this.oppositeColor(color());
      this.currentPlayer.style.color = this.oppositeColor(color());
      const column = Number(event.target.className);
      addHandler(column);
    });
  }

  bindResetBoard(resetHandler) {
    this.reset.addEventListener("click", () => {
      resetHandler();
    });
  }
}

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
  #model;
  #view;
  constructor(model, view) {
    this.#model = model;
    this.#view = view;
    this.#model.bindBoardChange(this.#onBoardChange);
    this.#view.bindAddMove(this.#handleAddMove, this.#handleGetColor);
    this.#view.bindResetBoard(this.#handleResetBoard);
    this.#onBoardChange(this.#model.board);
  }

  #onBoardChange = (board) => {
    this.#view.render(board);
  };
  // Explicit this binding
  #handleAddMove = (column) => {
    this.#model.addMove(column);
  };
  #handleGetColor = () => {
    return this.#model.getCurrentColor();
  };
  #handleResetBoard = () => {
    this.#model.resetBoard();
  };
}

const app = new Controller(new Model(), new View());
