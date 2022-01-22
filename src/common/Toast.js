const Toast = {
  show(message, time = 2000) {
    let $toast = $(`
      <div class="h5ui-toast" style="display: none;">
        <div class="h5ui-toast_backdrop"></div>
        <div class="h5ui-toast_dialog">
          <div class="h5ui-toast_content">
            <span>${message}</span>
          </div>
        </div>
      </div>
    `);

    $('body').append($toast);

    const close = () => {
      $toast.fadeOut();
      setTimeout(() => {
        $toast.remove();
      }, 1000);
    };

    $toast.fadeIn();
    setTimeout(close, time);

    return close;
  },

  loading() {
    let $toast = $(`
      <div class="h5ui-toast h5ui-toast_loading" style="display: none;">
        <div class="h5ui-toast_backdrop"></div>
        <div class="h5ui-toast_dialog">
          <div class="h5ui-toast_content">
            <span>
              <div class="h5ui-toast_loading_icon">
                <div class="loading-icon-leaf loading-icon-leaf_0"></div>
                <div class="loading-icon-leaf loading-icon-leaf_1"></div>
                <div class="loading-icon-leaf loading-icon-leaf_2"></div>
                <div class="loading-icon-leaf loading-icon-leaf_3"></div>
                <div class="loading-icon-leaf loading-icon-leaf_4"></div>
                <div class="loading-icon-leaf loading-icon-leaf_5"></div>
                <div class="loading-icon-leaf loading-icon-leaf_6"></div>
                <div class="loading-icon-leaf loading-icon-leaf_7"></div>
                <div class="loading-icon-leaf loading-icon-leaf_8"></div>
                <div class="loading-icon-leaf loading-icon-leaf_9"></div>
                <div class="loading-icon-leaf loading-icon-leaf_10"></div>
                <div class="loading-icon-leaf loading-icon-leaf_11"></div>
              </div>
              数据加载中
            </span>
          </div>
        </div>
      </div>
    `);

    $('body').append($toast);

    const close = () => {
      $toast.hide();
      setTimeout(() => {
        $toast.remove();
      }, 1000);
    };

    $toast.show();

    setTimeout(close, 60000);

    return close;
  },
};

export default Toast;
