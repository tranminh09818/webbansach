//hiện thị chức menu chắc năng//
const menu = document.querySelector('.menu');
const btnMenu = document.querySelector('.btn-menu');

btnMenu.addEventListener('click', () => {
  menu.classList.toggle('active');
});
//xử lý tab chức năng//
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    tab.classList.add('active');
    contents[index].classList.add('active');
  });
});
//xử lý lọc dữ liệu//
const inputSearch = document.querySelector('.input-search');
const tableBody = document.querySelector('.table-body');

inputSearch.addEventListener('keyup', () => {
  const searchText = inputSearch.value.toLowerCase();
  const rows = tableBody.querySelectorAll('tr');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    if (text.includes(searchText)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

//xử lý phân trang//
const pagination = document.querySelector('.pagination');
const currentPage = 1;
const totalPages = 5;

function renderPagination() {
  pagination.innerHTML = '';
  
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = `#page-${i}`;
    pageLink.textContent = i;
    pageLink.classList.add('page-link');
    
    if (i === currentPage) {
      pageLink.classList.add('active');
    }
    
    pagination.appendChild(pageLink);
  }
}

renderPagination();

pagination.addEventListener('click', (e) => {
  const pageLink = e.target.closest('.page-link');
  if (!pageLink) return;
  
  const newCurrentPage = parseInt(pageLink.textContent);
  if (newCurrentPage === currentPage) return;
  
  currentPage = newCurrentPage;
  renderPagination();
});
// xử lý xóa dữ liệu //
const btnDelete = document.querySelectorAll('.btn-delete');

btnDelete.forEach(btn => {
  btn.addEventListener('click', () => {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa?');
    if (!confirmDelete) return;
    
    // Xử lý xóa dữ liệu qua ajax
  });
});
//QUẢN LÝ SẢN PHẨM//
// Lọc sản phẩm
function filterProducts() {
    // Lấy dữ liệu từ các input
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
  
    // Gửi yêu cầu lên server với dữ liệu lọc
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/products/filter?name=${name}&price=${price}&category=${category}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Hiển thị dữ liệu sản phẩm được lọc
        const products = JSON.parse(xhr.responseText);
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  // Thêm sản phẩm
  function addProduct() {
    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
  
    // Kiểm tra dữ liệu đầu vào
  
    // Gửi dữ liệu lên server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/products');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Hiển thị thông báo thành công
        
      } else {
        // Hiển thị thông báo lỗi
        
      }
    };
    xhr.send(JSON.stringify({
      name,
      price,
      category,
    }));
  }

  //Quản lý ảnh sản phẩm 
  // Tải lên hình ảnh sản phẩm
function uploadProductImage(productId) {
    const formData = new FormData();
    const image = document.getElementById('product-image').files[0];
    formData.append('image', image);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/products/${productId}/images`);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Hiển thị thông báo thành công
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send(formData);
  }
  
  // Hiển thị ảnh sản phẩm trong danh sách sản phẩm
  function showProductImages(products) {
    for (const product of products) {
      const images = product.images;
      if (images.length > 0) {
        // Hiển thị ảnh đầu tiên
        const image = images[0];
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        // ...
      }
    }
  }
  
  // Chỉnh sửa và xóa hình ảnh sản phẩm
  function editProductImage(imageId) {
    // ...
  }
  
  function deleteProductImage(imageId) {
    // ...
  }
//quản lý kho hàng  
// Theo dõi số lượng sản phẩm trong kho
function trackProductQuantity(productId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/products/${productId}/quantity`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const quantity = JSON.parse(xhr.responseText);
        // Hiển thị số lượng sản phẩm
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  // Cảnh báo khi số lượng sản phẩm sắp hết
  function warnLowProductQuantity(productId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/products/${productId}/quantity/warning`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const warning = JSON.parse(xhr.responseText);
        if (warning) {
          // Hiển thị cảnh báo
          // ...
        }
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  // Nhập kho và xuất kho sản phẩm
  function importProduct(productId, quantity) {
    // ...
  }
  
  function exportProduct(productId, quantity) {
    // ...
  }
//quản lý đơn hàng   
// Hiển thị danh sách đơn hàng
function showOrders() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/orders');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const orders = JSON.parse(xhr.responseText);
        // Hiển thị danh sách đơn hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  // Xử lý đơn hàng
  function processOrder(orderId, status) {
    // ...
  }
  
  // In hóa đơn
  function printInvoice(orderId) {
    // ...
  }
//thống kê  
// Thống kê doanh thu theo sản phẩm, theo thời gian
function getRevenueStats(productId, startDate, endDate) {
    // ...
  }
  
  // Thống kê số lượng sản phẩm bán ra
  function getSalesStats(productId, startDate, endDate) {
    // ...
  }
  
  // Hiển thị biểu đồ thống kê
  function showStatsChart(data) {
    // ...
  }
//báo cáo
  // Xuất báo cáo doanh thu
function exportRevenueReport(startDate, endDate) {
    // ...
  }
  
  // Xuất báo cáo tồn kho
  function exportInventoryReport() {
    // ...
  }
  
  // Xuất báo cáo bán hàng
  function exportSalesReport(productId, startDate, endDate) {
    // ...
  }
//QUẢN LÝ ĐƠN HÀNG//
//DANH SÁCH ĐƠN HÀNG
function showOrders() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/orders');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const orders = JSON.parse(xhr.responseText);
        // Hiển thị danh sách đơn hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  function filterOrders(status) {
    // ...
  }
  
  function searchOrders(keyword) {
    // ...
  }
//CHI TIẾT ĐƠN HÀNG  
function showOrderDetail(orderId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/orders/${orderId}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const order = JSON.parse(xhr.responseText);
        // Hiển thị thông tin chi tiết đơn hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
//  THAO TÁC TRÊN ĐƠN HÀNG 
function confirmOrder(orderId) {
    
  }
  
  function packOrder(orderId) {
    
  }
  
  function deliverOrder(orderId) {
    
  }
  
  function cancelOrder(orderId) {
  }
  // THỐNG KÊ
  function getOrderStats(startDate, endDate) {
  }
  
  function getRevenueStats(startDate, endDate) {
  }
  
  function getSalesStats(startDate, endDate) {
  }
  // BÁO CÁO
  function exportOrdersReport(startDate, endDate) {
    // ...
  }
  
  function exportRevenueReport(startDate, endDate) {
    // ...
  }
  
  function exportSalesReport(startDate, endDate) {
    // ...
  }
// QUẢN LÝ KHÁCH HÀNG//
//DANH SÁCH KHÁCH HÀNG
function showCustomers() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/customers');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const customers = JSON.parse(xhr.responseText);
        // Hiển thị danh sách khách hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  function filterCustomers(group) {
    // ...
  }
  
  function searchCustomers(keyword) {
    // ...
  }
//CHI TIẾT KHÁCH HÀNG
function showCustomerDetail(customerId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/customers/${customerId}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const customer = JSON.parse(xhr.responseText);
        // Hiển thị thông tin chi tiết khách hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
//THÊM KHÁCH HÀNG  
function addCustomer() {
    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    // Kiểm tra dữ liệu đầu vào
    // ...
  
    // Gửi dữ liệu lên server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/customers');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Hiển thị thông báo thành công
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send(JSON.stringify({
      name,
      email,
      phone,
    }));
  }
//SỬA KHÁCH HÀNG
function editCustomer(customerId) {}
//XÓA KHÁCH HÀNG

function deleteCustomer(customerId) {}
//NHÓM KHÁCH HÀNG
function showCustomerGroups() {
    // ...
  }
  
  function addCustomerGroup() {
    // ...
  }
  
  function editCustomerGroup(groupId) {
    // ...
  }
  
  function deleteCustomerGroup(groupId) {
  }
  //DANH SÁCH KHUYẾN MÃI
  function showPromotions() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/promotions');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const promotions = JSON.parse(xhr.responseText);
        // Hiển thị danh sách khuyến mãi
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  function filterPromotions(status) {
    // ...
  }
  
  function searchPromotions(keyword) {
    // ...
  }
  //THÊM KHUYẾN MÃI
  function addPromotion() {
    // Lấy dữ liệu từ form
    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
  
    // Kiểm tra dữ liệu đầu vào
    // ...
  
    // Gửi dữ liệu lên server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/promotions');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Hiển thị thông báo thành công
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send(JSON.stringify({
      type,
      name,
      startDate,
      endDate,
    }));
  }
//SỬA KHUYẾN MÃI  
function editPromotion(promotionId) {
  }
  //XÓA KHUYẾN MÃI
  function deletePromotion(promotionId) {
    // ...
  }
  
  //LOẠI KHUYẾN MÃI
  function showPromotionTypes() {
    // ...
  }
  
  function addPromotionType() {
    // ...
  }
  
  function editPromotionType(typeId) {
    // ...
  }
  
  function deletePromotionType(typeId)
{}
//CHI TIẾT LOẠI KHUYẾN MÃI  
function showPromotionTypeDetail(typeId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/promotion-types/${typeId}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const type = JSON.parse(xhr.responseText);
        // Hiển thị thông tin chi tiết loại khuyến mãi
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
//THÊM QUY TẮC CHO LOẠI KHUYẾN MÃI   
function addPromotionTypeRule(typeId) {
    // Lấy dữ liệu từ form
    const type = document.getElementById('type').value;
    const value = document.getElementById('value').value;
  
    // Kiểm tra dữ liệu đầu vào
    // ...
  
    // Gửi dữ liệu lên server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/promotion-types/${typeId}/rules`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Hiển thị thông báo thành công
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send(JSON.stringify({
      type,
      value,
    }));
  }
//SỬA QUY TẮC CHO LOẠI KHUYẾN MÃI   
function editPromotionTypeRule(ruleId) {
    // ...
  }
//XÓA QUY TẮC CHO LOẠI KHUYẾN MÃI  
function deletePromotionTypeRule(ruleId) {
    // ...
  }
//QUẢN LÝ HỆ THỐNG //
  //BẢNG ĐIỀU KHIỂN //
  function showDashboard() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/dashboard');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Hiển thị thông tin tổng quan
        // ...
        // Hiển thị biểu đồ thống kê
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
//THỐNG KÊ SẢN PHẨM
function showProductStats() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/products/stats');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Hiển thị bảng thống kê
        // ...
        // Hiển thị biểu đồ thống kê
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
// THÔNG KẾ KHÁCH HÀNG 
function showCustomerStats() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/customers/stats');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Hiển thị bảng thống kê
        // ...
        // Hiển thị biểu đồ thống kê
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
// THỐNG KÊ THƠI GIAN
function showTimeStats() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/time/stats');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Hiển thị bảng thống kê
        // ...
        // Hiển thị biểu đồ thống kê
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
//BÁO CÁO
function exportRevenueReport() {
    // ...
  }
  
  function exportSalesReport() {
    // ...
  }
  
  function exportCustomerReport() {
    // ...
  }
  
  function exportInventoryReport() {
    // ...
  }
//QUẢN LÝ TÀI KHOẢN //
// ĐĂNG NHẬP 
function login() {
    // Lấy dữ liệu từ form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Kiểm tra dữ liệu đầu vào
    // ...
  
    // Gửi dữ liệu lên server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Lưu trữ thông tin đăng nhập
        // ...
        // Chuyển hướng đến trang chủ
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send(JSON.stringify({
      username,
      password,
    }));
  }
// ĐĂNG KÝ 
function register() {
    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Kiểm tra dữ liệu đầu vào
    // ...
  
    // Gửi dữ liệu lên server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Gửi email xác nhận
        // ...
        // Hiển thị thông báo thành công
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send(JSON.stringify({
      name,
      email,
      password,
    }));
  }
// QUẢN LÝ THÔNG TIN TÀI KHOẢN 
function showAccountInfo() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/account');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const account = JSON.parse(xhr.responseText);
        // Hiển thị thông tin tài khoản
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  function editAccountInfo() {
    // ...
  }

  // QUẢN LÝ LỊCH SỬ MUA HÀNG
  function showOrders() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/orders');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const orders = JSON.parse(xhr.responseText);
        // Hiển thị danh sách đơn hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
//LỌC ĐƠN HÀNG   
function filterOrders(status) {
    // ...
  }
  
  function searchOrders(keyword) {
    // ...
  }
// CHI TIẾT ĐƠN HÀNG
function showOrderDetail(orderId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/orders/${orderId}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const order = JSON.parse(xhr.responseText);
        // Hiển thị chi tiết đơn hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
//HỦY ĐƠN HÀNG
function cancelOrder(orderId) {
  }
//XUẤT BÁO CÁO
function exportOrdersReport() {}
//QUẢN LÝ ĐỊA CHỈ GIAO HÀNG 
function showShippingAddresses() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/shipping-addresses');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const addresses = JSON.parse(xhr.responseText);
        // Hiển thị danh sách địa chỉ giao hàng
        // ...
      } else {
        // Hiển thị thông báo lỗi
        // ...
      }
    };
    xhr.send();
  }
  
  function addShippingAddress() {
    // ...
  }
  
  function editShippingAddress(addressId) {
    // ...
  }
  
  function deleteShippingAddress(addressId) {
    // ...
  }
// QUẢN LÝ THANH TOÁN
function showPaymentMethods() {
    // ...
  }
  
  function addPaymentMethod() {
    // ...
  }
  
  function editPaymentMethod(methodId) {
    // ...
  }
  
  function deletePaymentMethod(methodId) {
    // ...
  }
// QUẢN LÝ THÔNG BÁO
function showNotifications() {
    // ...
  }
  
  function enableNotifications() {
    // ...
  }
  
  function disableNotifications() {
    // ...
  }
// QUẢN LÝ YÊU THÍCH   
function showWishList() {
    // ...
  }
  
  function addToWishList(productId) {
    // ...
  }
  
  function removeFromWishList(productId) {
    // ...
  }
  
  