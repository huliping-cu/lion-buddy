$(document).ready(function(){

    //get user input from google login
    let email = sessionData["email"]
    let googlePictureurl = sessionData["picture"]

    let checkUrl = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/getuser?email=' + email
        fetch(checkUrl)
            .then(response => {
                // console.log("response.json(): ",response.json())
                return response.json();
            })
            .then(user => {
                $("#nav_pic").attr("src", user['img_url']);
            })
            .catch(function(){
                $("#nav_pic").attr("src", googlePictureurl);
            })

})
