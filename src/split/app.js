// 同步加载common.css
import './styles/common.css';

// 同步加载module.js
import * as module from './module/module';

// // 同步加载第三方包vendor.js
import * as vendor from './vendor/vendor';

window.addEventListener('click', function () {
  // 异步加载async-module.js
  import(/* webpackChunkName: 'asyn-module'*/ './asyn-module/asyn-module').then(_ => {
    console.log('加载异步asyn-module成功---');
  });
  // async-style.css
  import(/* webpackChunkName: 'asyn-style'*/'./styles/asyn-style.css').then(_ => {
    console.log('加载异步asyn-style.css成功---');
  });

});