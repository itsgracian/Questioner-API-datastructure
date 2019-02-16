function updateProfile(e){
  e.preventDefault();
  //load data
  const loadData = document.querySelector(".loadData");
  loadData.style.display = "block";
  let imageFile=document.querySelector(".files").files[0];
  if (!imageFile) {
    loadData.style.display = "none";
    document.querySelector("small[key='image-error']").textContent="Whoops image is required.";
  }else {
    let form=new FormData();
    form.append('images',imageFile);
    //
    fetch(`http://localhost:5000/api/v1/users/profile/picture/`,{
      method:"PATCH",
      mode: "cors",
      headers:{
        "Authorization":getToken(),
        "Access-Control-Allow-Origin": "*"
      },
      body:form
    })
    .then((res)=>res.json())
    .then((result)=>{
      loadData.style.display="none";
      if (result.error) {
        document.querySelector("small[key='image-error']").textContent=result.error;
      }
      if (result.success) {
        currentUser(result.user);
        loadData.style.display="block";
        document.querySelector(".savedMsg.imageMsg").textContent=result.message;
        setTimeout(()=>{
          window.location.reload(true);
        },3000);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

}
