let imgs = document.querySelectorAll("img");
imgs.forEach((img) => {
  img.addEventListener("click", function (e) {
    if (e.target == this) {
      // create element with factory function (type,innerHTML,class,AttributeObject)
      let btnSection = creatElement("div");
      let openDiv = creatElement("div", '', "openDiv");
      let imgPreview = creatElement("img", '', "imgPreview", {
        src: `${this.src}`,
      });
      let closeBtn = creatElement("button", "Close", "closeBtn");
      let resizeBtn = creatElement("button", "Resize", "resizeButton", {
        type: "submit",
      });
      let heightInput = creatElement("input", '', "heightInput", {
        require: "",
        type: "number",
        min: "150",
        value: `${e.target.naturalHeight}`,
      });
      let widthInput = creatElement("input", '', "widthInput", {
        require: "",
        type: "number",
        min: "150",
        value: `${e.target.naturalWidth}`,
      });
      // append all 
      btnSection.el.append(widthInput.el, heightInput.el, resizeBtn.el);
      openDiv.el.append(imgPreview.el, btnSection.el, closeBtn.el);
      document.body.append(openDiv.el);
      // close function
      closeBtn.addEvent({
        click: function () {
          openDiv.el.remove();
        }
      })
      // navigate to
      resizeBtn.addEvent({
        click: function () {
          let imageName = imgPreview.el.src.split("/").pop();
          window.location.assign(
            `http://localhost:3000/gallery/images?filename=${imageName}&width=${widthInput.el.value}&height=${heightInput.el.value}`
          );
        }
      });
      // disabled btn when input invalid
      [heightInput,widthInput].map((el)=>{
        el.addEvent({
          change: function disabled() {
            if (widthInput.el.validity.valid && heightInput.el.validity.valid) {
              resizeBtn.el.disabled = false;
            } else {
              resizeBtn.el.disabled = true;
              console.log("min value 150");
            }
          }
        })
      }) //close the map function
    }
  });
});
// factory function to crate element
function creatElement(type, text, addClass, setAttObject) {
  let el = document.createElement(type);
  if (text) {
        el.innerHTML = text;
    }
  if (addClass) {
    el.classList.add(addClass);
  }
  if(setAttObject){
    if (Object.keys(setAttObject).length !== 0) {
      for (const [key, value] of Object.entries(setAttObject)) {
        el.setAttribute(key, value);
      }
    }
  }
  return {
    el,
    setText(text) {
      el.innerHTML = text;
    },
    setAtt(setAttObject) {
      for (const [key, value] of Object.entries(setAttObject)) {
        el.setAttribute(key, value);
      }
    },
    addEvent(eventObject){
      for (const [key, value] of Object.entries(eventObject)) {
        el.addEventListener(key,value)
      }
    }
  };
}
