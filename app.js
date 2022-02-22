function removeElement(element){
    document.getElementById(element).style.display = "none";
}
function showElement(element,displayType){
    document.getElementById(element).style.display = displayType;
}
function login(event){
    event.preventDefault();
    document.getElementById('cover').style.display = "flex";
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const input3 = document.getElementById('input3').value;
    axios.post('https://codeloader.herokuapp.com/api/auth/validate',{
        box1:input1,
        box2:input2,
        box3:input3,
    }).then((res)=>{
        showToast(res.data.message,"success")
        removeElement("form")
        showElement("payload","block")
        payloadTemplate(res.data.data);
        document.getElementById('cover').style.display = "none";
    }).catch((err)=>{
        console.log(err);
        document.getElementById('cover').style.display = "none";
    })
}
function getToastColorByType(type){
    if(type=="error")
        return "linear-gradient(to right,#ED213A ,#93291E )"
    else
        return "linear-gradient(to right, #00b09b, #96c93d)"
}
function payloadTemplate(payloads){
    console.log(payloads);
    let template = "";
    for(let index in payloads){
        let payload = payloads[index];
        template += `<div class="payload-container">
                    <div>
                        <h4>${payload.name}</h4>
                        <p>${payload.description}</p>
                    </div>
                    <button><a class="download" href="${payload.url}">Download</a></button>
                    </div>`
    }
    document.getElementById('payload').innerHTML += template;
}
function showToast(message,type){
    Toastify({
    text:message,
    duration: 3000,
    close: true,
    gravity: "center", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:getToastColorByType(type),
    },
    onClick: function(){} // Callback after click
  }).showToast();
}
