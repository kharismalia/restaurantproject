fetch("/api/v1/product", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    let result = data.data;
    if (data.data.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const tr = document.createElement("tr");

        const tdNo = document.createElement("td");
        tdNo.textContent = i + 1;
        tr.appendChild(tdNo);

        const tdName = document.createElement("td");
        tdName.textContent = result[i].name;
        tr.appendChild(tdName);

        const tdHarga = document.createElement("td");
        tdHarga.textContent = result[i].price;
        tr.appendChild(tdHarga);

        const tdStok = document.createElement("td");
        tdStok.textContent = result[i].stock;
        tr.appendChild(tdStok);

        // const tdPhoto = document.createElement("td");
        // tdPhoto.textContent = result[i].photo;
        // tr.appendChild(tdPhoto);

        const tdKategori = document.createElement("td");
        tdKategori.textContent = result[i].ktg_name;
        tr.appendChild(tdKategori);

        const tdEdit = document.createElement("td");
        tdEdit.style.display = "flex"
        tdEdit.style.gap = "8px"
        tdEdit.style.justifyContent = "center"

        const anchorEdit = document.createElement("a");
        anchorEdit.href = `./edit?name=${result[i].name}`
        anchorEdit.style.background = "none";
        anchorEdit.style.border = "none";
        // anchorEdit.href = `#`;
        // anchorEdit.id = "update"
        const iconEdit = document.createElement("img");
        iconEdit.src = "../image/edit-24.png"
        anchorEdit.appendChild(iconEdit)
        tdEdit.appendChild(anchorEdit);

        const buttonDelete = document.createElement("button");
        buttonDelete.style.border = "none"
        buttonDelete.style.cursor = "pointer"
        const iconTrash = document.createElement("img");
        iconTrash.src = "../image/trash-24.png"
        buttonDelete.appendChild(iconTrash);
        buttonDelete.onclick = () => {
          if (
            confirm(
              `Apakah Anda yakin ingin menghapus ${result[i].name} (${result[i].id})?`
            )
          ) {
            fetch(`/api/v1/product/${result[i].name}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            location.reload();
          }
        };
        tdEdit.appendChild(buttonDelete);

        const detail = document.createElement("button");
        detail.style.background = "none";
        detail.style.border = "none";
        const iconDetail = document.createElement("img");
        iconDetail.src = "../image/detail-24.png"
        detail.appendChild(iconDetail);
        detail.onclick = () => {
          const detail = document.getElementById("detail");
          const span = document.getElementsByClassName("close")[2];
          detail.style.display = "block";

          span.onclick = function () {
            detail.style.display = "none";
            location.reload();
          }

          window.onclick = function (event) {
            if (event.target == detail) {
              detail.style.display = "none";
              location.reload();
            }
          }

          fetch(`/api/v1/product/${result[i].name}`, {
            method:"GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).then(res => res.json())
          .then(dataDetail =>{
            console.log(dataDetail)
              const container = document.querySelector("#containerdetail");
              const div =  document.createElement("div");
              div.style.boxShadow = "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              const img = document.createElement("img");
              img.src = `../images/${dataDetail.data[0].photo}`
              img.height = "200";
              img.width = "264";
              img.style.padding = "6px"
              div.appendChild(img)


              const ui = document.createElement("ul");
              ui.style.listStyle = "none"
              ui.style.maxWidth = "256px"
              ui.style.width = "100%"
              const liNama = document.createElement("li");
              liNama.textContent = `NAMA: ${dataDetail.data[0].name}`;
              const liHarga = document.createElement("li");
              liHarga.textContent = `HARGA: ${dataDetail.data[0].price}`; 
              const liStok = document.createElement("li");
              liStok.textContent = `STOK: ${dataDetail.data[0].stock}`;
              
              const liKategori = document.createElement("li");
              liKategori.textContent = `KATEGORI: ${dataDetail.data[0].ktg_name}`;
            
              ui.appendChild(liNama);
              ui.appendChild(liHarga);
              ui.appendChild(liStok);
              ui.appendChild(liKategori);

              container.appendChild(div);
              container.appendChild(ui);

          });
        }

        tdEdit.appendChild(detail);

        tr.appendChild(tdEdit);

        document.querySelector("tbody").appendChild(tr)
      }
    } else {
      const h1 = document.createElement("h1");
      h1.textContent = "PRODUCT KOSONG"
      h1.style.padding = "1rem"
      document.querySelector('tbody').appendChild(h1)
    }

  })


// modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// end modal //

// get kategori
const kategori = document.querySelector("#kategori");
fetch("/api/v1/category", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

})
  .then(response => response.json())
  .then(data => {
    if (data.data.length > 0) {
      data.data.map(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.ktg_name;
        kategori.appendChild(option);
      });
    } else {
      const option = document.createElement("option");
      option.textContent = "KOSONG";
      kategori.appendChild(option);
    }

  });

// end kategori  //


// tambah product

document.newProduct.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("name", document.newProduct.name.value);
  data.append("price", document.newProduct.harga.value);
  data.append("stock", document.newProduct.stok.value);
  data.append("photo", document.newProduct.photo.files[0]);
  data.append("categoris", document.newProduct.kategori.value);

  await fetch("/api/v1/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  }).then(res => res.json())
    .then(data => {
      console.log(data.data)
      modal.style.display = "none";
      location.reload()
    })
}



// modal update



// end modal update