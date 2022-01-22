import { getQueryString, openApp } from '@/common/utils';
import Toast from '@/common/Toast';
import './index.less';

class LJApp {
  constructor(protocol) {
    this.protocol = protocol;
    this.createElement();
    this.onLoad();
  }

  createElement() {
    this.$container = $(`
      <div class="container">
        <div class="header">
          <img class="logo" src="images/logo_t.png" />
          <div class="title">得正作业${this.protocol === 'leteacher' ? '教师' : '学生'}</div>
        </div>
        <div class="content">
          <div class="text">
            精准教学<br><br>稳定提分
          </div>
        </div>
        <div class="space"></div>
        <div class="footer">
          <button>立即进入</button>
        </div>
      </div>
    `);

    $('body').append(this.$container);

    this.$container.find('button').click(() => this.enterApp());
  }

  onLoad() {
    const ticket = getQueryString('ticket') || '';
    const close = Toast.loading();
    $.ajax({
      type: 'post',
      url: 'https://liaocheng.ljlx.com/webapi/getLjshellLoginForTicker',
      data: JSON.stringify({
        ticket: ticket,
        appId: 1306,
      }),
      contentType: 'application/json; charset=utf-8',
      success: (res) => {
        close();
        if (res.result === 0) {
          let { loginName, loginCode } = res.data;
          this.loginName = loginName;
          this.loginCode = loginCode;
        } else {
          Toast.show(res.msg);
        }
      },
      error: () => {
        close();
        Toast.show('网络异常，请重试');
      },
    });
  }

  enterApp() {
    if (this.loginName && this.loginCode) {
      const close = Toast.loading();
      setTimeout(function () {
        close();
        // let downUrl = 'https://lx-file.oss-cn-beijing.aliyuncs.com/upgrade/soft/app/%E4%B9%90%E6%95%99%E4%B9%90%E5%AD%A6244%E7%94%B5%E8%84%91.exe';
        // location.href = downUrl;
      }, 5000);
      let openUrl = `${this.protocol}://ljapp?appid=${0}&_changetype_=1&username=${this.loginName}&_authCode_=${this.loginCode}&action=login`;
      location.href = openUrl;
    } else {
      Toast.show('授权失败');
    }
  }
}

export default LJApp;
