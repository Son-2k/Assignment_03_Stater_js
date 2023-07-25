"use strict";

const input_page_size = document.querySelector("#input-page-size");
const input_category = document.querySelector("#input-category");

const btn_save = document.querySelector("#btn-submit");

const Page_content = document.querySelector("#info");

let userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];
let currentUser = JSON.parse(getFromStorage("currentUser")) || [];

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// tạo hàm xóa input
const clearInput = function () {
  input_page_size.value = "";
  input_category.value = "General";
};

// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  if (input_page_size.value <= 0) {
    alert("Mời chọn News per page lớn hơn 0");
    return false;
  }

  if (input_category.value === "General") {
    alert("Mời chọn News Category");
    return false;
  }

  return true;
};

// hiển thị danh sách tham số cài đặt
if (currentUser.length > 0) {
  const dev = `
    <div>
      <p>News Category: ${data[0].category}</p>
      <p>News per page: ${data[0].page_size}</p>
    </div>
  `;
  Page_content.innerHTML = dev;
} else {
  const dev = `
    <div>
      <p>News Category: Technology</p>
      <p>News per page: 3</p>
    </div>
  `;
  Page_content.innerHTML = dev;
}
//  tại hàm khi nhấn btn-submit
const save = function () {
  const page_size = input_page_size.value;
  const category = input_category.value;
  if (userArr.length > 0) {
    // thêm  page_size và category cho user đang login
    currentUser[0].page_size = page_size;
    currentUser[0].category = category;

    userArr = userArr.filter((user) => {
      return !(user.username === currentUser[0].username);
    });
    userArr.push(currentUser[0]);
  }

  if (validate()) {
    saveToStorage(`USER_ARRAY`, JSON.stringify(userArr));
    saveToStorage(`currentUser`, JSON.stringify(currentUser));
    clearInput();
  }
};

btn_save.addEventListener("click", save);
