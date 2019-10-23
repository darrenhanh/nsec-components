import {notification} from 'antd';
import _ from 'lodash';
import axios from 'axios';

export async function axiosGet(param) {
  let {data} = await axios.get(param.url, param.payload);
  console.log("da",data)
  if (data && data.success) {
    return data.params;
  } else {
    notification.error({message: '查询数据失败'});
  }
}

export function put(url, payload) {
  /*  payload._method = "put";
    return $.ajax({
      type: "POST",
      async: false,
      url: url,
      data: payload,
      dataType: "json",
    });*/
}

/**
 * 调用本地应用程序
 * @param shell
 */
export function dispatchExe(shell) {
  try {
    window.location.href = shell;
  } catch (e) {
    notification.warning({message: '未找到相关程序'});
  }
}


export function browseFolder(path) {
  /*  try {
      var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939";  //选择框提示信息
      var Shell = new ActiveXObject("Shell.Application");
      var Folder = Shell.BrowseForFolder(0, Message, 64, 17);//起始目录为：我的电脑
      //var Folder = Shell.BrowseForFolder(0,Message,0); //起始目录为：桌面
      if (Folder != null) {
        Folder = Folder.items();  // 返回 FolderItems 对象
        Folder = Folder.item();  // 返回 Folderitem 对象
        Folder = Folder.Path;   // 返回路径
        if (Folder.charAt(Folder.length - 1) != "\\") {
          Folder = Folder + "\\";
        }
        document.getElementById(path).value = Folder;
        return Folder;
      }
    }
    catch (e) {
      alert(e.message);
    }*/
}

/**
 * 生成随机列表
 * @param length 长度
 * @param begin  开始值，2/2.2/2.22
 * @param end  结束值，5/5.5/5.55
 * @param floating 是否返回浮点数 true/false
 */
export function createRandomList(length, begin, end, floating) {
  let list = [];
  for (let i = 0; i < length; i++) {
    list.push(_.random(begin, end, floating));
  }
  return list;
}
