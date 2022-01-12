var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

$(window).click(function(e) {
    if (e.target.id == 'myModal') {
        $(".modal").attr("style","display:none;")
    }
});

//delete confirm
$('a.confirmDeletion').on('click', function () {
    if (!confirm('Удалить?'))
        return false;
});
$('a.header__link').on('click', function () {
    if (!confirm('Выйти из аккаунта?'))
        return false;
});

// image preview
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $("#imgPreview").attr('src', e.target.result).width(100).height(100);
            $("#imgPreview_edit").attr('src', e.target.result).width(100).height(100);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#img").change(function() {
    readURL(this);
});
$("#img_edit").change(function() {
    readURL(this);
});