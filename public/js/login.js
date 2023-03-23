
//create login and signup//
function changepage(){
    let element=document.querySelector(".spanchange");
    let titles=document.querySelector(".titles");
    let signin=document.getElementById("signin");
    let signup=document.getElementById("signup");
    let changeline=document.querySelector(".changeline");
console.log(element.innerText);
if(element.innerText=="Sign In"){
    changeline.innerHTML="Don't have an account?";
    element.innerHTML="Sign Up";
    titles.innerText="Sign In";
    signin.style.display="grid";
    signup.style.display="none";
}
else{
    changeline.innerHTML="Already have an account?"; 
    element.innerHTML="Sign In";
    titles.innerText="Sign Up";
    signin.style.display="none";
    signup.style.display="grid"; 
}
}

//check input values in signup//  
$("#signupsubmit").click(function(){
    let username=$("#signupname").val();
    let email=$("#signupemail").val();
    let password=$("#signuppassword").val();
    let emailcheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(username.trim()==''){
       $('.errmsg1').css('display','block');
       $('#signupname').css('border-bottom','1px solid red');
    }  
    else{
        $('.errmsg1').css('display','none');
        $('#signupname').css('border-bottom','1px solid gray');  
     }

    if(email.trim()==''){
        $('.errmsg2').css('display','block');
        $('.errmsg2').text("Can't be empty");
        $('#signupemail').css('border-bottom','1px solid red'); 
     }
     else{
        $('.errmsg2').css('display','none');
        $('#signupemail').css('border-bottom','1px solid gray');  
     }
     if(password.trim()==''){
        $('.errmsg3').css('display','block');
        $('.errmsg3').text("Can't be empty");
        $('#signuppassword').css('border-bottom','1px solid red');
     }
     else{
        $('.errmsg3').css('display','none');
        $('#signuppassword').css('border-bottom','1px solid gray'); 
     }
     
     if(emailcheck.test(email)==false && email!=""){
        $('.errmsg2').css('display','block');
        $('.errmsg2').text("Invalid Email");
        $('#signupemail').css('border-bottom','1px solid red') 
     }
     if(password!='' && password.length<7){
        $('.errmsg3').css('display','block');
        $('.errmsg3').text("Must be 7 Charactor");
        $('#signuppassword').css('border-bottom','1px solid red');
     }
     if(username.trim()!='' && emailcheck.test(email)!=false && password.length>7){
        let userdetail={
            name:username.trim(),
            email:email.trim(),
            password:password.trim()
        }
        checkdbvalues(1)
     }
})

//check db values in signup//
function checkdbvalues(num){
   fetch('checkdbvalues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'John Doe' })
      })
      .then((response) => {return response.json()})
      .then((data) => {
        if(num==1){
            checkusers(data) 
        }
        else{
            checklogin(data)
        }
      })  
    }

//check this username is available error//
function checkusers(data){
    let username=$("#signupname").val().trim();
    let email=$("#signupemail").val().trim();
    let password=$("#signuppassword").val().trim();
    let count=0;
    for(let i=0; i<data.length; i++){
       if(username.toUpperCase().trim()==data[i].name.toUpperCase().trim()){
            $('.errmsg6').css('display','block');
        $('.errmsg6').text("This Username has been already taken");   
        }
        else if(email.toUpperCase().trim()==data[i].email.toUpperCase().trim()){
        $('.errmsg6').css('display','block');
        $('.errmsg6').text("This Email has been already taken");  
        }
        else{
            count++;
            if(count==data.length){
                $('.errmsg6').css('display','none');
                
                let userdetail={
                    username:username,
                    email:email,
                    password:password, 
                }
                pushsignupvalues(userdetail);
                $("#signupname").val('');
                $("#signupemail").val('');
                $("#signuppassword").val('');
        }
    }
    }
}

function pushsignupvalues(userdetail) {
   fetch('signupvalues',{
    method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdetail)
   })
   .then((response) => {return response.json()})
      .then((data) => {
        window.location.href='/index';
        history.pushState(null, null, '/index'); 
      })
}


//set login error//
$("#loginsubmit").click(function(){
    let password=$("#loginpassword").val();
    let email=$("#loginemail").val(); 
    if(email.trim()==''){
        $('.errmsg4').css('display','block');
        $('.errmsg4').text("Can't be empty");
        $('#loginemail').css('border-bottom','1px solid red'); 
     }
     else{
        $('.errmsg4').css('display','none');
        $('#loginemail').css('border-bottom','1px solid gray');  
     }
     if(password.trim()==''){
        $('.errmsg5').css('display','block');
        $('.errmsg5').text("Can't be empty");
        $('#loginpassword').css('border-bottom','1px solid red');
     }
     else{
        $('.errmsg5').css('display','none');
        $('#loginpassword').css('border-bottom','1px solid gray'); 
     }
     if(password!='' && email!=''){
        checkdbvalues(2)
     }
})

function checklogin(data){
    let password=$("#loginpassword").val();
    let email=$("#loginemail").val(); 
    let count=0;
    for(let i=0; i<data.length; i++){
        if(password.toUpperCase().trim()==data[i].password.toUpperCase().trim() && email.toUpperCase().trim()==data[i].email.toUpperCase().trim()){
            $('.errmsg7').css('display','none'); 
            $("#loginpassword").val('');
            $("#loginemail").val('');
            showwriter()
        }
        else{
          count++
        if(count==data.length){
            $('.errmsg7').css('display','block'); 
        }
        }
    }
}

function showwriter(){
    fetch('cookieshow',{
        method:'POST',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:'mani'})
   })
   .then((response) => {return response.json()})
      .then((data) => {
        window.location.href='/index'; 
        history.pushState(null, null, '/index');
      })
}
