let subBtn = document.getElementById("submit");

subBtn.addEventListener("click", () => {
  let price = document.getElementById("price").value;
  let dish = document.getElementById("dish").value;
  let table = document.getElementById("option").value;
  console.log(price + dish + table);

  //creating new Element
  let newElement = document.createElement("li");
  newElement.className = "new1";
  let text = document.createTextNode(`${price} ${dish}`);
  newElement.appendChild(text);
  //creating delete button
  let delBtn = document.createElement("button");
  delBtn.className = "btn-danger";
  let text2 = document.createTextNode("Delete Order");
  delBtn.appendChild(text2);
  //adding according to table number
  if (table == "Table 1") {
    document.getElementById("table1").appendChild(newElement);
    newElement.appendChild(delBtn);
  } else if (table == "Table 2") {
    document.getElementById("table2").appendChild(newElement);
    newElement.appendChild(delBtn);
  } else {
    document.getElementById("table3").appendChild(newElement);
    newElement.appendChild(delBtn);
  }
  //making object
  let obj = {
    dishPrice: price,
    dishName: dish,
    tableNo: table,
  };
  console.log(obj);
  //adding data to CrudCrud
  axios
    .post(
      "https://crudcrud.com/api/7b9c0ab4e6fc48be9333db5d91cab55c/userDetails",
      obj
    )
    .then((response) => {
      delFun(response.data);
    })
    .catch((err) => console.log(err));
  //making delete button work

  delBtn.addEventListener("click", () => {
    delBtn.parentElement.remove();
  });

  function delFun(data) {
    console.log("ok");

    delBtn.addEventListener("click", () => {
      console.log(data._id);
      axios
        .delete(
          `https://crudcrud.com/api/7b9c0ab4e6fc48be9333db5d91cab55c/userDetails/${data._id}`
        )
        .then()
        .catch((err) => console.log(err));
    });
  }
});

window.addEventListener("DOMContentLoaded", CrudCrud);

function CrudCrud() {
  axios
    .get(
      "https://crudcrud.com/api/7b9c0ab4e6fc48be9333db5d91cab55c/userDetails"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        //creating new Element
        let newElement = document.createElement("li");
        newElement.className = "new1";
        let text = document.createTextNode(`${response.data[i].dishPrice} ${response.data[i].dishName}`);
        newElement.appendChild(text);
        //creating delete button
        let delBtn = document.createElement("button");
        delBtn.className = "btn-danger";
        let text2 = document.createTextNode("Delete Order");
        delBtn.appendChild(text2);
        //adding according to table number
        if (response.data[i].tableNo == "Table 1") {
          document.getElementById("table1").appendChild(newElement);
          newElement.appendChild(delBtn);
        } else if (response.data[i].tableNo == "Table 2") {
          document.getElementById("table2").appendChild(newElement);
          newElement.appendChild(delBtn);
        } else {
          document.getElementById("table3").appendChild(newElement);
          newElement.appendChild(delBtn);
        }

        delBtn.addEventListener("click", () => {
            delBtn.parentElement.remove();
          });
          let id=response.data[i]._id 
          axios.delete(`https://crudcrud.com/api/7b9c0ab4e6fc48be9333db5d91cab55c/userDetails/${id}`)
          .then()
          .catch()
      }
    })
    .catch((err) => console.log(err));

   
}
