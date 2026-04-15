let taskList = [];

const handleOnSubmit = (e) => {
  // const elm = document.getElementById("task")
  //   console.log(elm.value);

  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = newForm.get("hr");

  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
  };
  taskList.push(obj);
  //   console.log(taskList);
  displayEntryList();
};

//display entry list
const displayEntryList = () => {
  console.log(taskList);
  let str = "";
  const entryelm = document.getElementById("entryList");
  taskList.map((item, i) => {
    str += ` <tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    <button class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  entryelm.innerHTML = str;
};

//creating unique id
const randomIdGenerator = (length = 6) => {
  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length); //0-61
    id += str[randomIndex];
  }
  return id;
};
