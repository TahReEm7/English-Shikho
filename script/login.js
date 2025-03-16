document.getElementById("main").style.display = 'none'
document.getElementById("nav").style.display = 'none'
let text = document.getElementById("name")
let pass = document.getElementById("pass")

document.getElementById("start").addEventListener("click", (e)=>{
    e.preventDefault()
    if(!text.value && !pass.value){
      alert("Enter username and login pin first")
    }
    else{
      if (text.value) {
        if (pass.value === "123456") {
          document.getElementById("main").style.display = 'block'
          document.getElementById("nav").style.display = 'block'
          document.getElementById("hero").style.display = 'none'
          alert("Logged in successfully ")
        } else {
          alert("Incorrect password");
        }
    }
    else{
        alert("Enter a valid username")
    }
    }
  
})

document.getElementById("Logout").addEventListener("click", (e)=>{
    document.getElementById("main").style.display = 'none'
    document.getElementById("nav").style.display = 'none'
      document.getElementById("hero").style.display = 'flex'
})


document.getElementById("home").addEventListener("click", function () {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
})


const showLoader =()=>{
   document.getElementById("loader").classList.remove("hidden")
          document.getElementById("card-container").classList.add("hidden")
}

const hideLoader =()=>{
  document.getElementById("loader").classList.add("hidden")
  document.getElementById("card-container").classList.remove("hidden")
}