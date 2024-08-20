window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login_form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: document.getElementById("user_id").value,
          pwd: document.getElementById("user_pwd").value,
        }),
      });

      if (!result.status) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const response = await result.json();
      //console.log("로그인 등록 성공:", response);
      alert(response.message);
      
      // location.href("로그인성공시 이동할 주소");
    } catch (err) {
      //console.error("로그인 실패:", error);
    }
  });
});
