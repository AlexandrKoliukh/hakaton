let id_city;
let id_district;

function getCity() {
    $.ajax({
        url: 'city.json',
        type: 'GET',
        async: false
        // success: data => data
        // beforeSend: beforeSend
    })
        .done(function (data) {
            // $('#city [value]').remove();
            $('#area [value]').remove();
            let id_item = $('#city').val();
            let obj = data.items[id_item];
            id_city = obj.id;
        });
};

function getDistrict() {
    $.ajax({
        url: 'district.json',
        type: 'GET',
        async: false
        // success: data => data
        // beforeSend: beforeSend
    })
        .done(function (data) {

            let obj = data.items[id_city];
            let id_item = $('#area').val();
            let objj = data.items[id_item];
            id_district = objj.id;
        });
};
function getObj(){
$.ajax({
    url: 'objects.json',
    type: 'GET',
    async: false
})
    .done(function (data) {
        let id = document.location.search.split('=')[1];
        let source = document.getElementById("post-template1").innerHTML;
        let stages = $('.stages_ul');
        let model = $('.header-mod');
        model.empty();
        stages.empty();
        let template = Handlebars.compile(source);
        let obj = data.items;
            let j = 0;
            let k = 0;
            for (let i = 0; i < obj.length; i++) {
                for (j in obj[i]) {
                    for (k in obj[i][j]) {
                        if (obj[i][j][k].id == id) {
                            let post = {};
                            $(".name").append(`${obj[i][j][k].name}`);
                            post.data_start = obj[i][j][k].data_start;
                            post.data_end = obj[i][j][k].data_end;
                            post.image = obj[i][j][k].image.url;
                            // post.id = obj[i][j][k].id;
                            for (let l = 0; l < obj[i][j][k].stage.length; l++) {
                                $(stages).append(`<li>${obj[i][j][k].stage[l].description}</li>`);
                            }
                            let html = template(post);
                            $(model).append(html);
                        }
                    }
                }
            }
       
        // for(let i in data)
    });
};
$('#btn_stage').click(function () {
    $('.stages').css('display', 'flex');;
});
$(document).ready(function () {
    getObj();
});