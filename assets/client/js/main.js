
let imgs = document.querySelectorAll("img");

imgs.forEach((img, index) => {
  img.addEventListener("click", function (e) {
    if (e.target == this) {
      // crate element
      let openDiv = document.createElement("div"); //main div
      let butonsSection = document.createElement("div"); // btn dev
      let imgPreview = document.createElement("img"); 
      let closeBtn = document.createElement("button");
      let resizeBtn = document.createElement("button");
      let heightInput = document.createElement("input");
      let widthInput = document.createElement("input");
      // set values
      widthInput.value = e.target.naturalWidth;
      heightInput.value = e.target.naturalHeight;
      resizeBtn.innerHTML = "Resize";
      closeBtn.innerText = "Close";
      imgPreview.src = this.src;
      // add classes
      widthInput.classList.add("widthInput");
      heightInput.classList.add("heightInput");
      resizeBtn.classList.add("resizeButton");
      closeBtn.classList.add("closeBtn");
      imgPreview.classList.add("imgPreview");
      openDiv.classList.add("openDiv");
      // appen element
      butonsSection.append(widthInput, heightInput, resizeBtn);
      openDiv.append(imgPreview, butonsSection, closeBtn);
      document.body.append(openDiv);
      // close function
      closeBtn.addEventListener("click", function () {
        openDiv.remove();
      });
      // navigate to 
      resizeBtn.addEventListener("click", function () {
        let imageName = imgPreview.src.split("/").pop();
        window.location.assign(
          `http://localhost:3000/gallery/images?filename=${imageName}&width=${widthInput.value}&height=${heightInput.value}`
        );
      });
    }
  });
});
