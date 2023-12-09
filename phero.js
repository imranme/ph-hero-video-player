const search_data = () => {
    fetch(`https://openapi.programming-hero.com/api/videos/categories`)
      .then((res) => res.json())
      .then((value) => displaydata(value.data));
  };
  
  // display category list
  const displaydata = (data) => {
    const caragory = document.getElementById("caragory");
    data.forEach((element) => {
      const btn = document.createElement("div");
      btn.innerHTML = `
      <button
      id='${element.category_id}'
      class="iteam_button"
      onclick="loadcategorydetails('${element.category_id}')"
     
      >
      ${element.category}
      </button>
      
      `;
      caragory.appendChild(btn);
    });
    document.getElementById("1000").classList.add("clicked");
  };
  let temp = "1000";
  const loadcategorydetails = (id) => {
    temp = id;
    let buttons = document.getElementsByClassName("iteam_button");
  
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("clicked");
    }
    document.getElementById("sortbyview").classList.remove("clicked");
    document.getElementById(temp).classList.add("clicked");
  
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
      .then((res) => res.json())
      .then((value) => {
        if (value.data.length > 0) {
          display_alldata(value.data);
        } else {
          display_sorry();
        }
      });
  };
  
  // show alltime
  const showalltime = () => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
      .then((res) => res.json())
      .then((value) => {
        display_alldata(value.data);
      });
  };
  // display all data
  const display_alldata = (data) => {
    const iteams = document.getElementById("products");
    iteams.innerHTML = "";
    const sorry_div = document.getElementById("sorry");
    sorry_div.innerHTML = "";
  
    data.forEach((iteam) => {
      function isverified() {
        if (iteam.authors[0].verified) {
          return "PHERO/verify.png";
        } else {
          return "";
        }
      }
      const card = document.createElement("div");
      card.classList.add("box");
      card.innerHTML = `
      <div class="time_continar">   <img class="box_img" src="${
        iteam.thumbnail
      }" alt="">
      <div class="time_text">${
        iteam.others.posted_date.length > 0
          ? date_find(iteam.others.posted_date)
          : ""
      }</div></div>
   
      <div class="title">
          <img class="box_logo" src="${iteam.authors[0].profile_picture}" alt="">
          
          <h5> ${iteam.title}</h5>
      </div>
      <div class="name">
          <p class="text">${iteam.authors[0].profile_name}</p>
          <img class="verify" src="${isverified()}" alt="">
      </div>
      <div class="view">
          <p class="text">${iteam.others.views} views</p>
      </div>
     
      `;
  
      iteams.appendChild(card);
    });
  };
  
  function date_find(timeInSeconds) {
    const years = Math.floor(timeInSeconds / (365 * 24 * 3600));
    const months = Math.floor((timeInSeconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
    const days = Math.floor((timeInSeconds % (30 * 24 * 3600)) / (24 * 3600));
    const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    let result = '';
    if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''} `;
    }
    if (months > 0) {
        result += `${months} month${months > 1 ? 's' : ''} `;
    }
    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
        result += `${hours} hr${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
        result += `${minutes} min${minutes > 1 ? 's' : ''} `;
    }
    if (result === '') {
        return '';
    } else {
        return result + 'ago';
    }
  }

  const display_sorry = () => {
    const iteams = document.getElementById("products");
    iteams.innerHTML = "";
    const sorry_div = document.getElementById("sorry");
    sorry_div.innerHTML = "";
    const sorry_card = document.createElement("div");
    sorry_card.innerHTML = `
    <img class="sorry_img" src="PHERO/Icon.png" alt="">
    <h1>Oops!! Sorry, There is no </br>
    content here</h1>
    `;
    sorry_div.appendChild(sorry_card);
  };
  
  const practice = () => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${temp}`)
      .then((res) => res.json())
      .then((value) => sort_item(value.data));
  };
  
  const sort_item = (data) => {
    document.getElementById("sortbyview").classList.add("clicked");
    data.sort(
      (s1, s2) => s2.others.views.slice(0, -1) - s1.others.views.slice(0, -1)
    );
    if (data.length > 0) {
      display_alldata(data);
    }
  };
  
  search_data();
  showalltime();
  