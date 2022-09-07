function display_cuisines(cuisines){
    $.each(cuisines, function(_, value){
        let cuisine = value['type']
        let imageUrl = value['url']
        let cont = $('<div class="col-md-5 cuisine-cont-style">')
        let image = $('<img src="' + imageUrl + '" alt="' + cuisine + '" class="img-fluid cuisine-image">')
        let url = $('<a class="cuisine-text" href="/restaurant/' + cuisine + '">' + cuisine.charAt(0).toUpperCase() + cuisine.slice(1) + '</a>')
        cont.append(image)
        cont.append(url)
        $("#restaurant-cuisines").append(cont)
    })
}

$(document).ready(function(){
    // $("#restaurant-cuisines").empty()
    display_cuisines(cuisines)
})