"use strict";

/** Node.js または Electron 固有の機能を利用した関数のモジュール ************* */

// ローカルプロパティ
// Hard Coding!!!
const appName = 'ocoge';
const defpath = '/home/pi/Documents/ocoge/';
// Require
const fs = require('fs');
const path = require("path");
const mainWin = require('electron').remote.getCurrentWindow();
const dialog = require('electron').remote.dialog;
const shell = require('electron').shell;
const clipboard = require('electron').clipboard;


var saveFilepath = null;
var wsChanged = false;

// 0で数値の桁合わせ
// NUM=値 LEN=桁数
const zeroPadding = (NUM, LEN) => (Array(LEN).join('0') + NUM).slice(-LEN);

// 現在の日付時刻から workspace フォルダ内のユニークなファイルパスを作成
const getUniqueFilepath = () => {
    let today = new Date();
    let filename = today.getFullYear() + '-' + zeroPadding((today.getMonth() + 1), 2) + '-' + zeroPadding(today.getDate(), 2) + '-' + zeroPadding(today.getHours(), 2) + '-' + zeroPadding(today.getMinutes(), 2) + '-' + zeroPadding(today.getSeconds(), 2);
    let filepath = path.join(defpath, filename);
    return filepath;
}

// クリップボードにコピー
exports.copyText = text => clipboard.writeText(text);

// リンクを外部ブラウザで開く
exports.openURL = (url) => {
    shell.openExternal(url);
}

// タイトルバーにファイル名を表示
// const setTitle = () => {
//     if (saveFilepath) let title = appName;
//     else let title = saveFilepath + ' - ' + appName;
//     mainWin.setTitle(title);
// }

// saveFilepath を更新
// ウィンドウタイトルバーテキストを変更
const setSaveFilepath = filepath => {
    let title;
    saveFilepath = filepath;
    // if (filepath) title = filepath + ' - ' + appName;
    // else title = appName;
    // mainWin.setTitle(title);
    this.setWsChanged(false);
}

// ワークスペースが変更された・保存された
// ウィンドウタイトルバーテキストを変更
exports.setWsChanged = changed => {
    let title;
    wsChanged = changed;
    if (saveFilepath) title = saveFilepath + ' - ' + appName;
    else title = appName;
    if (changed) title = '*' + title;
    mainWin.setTitle(title);
}

// 保存ファイルプロパティを更新
exports.newFile = () => setSaveFilepath(null);

// ワークスペースファイル読み込みの一連の動作のラッパ
exports.loadWsFile = () => {
    let filepath = openFile('xml');
    if (filepath.length > 0) {
        if (saveFilepath === null) {
            setSaveFilepath(filepath);
        }　//読み込みに失敗してもsaveFilepathが更新されてしまうのはちょっと具合が悪いかも
        return readFromFile(filepath);
    } else {
        return '';
    }
}
// その他ファイル読み込みの一連の動作のラッパ
exports.loadFile = ext => {
    let filepath = openFile(ext);
    if (filepath.length > 0) {
        return readFromFile(filepath);
    } else {
        return '';
    }
}
// オープンファイルダイアログ
const openFile = ext => {
    let filter;
    if (ext == 'xml') {
        filter = { name: 'xml file', extensions: ['xml'] };
    } else if (ext == 'js') {
        filter = { name: 'javascript file', extensions: ['js'] };
    } else {
        filter = { name: 'text file', extensions: ['txt'] };
    }
    let filepaths = dialog.showOpenDialogSync(mainWin, {
        properties: ['openFile'],
        title: 'Select a file',
        defaultPath: defpath,
        filters: [
            filter
        ]
    });
    if (filepaths == undefined) {
        return '';
    } else {
        return filepaths[0];
    }
}
// ファイルからデータを読み込み
const readFromFile = filepath => {
    let data = '';
    try {
        data = fs.readFileSync(filepath, 'utf-8');
    }
    catch (err) {
        console.log(err);
    }
    return data;
}
// テキストファイル読み込み: 外部スクリプト動的読み込みに使用
exports.readTextFile = filepath => {
    return readFromFile(filepath);
}

// ワークスペースファイル保存の一連の動作のラッパ
exports.saveWsFile = data => {
    if (saveFilepath === null) {
        let filepath = selectSaveFile('xml');
        if (filepath === undefined) { //キャンセル
            return undefined;
        } else {
            setSaveFilepath(filepath);
        } //これも保存が成功したら変更するようにすべきかしら
    } else this.setWsChanged(false);
    return writeToFile(saveFilepath, data);
}
// その他ファイル保存の一連の動作のラッパ
exports.saveFile = (data, ext) => {
    let filepath = selectSaveFile(ext);
    if (filepath === undefined) { //キャンセル
        return undefined;
    }
    return writeToFile(filepath, data);
}
// ファイル保存ダイアログ
const selectSaveFile = ext => {
    let filter;
    let defName;
    if (ext == 'xml') {
        filter = { name: 'xml file', extensions: ['xml'] };
        defName = getUniqueFilepath() + '.xml';
    } else if (ext == 'js') {
        filter = { name: 'javascript file', extensions: ['js'] };
        // ワークスペース保存名がある場合、それをベースにファイル名の候補を決める
        if (saveFilepath === null) {
            defName = getUniqueFilepath() + '.js';
        } else {
            let dirname = path.dirname(saveFilepath);
            let basename = path.basename(saveFilepath, '.xml');
            defName = path.join(dirname, basename) + '.js';
        }
    } else {
        filter = { name: 'text file', extensions: ['txt'] };
    }
    let filename = dialog.showSaveDialogSync(mainWin, {
        title: '保存先を決定してください',
        defaultPath: defName,
        filters: [filter]
    });
    return filename;
}
// ファイル書き込み
const writeToFile = (filepath, data) => {
    try {
        fs.writeFileSync(filepath, data);
        return true;
    }
    catch (err) {
        return false;
    }
}

// 子プロセス関連
let children = [];
// 新しい子プロセスを作成し、配列に保存
exports.addChild = (child) => {
    children.push(child);
}
// 全ての子プロセスを殺し、配列をクリア
exports.killAllChildren = () => {
    children.forEach(function( child ) {
        child.kill();
    });
    children = [];
}

// 設定(保存ファイルパスと未保存フラグ）をローカルストレージに保存
exports.savePrefsToLS = () => {
    let wc = '0';
    if (wsChanged) wc = '1';
    let o = { 'saveFilepath': saveFilepath, 'wsChanged': wc };
    let s = JSON.stringify(o);
    localStorage.setItem("abrage.json", s);
}

// 設定(保存ファイルパスと未保存フラグ）をローカルストレージからロード
exports.loadPrefsFromLS = () => {
    let s = localStorage.getItem("abrage.json");
    let o = JSON.parse(s);
    setSaveFilepath(o.saveFilepath);
    if (o.wsChanged == '0') this.setWsChanged(false);
    else this.setWsChanged(true);
}


// ファイル名にアプリケーションのドキュメントルートまでのパスをつけて返す
exports.getDocPath = filename => {
    return path.join(appDocRoot, filename);
}
