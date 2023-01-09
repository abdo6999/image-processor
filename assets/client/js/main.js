// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("btncontainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  var current = document.getElementsByClassName("btn-active");
  current[0].className = current[0].className.replace(" btn-active", "");
  this.className += " btn-active";
}

let imgs = document.querySelectorAll("img");
imgs.forEach((img, index) => {
  img.addEventListener("click", function (e) {
    if (e.target == this) {
      let openDiv = document.createElement("div");
      let imgPreview = document.createElement("img");
      let butonsSection = document.createElement("div");
      butonsSection.classList.add("butonsSection");
      let closeBtn = document.createElement("button");
      let getResize = document.createElement("button");
      let nextBtn = document.createElement("input");
      let prevButton = document.createElement("input");
      prevButton.value = e.target.naturalWidth;
      nextBtn.value = e.target.naturalHeight;
      getResize.innerHTML = "Resize";
      nextBtn.classList.add("nextButton");
      prevButton.classList.add("prevButton");
      getResize.classList.add("prevButton");
      closeBtn.classList.add("closeBtn");
      closeBtn.innerText = "Close";
      closeBtn.addEventListener("click", function () {
        openDiv.remove();
      });
      imgPreview.classList.add("imgPreview");
      imgPreview.src = this.src;
      butonsSection.append(prevButton, nextBtn, getResize);
      openDiv.append(imgPreview, butonsSection, closeBtn);
      openDiv.classList.add("openDiv");
      document.querySelector("body").append(openDiv);
      getResize.addEventListener("click", function () {
        let imageName = imgPreview.src.split("/").pop();
        window.location.assign(
          `http://localhost:3000/gallery/images?filename=${imageName}&width=${prevButton.value}&height=${nextBtn.value}`
        );
      });
    }
  });
});
