const handleOnSubmit = (e) => {
  // const elm = document.getElementById("task")
  //   console.log(elm.value);

  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = newForm.get("hr");
  console.log(task, hr);
};
