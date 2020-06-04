$(function (){
  $(document).on('turbolinks:load', ()=> {
    const buildFileField = (index)=> {
      const html = `<div class="js-file_group" data-index="${index}">
                      <div class="preview-none">
                        <div class="js-image-zone"></div>
                        <div class="js-edit">変更</div>
                        <div class="js-remove">削除</div>
                      </div>
                      <label class="input">
                        <input class="js-file" type="file" name="post[images_attributes][${index}][image]" id="post_images_attributes_${index}_image" style="display:none">
                        <div class="input__box">
                          <div class="input__box__cam-icon">
                            <i class="fa fa-camera fa-lg"></i>
                          </div>
                          <p class="input__box__p">ここをクリックしてアップロード</p>
                        </div>
                      </label>
                    </div>`;
      return html;
    }

    const buildImg = (index, url)=> {
      const html = `<img data-index="${index}" src="${url}" >`;
      return html;
    };
    // すでに登録されていたものは削除可能にする
    $('.preview-none').each(function(index, preview){
      if (index != $('.preview-none').length - 1) {
        $(preview).addClass('preview');
      } else {
        ;
      }
    });

    $('.input').each(function(index, input){
      if (index != $('.input').length - 1) {
        $(input).css('display', 'none');
      } else {
        ;
      }
    });
  
    let fileIndex = [1,2,3,4,5,6,7,8,9,10];
    // 既に使われているindexを除外
    const lastIndex = $('.js-file_group:last').data('index');
    fileIndex.splice(0, lastIndex);
    $('.hidden-destroy').hide();

    const firstNum = $('.preview').length;
    const firstLeft = 10 - firstNum;
    $('#how-many-image').append(`<p style="color:#0095ee">あと${firstLeft}枚アップロードできます</p>`)

    // 削除回数
    let removalCount = 0;

    $('#image-box').on('change', '.js-file', function(e) {
      const targetIndex = $(this).parent().parent().data('index');
      const file = e.target.files[0];
      const blobUrl = window.URL.createObjectURL(file);
      if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
        img.setAttribute('src', blobUrl);
      } else {
        const targetIndexPlusRemoval = targetIndex - removalCount;
        const $imageZone = $('.js-image-zone').eq(targetIndexPlusRemoval);
        $imageZone.append(buildImg(targetIndex, blobUrl));
      }

      if ( $.inArray(targetIndex + 1, fileIndex) == 0) {
        $(this).parent().prev().addClass('preview');
        $(this).parent().css('display', 'none');
        $('.js-remove').addClass('visible-js-remove')
        if ($('.visible-js-remove').length < 10) {
          $('#image-box').append(buildFileField(fileIndex[0]));
          fileIndex.shift();
          fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
          const num = $('.visible-js-remove').length;
          const left = 10 - num;
          $('#how-many-image').children().remove();
          $('#how-many-image').append(`<p style="color:#0095ee">あと${left}枚アップロードできます</p>`);
        } else {
          $('#how-many-image').children().remove();
          $('#how-many-image').append(`<p style="color:red">これ以上アップロードできません</p>`);
        }
      } else {
        ;
      }
    });

    $('#image-box').on('click', '.js-edit', function() {
      $(this).parent().next().click();
    });
  
    $('#image-box').on('click', '.js-remove', function() {
      // 削除回数
      removalCount++;

      const targetIndex = $(this).parent().parent().data('index');
      // 該当indexを振られているチェックボックスを取得する
      const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
      // もしチェックボックスが存在すればチェックを入れる
      console.log(hiddenCheck);
      if (hiddenCheck) hiddenCheck.prop('checked', true);
      console.log(hiddenCheck.prop('checked'));

      $(this).parent().parent().remove();
      if ($('.preview').length < 10) {
        const num = $('.preview').length;
        const left = 10 - num;
        $('#how-many-image').children().remove();
        $('#how-many-image').append(`<p style="color:#0095ee">あと${left}枚アップロードできます</p>`);
      } else {
        ;
      }
      // 9と10の境を繋ぐ
      if ($('.visible-js-remove').length == 9) {
        $('#image-box').append(buildFileField(fileIndex[0]));
        fileIndex.shift();
        fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
      } else {
        ;
      }
    });
  });
})