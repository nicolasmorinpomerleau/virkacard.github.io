
//====================================================================
// ================================== Virka ==========================
//====================================================================
var tentative = 0;
var nouveuMessage;

//============================================================
//    background-color: rgb(33, 129, 202); pour le logo virka
//    font-family: "Avenir W01", Arial, sans-serif;
//============================================================


function ListeDesMarchands(){
//    *************************************************************
//    ************************ Merchant Page ************************
//    *************************************************************
if(localStorage.boolrestauration  == "false"){
    document.getElementById("mobilier").style.display="none";
}
else{
          $.get("/canam/merchant.html", function(data){
             $('#merchantPage').append(data);
         });
};

//    *************************************************************
//    ************************ Offres Spéciale ********************
//    *************************************************************
    if(localStorage.booloffers == "false"){
        document.getElementById("OffresSpeciale").style.display="none";
    }

//    *************************************************************
    
};


$(function(){
        if(localStorage.Email!=undefined && localStorage.code != undefined){
            nameID               = document.getElementById("name");
            nameID.innerHTML     = localStorage.name;
            organisationID           = document.getElementById("organisation");
            organisationID.innerHTML = localStorage.organisation; 
            numeroID             = document.getElementById("Numero");
            numeroID.innerHTML   = localStorage.memberNumber;
                    
            if(localStorage.boolmarchandlist == "false"){
                document.getElementById('ListeDesMarchands').style.display="none";
            }
            if(localStorage.boolevents == "false"){
                document.getElementById('events').style.display="none";
            }
            
            window.location.href = "#page2";
            }
         else{
            window.location.href = "#page1";
            }
});

//Pour cacher la nav bar
window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

function clear1(){
    localStorage.clear();
}

function Validate(){        
    email = document.getElementById('email').value;
    code  = document.getElementById('code').value; 
    
    $.ajax({
    url:'https://5m1qfi37ie.execute-api.eu-west-1.amazonaws.com/Dev/emailCode',
//    url: 'https://mr0pwkh059.execute-api.eu-west-1.amazonaws.com/Dev/emailCode',

    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({email, code}),
            
    success: function(res) {
    if(res.answer == 'userFind'){
    nameID               = document.getElementById("name");
    nameID.innerHTML     = res.info.name;
    organisationID           = document.getElementById("organisation");
    organisationID.innerHTML = res.info.company;
    numeroID           = document.getElementById("Numero");
    numeroID.innerHTML = "#"+res.info.memberNumber;        
        
    localStorage.name          = res.info.name;
    localStorage.organisation   = res.info.company;
    localStorage.memberNumber  = "#"+res.info.memberNumber;
    localStorage.codeBar       = "#"+res.info.memberNumber;
        //        url WebView
    localStorage.urlMarchand   = res.info.urlMarchand;
    localStorage.urlOffres     = res.info.urlOffres;
    localStorage.urlEvent      = res.info.urlEvent;
     
    localStorage.Email         = email;
    localStorage.code          = code;
        
    window.location.href = "#page2";
    }
    else{
        window.location.href = "#page1";
        if(res.answer == 'userNotFind'){
        tentative = tentative +1;
        if(tentative < 3){
            var myCollection = document.getElementsByTagName("label");
            if(tentative==1){
               myCollection[4].innerHTML = "Le Courriel ou le code n'est pas correct, veuillez réessayer de nouveau.";
            }
            else{
               myCollection[5].innerHTML = "Le Courriel ou le code n'est pas correct, veuillez réessayer de nouveau.";
            }
        }
        else{
            var myCollection = document.getElementsByTagName("label");
            myCollection[5].innerHTML = "Veuillez contacter l'administration de votre organisation";
        }
       }
    }
  },
error: function(res) {
 alert("Erreur de lecture: "+ res.message);
}
});
}
