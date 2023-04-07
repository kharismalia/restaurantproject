const logout = document.querySelector(".logout");


logout.addEventListener("click",function(e){
    localStorage.removeItem("token");
    location.href = "/login"
});