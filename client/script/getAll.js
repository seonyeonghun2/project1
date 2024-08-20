window.addEventListener("DOMContentLoaded", () => {
  const loadAllBtn = document.getElementById("getAllUsers");

  loadAllBtn.addEventListener("click", async () => {
    loadAllBtn.disabled = true;
    // 더 유연한 정규식을 사용합니다
    const phoneRegex = /^(\d{2,3})?(\d{3,4})(\d{4})$/;
    const result = await fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((items) => {
        const container = document.querySelector("#users");
        items.forEach((item, i) => {
          const row = document.createElement("tr");
          // 정규식 매치를 시도합니다
          const match = phoneRegex.exec(item.phone);
          let formatPhone;

          if (match) {
            // 매치된 경우, 그룹에 따라 포맷팅합니다
            if (match[1]) {
              // 지역번호가 있는 경우
              formatPhone = `${match[1]}-${match[2]}-${match[3].replace(
                /\d/g,
                "*"
              )}`;
            } else {
              // 지역번호가 없는 경우
              formatPhone = `${match[2]}-${match[3]}`;
            }
          } else {
            // 매치되지 않은 경우, 원본 번호를 사용합니다
            console.warn("Phone number format not recognized:", item.phone);
            formatPhone = item.phone;
          }
          let idx = i + 1;
          row.innerHTML = `
          <td>${idx}</td>
          <td>${item.name.replace(item.name[1], "*")}</td>
          <td>${item.email}</td>
          <td>${item.reg_date}</td>
          <td>${formatPhone}</td>
        `;
          container.appendChild(row);
        });
      })
      .catch((err) => {
        console.log("데이서 수신 실패 : " + err);
        loadAllBtn.disabled = false;
      });
  });
});
