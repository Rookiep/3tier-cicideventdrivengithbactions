
async function sendTask(){
  const task = document.getElementById("task").value;
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({task})
  });
  alert("Task Sent");
}
