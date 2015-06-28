/*jslint sloppy: true*/

function init() {
  var list = document.querySelector('#todolist');
  
  getListTersimpan();

  // biar objek list di atas bisa digeret-geret
  new Slip(list);

  // biar listnya bisa diurutkan
  list.addEventListener('slip:reorder', function (e) {
    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
    simpanList();
  });

  list.addEventListener('slip:swipe', function (e) {
    e.target.parentNode.removeChild(e.target);
    simpanList();
  });

  document.querySelector('#tambahlist').addEventListener('click',
    function () {
      tambahList(document.querySelector('#listbaru').value);
      document.querySelector('#listbaru').value = '';
    },
    false
  );
  document.querySelector('#toggleinfo').addEventListener('click',
    toggleInfo,
    false
  );

  window.addEventListener("deviceorientation", function (e) {
    //var a = e.alpha;
    //a = (a > 10) ? 10 : (a < -10) ? -10 : a;
    
    list.style.transform =
      "rotateZ(0deg) " +
      "rotateX(0deg) " +
      "rotateY(" + (-e.gamma) + "deg)";
  });
}

// buat nambah item list baru
function tambahList(todo, warna) {
  var list = document.querySelector('#todolist');
  
  var listbaru = document.createElement('li'); // bikin elemen item list baru
  listbaru.appendChild(document.createTextNode(todo)); // masukin teksnya ke item list baru
  listbaru.style.backgroundColor = (warna || warnaRandom()); // kasih warna background ke item list
  list.appendChild(listbaru); // masukin item ke <ul> todolist
  simpanList();
}

function warnaRandom() {
  var koleksiWarna = ['#ed5565', '#ffce54', '#48cfad', '#5d9cec',
                      '#ec87c0', '#ccd1d9', '#fc6e51', '#a0d468',
                      '#4fc1e9', '#ac92ec', '#f5f7fa'];
  return koleksiWarna[Math.floor(Math.random() * koleksiWarna.length)];
}

function toggleInfo() {
  var info = document.querySelector('#info');
  info.style.display = (info.style.display == 'none') ? 'block' : 'none';
}

function simpanList() {
  var list = document.querySelector('#todolist');
  
  var todo = list.children;
  var daftarTodo = '', daftarWarna = '';

  for (var i = 0; i < todo.length; i++) {
    daftarTodo += todo[i].innerHTML + ';';
    daftarWarna += todo[i].style.backgroundColor + ';';
  }
  daftarTodo = daftarTodo.substr(0, daftarTodo.length-1);
  daftarWarna = daftarWarna.substr(0, daftarWarna.length-1);

  // simpan ke localStorage
  localStorage.setItem('todo', daftarTodo);
  localStorage.setItem('warna', daftarWarna);
}

function getListTersimpan() {
  var list = document.querySelector('#todolist');
  var daftarTodo, daftarWarna;

  if (localStorage.getItem('todo')) {
    daftarTodo = localStorage.getItem('todo').split(';');
    daftarWarna = localStorage.getItem('warna').split(';');
    
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    
    for (var i = 0; i < daftarTodo.length; i++) {
      tambahList(daftarTodo[i], daftarWarna[i]); 
    }
  }
}