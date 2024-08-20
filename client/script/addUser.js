window.addEventListener("DOMContentLoaded", () => {
  const addForm = document.getElementById("add_form");
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: document.getElementById("user_id").value,
          pwd: document.getElementById("user_pwd").value,
          name: document.getElementById("user_name").value,
          email: document.getElementById("user_email").value,
          phone: document.getElementById("user_phone").value,
        }),
      });

      if (!result.status) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const response = await result.json();
      //console.log("회원 등록 성공:", response);
      alert(response.message);
      location.reload();
    } catch (err) {
      //console.error("회원 등록 실패:", error);
    }
  });
});
