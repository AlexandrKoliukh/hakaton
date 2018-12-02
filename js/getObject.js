let id_city;
let id_district;

function showCity() {
    $.ajax({
            url: 'city.json',
            type: 'GET'
            // beforeSend: beforeSend
        })
        .done(function (data) {
            for (let i = 0; i < data.items.length; i++) {
                if(i === 0) $('#city').append($(opt).clone(true).attr({"value": i, "selected" : true}).text(`${data.items[i].city}`));
                else $('#city').append($(opt).clone(true).attr("value", i).text(`${data.items[i].city}`));
            }
        });
};

function showDistrict() {
    $.ajax({
            url: 'district.json',
            type: 'GET'
            // beforeSend: beforeSend
        })
        .done(function (data) {
            // console.log(data.items[id_city].district.length);
            let obj = data.items[id_city];
            for (let i = 0; i < data.items[id_city].district.length; i++) {
                if (i===0) $('#area').append($(opt).clone(true).attr({"value": i, "selected": true}).text(`${obj.district[i].name}`));
                else $('#area').append($(opt).clone(true).attr("value", i).text(`${obj.district[i].name}`));
            }
        });
};

let opt = document.createElement('option');

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
            // $('#area [value]').remove();
            let obj = data.items[id_city];
            // debugger
            // .attr('value', `${i}`)
            // for (let i = 0; i < obj.district.length; i++) {
            //     $('#area').append($(opt).clone(true).attr('value', i).text(`${obj.district[i].name}`));
            // }
            let id_item = $('#area').val();
            let objj = data.items[id_item];
            id_district = objj.id;
        });
};

function getObject() {
    $.ajax({
            url: 'objects.json',
            type: 'GET',
            async: false
            // success: data => data
            // beforeSend: beforeSend
        })
        .done(function (data) {
            let source = document.getElementById("post-template").innerHTML;
            let content = $('#content');
            content.empty();
            let template = Handlebars.compile(source);
            let obj = data.items[id_city];
            for (let i = 0; i < obj[id_district].length; i++) {
                let post = {};
                post.name = obj[id_district][i].name;
                post.data_end = obj[id_district][i].data_end;
                post.image = obj[id_district][i].image.url;
                post.id = obj[id_district][i].id;
                var html = template(post);
                $(content).append(html);
            }

        });
}

function getObjectModal(idd) {
    $.ajax({
            url: 'objects.json',
            type: 'GET',
            async: false
        })
        .done(function (data) {
            let obj = data.items[id_city][id_district];
            let source = document.getElementById("post-template1").innerHTML;
            let stages = $('.stages_ul');
            let model = $('.header-mod');
            model.empty();
            stages.empty();
            let template = Handlebars.compile(source);
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].id == idd) {
                    let post = {};
                    post.name = obj[i].name;
                    post.data_start = obj[i].data_start;
                    post.data_end = obj[i].data_end;
                    post.image = obj[i].image.url;
                    post.id = obj[i].id;
                    for (let j = 0; j < obj[i].stage.length; j++) {
                        $(stages).append(`<li>${obj[i].stage[j].description}</li>`);
                    }
                    let html = template(post);
                    $(model).append(html);
                }
            }
            // for(let i in data)
        });
};

$('.js-click-modal').click(function () {
    $('.modal').addClass('modal-active');
});



$('.js-close-modal').click(function () {
    $('.modal').removeClass('modal-active');
});
$('.content').on('click', '.btn', function () {
    let id = $(this)[0].childNodes[1].childNodes[0].data;
    $('.modal').addClass('modal-active');
    getObjectModal(id);
});
showCity();

$(document).ready(function () {
    $("#btnModal").click(function () {
        $("#exampleModal").modal('show');
    });
    $('.stages').css('display','flex');
    getCity();
    showDistrict();
    getDistrict();

});
getObject();
// Promise.all([showCity(), getCity(), showDistrict(),getDistrict()]).then(getObject());