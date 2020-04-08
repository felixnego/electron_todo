// Check off specific to dos by clickling 
$("ul").on("click", "li", function(e){
    $(this).toggleClass("completed")
})

// Delete a to do when the span is clicked
$("ul").on("click", "span", function(e) {
    let todo = $(this).parent().text();

    $.ajax({
        type: 'DELETE',
        url: '/delete/' + todo,
        success: (data) => {
            console.log('Delete call successful: ', data);
        },
        error: (err) => {
            console.log(err);
        }
    });

    $(this).parent().fadeOut(400, function() {
        $(this).remove();
    });
    
    event.stopPropagation();
})


$(".fa-plus").on("click", function(e) {
    $("input").css({
        display: "inline"
    })
})