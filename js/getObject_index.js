$(document).ready(function () {
    $.ajax({
        url: 'objects.json',
        type: 'GET',
        async: false

    })
        .done(function (data) {
            let source = document.getElementById("post-template").innerHTML;
            let slider = $('.slider');
            let template = Handlebars.compile(source);
            let obj = data.items;
            let j = 0;
            let k = 0;
            for (let i = 0; i < obj.length; i++) {
                for (j in obj[i]) {
                    for (k in obj[i][j]) {
                        let post = {};
                        post.name = obj[i][j][k].name;
                        post.data_end = obj[i][j][k].data_end;
                        post.image = obj[i][j][k].image.url;
                        let html = template(post);
                        $(slider).append(html);
                    }
                }
            }
        });
});