let taskList = [];

const hrsperweek = 24 * 7;

const handleOnSubmit = (e) => {
  // const elm = document.getElementById("task")
  //   console.log(elm.value);

  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = +newForm.get("hr");

  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };
  //check if there is enough hrs left to add
  const existingttlhrs = taskTotal();
  if (existingttlhrs + hr > hrsperweek) {
    return alert("Sorry, Maximum hours reached for a week");
  }
  taskList.push(obj);
  //   console.log(taskList);
  displayEntryList();
};

//display entry list
const displayEntryList = () => {
  let str = "";

  const entryelm = document.getElementById("entryList");
  const entryList = taskList.filter((item) => item.type === "entry");
  entryList.map((item, i) => {
    str += ` <tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    <button onclick="handleOnDelete('${item.id}')"class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button onclick ="switchTask('${item.id}','bad')" class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  entryelm.innerHTML = str;
  taskTotal();
};
const displayBadList = () => {
  let str = "";
  console.log(taskList);
  const badelm = document.getElementById("badList");
  const badList = taskList.filter((item) => item.type === "bad");
  badList.map((item, i) => {
    str += ` <tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    
                    <button onclick="switchTask('${item.id}','entry')" class="btn btn-warning">
                        <i class="fa-solid fa-arrow-left"></i>
                            </button>

                            <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger">
                            <i class="fa-solid fa-trash"></i>
                                    </button>
                  </td>
                </tr>`;
  });
  badelm.innerHTML = str;
  document.getElementById("savedhrsElm").innerText = badList.reduce(
    (acc, item) => acc + item.hr,
    0,
  );
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

//delete functionality

const handleOnDelete = (id) => {
  if (window.confirm("are you sure,you want to delete this?"))
    taskList = taskList.filter((item) => item.id !== id);
  displayEntryList();
  displayBadList();
};

//switch functionality
const switchTask = (id, type) => {
  console.log(id, type);
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};

//calculate total saved hours

const taskTotal = () => {
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("ttlhrs").innerText = ttlHr;
  return ttlHr;
};
