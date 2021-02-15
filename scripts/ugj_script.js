const testfunc = () => {
    elec.openURL('http://ocoge.club');
}

//============ User Customize Start ===============
// テーマ
// カスタムブロックカラー定義
Blockly.HSV_SATURATION = 0.55;
Blockly.HSV_VALUE = 0.75;
var gpio_color = '0';
var multimedia_color = '240';
var network_color = '340';
var special_color = '20';
var snippets_color = '90';

// Blockly.Msg.UGJ_GPIO_HUE = 0;//FF7799
// Blockly.Msg.UGJ_MULTIMEDIA_HUE = 240;//CF63CF
// Blockly.Msg.UGJ_NETWORK_HUE = 340;//"#54C4EA"
// Blockly.Msg.UGJ_SPECIAL_HUE = 20;//"#0FBD8C"
// Blockly.Msg.UGJ_SNIPPETS_HUE = 90;

var theme = Blockly.Theme.defineTheme('ocoge', {
    'base': Blockly.Themes.Classic,
    'startHats': true,
    'componentStyles': {
        'toolboxBackgroundColour': 'aliceblue',
        'flyoutBackgroundColour': 'lavender',
        'toolboxForegroundColour': 'white',
        'flyoutForegroundColour': 'steelblue'
    },
    'blockStyles': {
        'gpio_blocks': {
            "colourPrimary": gpio_color
        },
        'multimedia_blocks': {
            "colourPrimary": multimedia_color
        },
        'network_blocks': {
            "colourPrimary": network_color
        },
        'special_blocks': {
            "colourPrimary": special_color
        },
        'snippets_blocks': {
            "colourPrimary": snippets_color
        }
    },
    'categoryStyles': {
        "gpio_category": {
            "colour": gpio_color
        },
        "multimedia_category": {
            "colour": multimedia_color
        },
        "network_category": {
            "colour": network_color
        },
        "special_category": {
            "colour": special_color
        },
        "snippets_category": {
            "colour": snippets_color
        }
    },
});

// Customize messages
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = "ならば";
Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "";
Blockly.Msg["MATH_CHANGE_TITLE"] = "変数 %1 を %2 増やす";
Blockly.Msg["VARIABLES_SET"] = "変数 %1 を %2 にする";
Blockly.Msg["TEXT_PRINT_TITLE"] = "ダイアログに %1 を表示";

// Customize Toolbox
class CustomCategory extends Blockly.ToolboxCategory {
    /** Constructor for a custom category. @override */
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }
    /** @override */
    addColourBorder_(colour) {
        this.rowDiv_.style.backgroundColor = colour;
    }
    /** @override */
    setSelected(isSelected) {
        // We do not store the label span on the category, so use getElementsByClassName.
        var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
        if (isSelected) {
            // Change the background color of the div to white.
            this.rowDiv_.style.backgroundColor = 'white';
            // Set the colour of the text to the colour of the category.
            labelDom.style.color = this.colour_;
            this.iconDom_.style.color = this.colour_;
        } else {
            // Set the background back to the original colour.
            this.rowDiv_.style.backgroundColor = this.colour_;
            // Set the text back to white.
            labelDom.style.color = 'white';
            this.iconDom_.style.color = 'white';
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(/** @type {!Element} */(this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED, isSelected);
    }
}
Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true);
//============ User Customize End ===============


//背景canvasの準備
const ugj_canvasBgImg = (imgSrc, x, y) => { //x,y == -1: center or middle
    let el = document.getElementById('canvas_bg');
    let ctx = el.getContext('2d');
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0,0,480,360);
    let img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        if (x<0) { //センタリング
            let w = img.width;
            if (w>=480) x=0;
            else x = Math.floor((480 - w) / 2);
        }
        if (y<0) { //縦中寄せ
            let h = img.height;
            if (h>=360) y=0;
            else y = Math.floor((360 - h) /2);
        }
        ctx.drawImage(img, x, y);
    }
};
// マスコット
// ugj_canvasBgImg("./img/mimmy.png?" + new Date().getTime()); // ミミィ
// ugj_canvasBgImg("./img/cogechee.png?" + new Date().getTime(), -1,-1); // こげちー

// HTML部品のインスタンス - 画面上の必要な部品はすべてここで取得しておく
ugjel_displayArea = document.getElementById('display_area'); // ディスプレイ部
ugjel_blackboard = document.getElementById('blackboard'); // 黒板
ugjel_inputForm = document.getElementById('inputForm'); // 入力フォーム
ugjel_inputBox = document.getElementById('inputBox'); // 入力フィールド

// その他のプロパティ
ugj_inputEvLstnrID = 0; // 入力フォームの動的イベントリスナの最新のID
ugj_sounds = (names => { // サウンドファイルのいろいろの配列の初期化
    let sounds = [];
    names.forEach(value => {
        let filepath = `./sounds/${value}.wav`;
        sounds[value] = { 'file': filepath, 'audio': new Audio(filepath) };
    });
    return sounds;
})(['meow', 'bounce', 'type_chime', 'type_dink', 'type_tap', 'type_space', 'type_return']); // サウンドファイルのベース名のリスト

// メソッド

// マスコット選択
const ugj_selectMascot = () => {
    let fname = elec.selectMascotFile();
    if (fname) {
        ugj_canvasBgImg(fname, -1, -1);
        elec.setMascotFilePath(fname);
    }
}

// サウンド再生 - 連続再生のため、再生開始後すぐにオーディオ要素を再生成する
const ugj_soundPlay = soundName => {
    ugj_sounds[soundName]['audio'].play();
    ugj_sounds[soundName]['audio'] = new Audio(ugj_sounds[soundName]['file']);
};

// OK,Cancel ２択のダイアログを表示
const ugj_confirm = (title, message, callback) => {
    CustomDialog.show(title, message, {
        showOkay: true,
        onOkay: () => callback(true),
        showCancel: true,
        onCancel: () => callback(false)
    });
};

const ugj_htmlEntities = str =>// HTMLエンティティのエスケープ
    String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');//.replace(/&/g, '&amp;').replace(/ /g, '&nbsp;');

// 新規ワークスペース
const ugj_newWorkspace = () => {
    ugj_confirm('新規ワークスペース', '保存していない内容はすべて破棄されます。よろしいですか？', okey => {
        if (okey) {
            workspace.clear();
            elec.newFile();
        }
    });
}

// ワークスペースをファイルに保存・読込
const ugj_saveWorkspaceToFile = () => {
    let xml = Blockly.Xml.workspaceToDom(workspace);
    let xml_text = Blockly.Xml.domToText(xml);
    if (elec.saveWsFile(xml_text) === false) {
        alert('保存できませんでした。');
    }
}
const ugj_loadWorkspaceFromFile = () => {
    let xml_text = elec.loadWsFile();
    if (xml_text.length > 0) {
        let xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
}

// ワークスペースを別名で保存
const ugj_saveWorkspaceAs = () => {
    elec.newFile();
    ugj_saveWorkspaceToFile();
}

// ワークスペースをローカルストレージに保存・読込
const ugj_saveWorkspace = () => {
    // Workspace
    let xml = Blockly.Xml.workspaceToDom(workspace);
    let xml_text = Blockly.Xml.domToText(xml);
    localStorage.setItem("abrage.xml", xml_text);
}
const ugj_loadWorkspace = () => {
    // Workspace
    let xml_text = localStorage.getItem("abrage.xml");
    if (xml_text.length != 0) {
        let xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
}

// ワークスペースからコードを生成して必要であれば整形処理をする
const ugj_createCode = (args) => {
    addAsync = args.async || false;
    beautify = args.beautify || false;

    let code = Blockly.JavaScript.workspaceToCode(workspace);

    // 追加モジュールのrequire
    let requires = [
        ['_gpio_', false, `const pi = require('ocoge_pigpiod');\n`],
        ['_axios_', false, `const axios = require('axios');\n`],
        ['_sendmail', false, `const nodemailer = require('nodemailer');\n`],
        ['_cloudspeech_', false, `const speech = require('@google-cloud/speech');\nconst recorder = require('node-record-lpcm16');\n`],
        ['_httpserver', false, `const http = require('http');\n`],
        ['_file_', false, `const fs = require('fs');\n`],
        // ['_bme280', false, `const BME280 = require('bme280-sensor');`],
        ['_dht', false, `const dht = require("node-dht-sensor").promises;`],
        ['_socket_', false, `const net = require('net');`]
    ];
    let blockArray = workspace.getAllBlocks();
    blockArray.forEach(value => {
        for (var i = 0, l = requires.length; i < l; i++) {
            if (value.type.indexOf(requires[i][0]) >= 0) requires[i][1] = true;
        }
    });
    for (var i = 0, l = requires.length; i < l; i++) {
        if (requires[i][1]) code = requires[i][2] + code;
    }

    // await使用のため、必要に応じてコード全体をasync付き即時関数でラップ
    if (addAsync) {
        code = [
            '(async () => {',
            code,
            '})();'
        ].join('\n');
    }

    // コードを綺麗に
    if (beautify) code = js_beautify(code, { indent_size: 2 });

    return code;
}

// ブロックスクリプト実行
const ugj_runCode = () => {
    document.activeElement.blur(); //実行ボタンからフォーカスを外す：エンターキー押下が悪さをするため
    let code = ugj_createCode({ 'async': true });
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}

// JavaScriptコードをダイアログで表示・保存
// エレメントのオブジェクトとかコールバックとか
// 色々この中で完結させてみる
const ugj_showCode = () => {
    const dialog = document.getElementById('codeDlg');
    const content = document.getElementById('dlgContent');
    const btn_close = document.getElementById('dlgClose');
    const btn_export = document.getElementById('dlgExport');
    const chkbox_cli = document.getElementById('dlgCli');

    let code = ugj_createCode({ 'beautify': true });
    code = ugj_htmlEntities(code);
    content.innerHTML = PR.prettyPrintOne(code, 'js', true);

    dialog.showModal();

    const close_cb = () => {
        dialog.close();
        btn_close.removeEventListener('click', close_cb);
        btn_export.removeEventListener('click', export_cb);
    }
    const export_cb = () => {
        code = ugj_createCode({ 'async': true, 'beautify': true });
        // blackboardWrite()をconsole.log()に書き換え、
        // document... と ugj_... と elec... をコメントアウト（ブラウザ関連部分の追放という意味では不完全なので注意）
        if (chkbox_cli.checked)
            code = code.replace(/const appendDiv[^#]*\/\/#/gm, 'const blackboardWrite = text => console.log(text);').replace(/(^(?=.*document.)[^;]*;)/gm, '/* $1 */').replace(/(^(?=.*ugj_)[^;]*;)/gm, '/* $1 */').replace(/(^(?=.*elec.)[^;]*;)/gm, '/* $1 */');
        if (elec.saveFile(code, 'js') === false) {
            alert('保存できませんでした。');
        }
        close_cb();
    }
    btn_close.addEventListener('click', close_cb);
    btn_export.addEventListener('click', export_cb);
}


// フキダシ
ugj_fdTimeoutID = null;
ugj_fdRecentBox = null;
const ugj_fukidashi = (text, sec) => {
    // Canvas Context
    const context = document.getElementById('canvas').getContext('2d');
    // 吹き出しを消去する関数
    const clearFd = (x, y, w, h) => context.clearRect(x, y, w, h);
    // 前回の思い出を忘れる
    if (ugj_fdRecentBox !== null) {
        clearFd(ugj_fdRecentBox.x, ugj_fdRecentBox.y, ugj_fdRecentBox.w, ugj_fdRecentBox.h);
        clearTimeout(ugj_fdTimeoutID);
        ugj_fdRecentBox = null;
    }

    // 基本設定
    let rtopX = 170; // フキダシ右上 X座標
    let rtopY = 40; // フキダシ右上 Y座標
    let boxWidth = 140;
    let padding = 5;
    let radius = 5;// 円弧の半径

    // 吹き出しの背景色
    context.fillStyle = "#b7e6ff";

    // テキスト設定
    let limitedWidth = boxWidth - (padding * 2);
    let size = 14;
    context.font = size + "px ''";

    // テキスト調整　行に分解
    let lineTextList = text.split("\n");
    let newLineTextList = [];
    lineTextList.forEach((lineText) => {
        if (context.measureText(lineText).width > limitedWidth) {
            characterList = lineText.split("");// 1文字ずつ分割
            let preLineText = "";
            lineText = "";
            characterList.forEach((character) => {
                lineText += character;
                if (context.measureText(lineText).width > limitedWidth) {
                    newLineTextList.push(preLineText);
                    lineText = character;
                }
                preLineText = lineText;
            });
        }
        newLineTextList.push(lineText);
    });
    let lineLength = newLineTextList.length;

    // 角丸
    let width = boxWidth;// 枠の幅
    let height = (size * lineLength) + (padding * 3); // 枠の高さ
    let toRadianCoefficient = Math.PI / 180; // 角度からラジアンへの変換係数
    // 角丸原点（左上座標）
    let boxOrigin = {
        "x": rtopX - width,
        "y": rtopY,
    }
    // 円弧から円弧までの直線は自動で引かれます、角度は回り方によって変わります。
    // arc(中心x, 中心y, 半径, 開始角度, 終了角度, 反時計回り)
    context.beginPath();
    context.arc(boxOrigin.x + radius, boxOrigin.y + radius, radius, 180 * toRadianCoefficient, 270 * toRadianCoefficient, false);// 左上
    context.arc(boxOrigin.x + width - radius, boxOrigin.y + radius, radius, 270 * toRadianCoefficient, 0, false);// 右上
    context.arc(boxOrigin.x + width - radius, boxOrigin.y + height - radius, radius, 0, 90 * toRadianCoefficient, false);// 右下
    context.arc(boxOrigin.x + radius, boxOrigin.y + height - radius, radius, 90 * toRadianCoefficient, 180 * toRadianCoefficient, false);// 左下
    context.closePath();
    context.fill();

    // 矢印（ヒゲ）
    let arrow = {
        "x": rtopX - width / 2 + 40,
        "y": rtopY + height + 10,
        "width": 10,
        "height": 10,
    }
    context.beginPath();
    context.moveTo(arrow.x, arrow.y);
    context.lineTo(arrow.x, arrow.y - arrow.height);
    context.lineTo(arrow.x - arrow.width, arrow.y - arrow.height);
    context.fill();

    // テキスト描画
    context.fillStyle = "#000000";
    newLineTextList.forEach((lineText, index) => {
        context.fillText(lineText, boxOrigin.x + padding, boxOrigin.y + padding + (size * (index + 1)));
    });

    // 描画した吹き出しの位置情報を保存
    ugj_fdRecentBox = { x: boxOrigin.x, y: boxOrigin.y, w: width, h: height + arrow.height };
    // 指定時間後に消去（0以下で自動消去なし）
    if (sec > 0) {
        ugj_fdTimeoutID = setTimeout(() => {
            clearFd(boxOrigin.x, boxOrigin.y, width, height + arrow.height);
        }, sec * 1000);
    }

    // return [boxOrigin.x, boxOrigin.y, width, height+arrow.height];
    // https://qiita.com/horikeso/items/95595f379a8dfa63c34a
}

//=====================================
//======= Blockly GUI codes ===========
// Use in a block or block definition:

// Resizable workspace injection script
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
// var workspace = Blockly.inject(blocklyDiv,
//     {toolbox: document.getElementById('toolbox')});
var workspace = Blockly.inject(blocklyDiv,
    {
        toolbox: document.getElementById('toolbox'),
        theme: theme,

        scrollbars: true,
        grid: {
            spacing: 20,
            length: 1,
            colour: '#888',//888
            snap: true
        },
        zoom: { startScale: 1.0, controls: true },
        trashcan: true,
        media: './google-blockly/media/'
    });
var onresize = function (e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);
//=====================================
//=====================================


// ワークスペースの未保存の変更のフラグ
const ugj_wsUpdateCB = event => {
    if (event.type != Blockly.Events.UI) {
        elec.setWsChanged(true);
    }
}

// ウィンドウロード・アンロード時
window.onload = () => {
    var menu = document.getElementById('conmenu');  //独自コンテキストメニュー
    var area = document.getElementById('dlgContent');     //対象エリア
    var body = document.body;                       //bodyエリア
    body.oncontextmenu = () => false;
    //右クリック時に独自コンテキストメニューを表示する
    area.addEventListener('contextmenu', function (e) {
        menu.style.left = e.pageX + 'px';
        menu.style.top = e.pageY + 'px';
        menu.classList.add('on');
    });
    //左クリック時に独自コンテキストメニューを非表示にする
    body.addEventListener('click', function () {
        if (menu.classList.contains('on')) {
            menu.classList.remove('on');
        }
    });

    // ワークスペースといくつかの環境のオートリストア
    ugj_loadWorkspace();
    elec.loadPrefsFromLS();
    setTimeout(() => { // 環境設定のロードが終わってからイベントリスナを作成
        workspace.addChangeListener(ugj_wsUpdateCB);
    }, 100);
    // 背景canvas
    ugj_canvasBgImg(elec.getMascotFilePath(), -1,-1);
}
window.onbeforeunload = () => {
    ugj_saveWorkspace();
    elec.savePrefsToLS();
}

// Electron動作とブラウザ動作を自動で仕分け
if (typeof require == 'function') {
    // requireが使える = Electron
    var elec = require('./scripts/eleclib');
    console.log('elec loaded.');
} else {
    //ブラウザ動作
    //requireのダミー
    var require = (e) => {
        alert(`この機能またはブロック [${e}] は web 版ではご利用になれません。\n詳しくはお問い合わせください。`);
        // if (e=='elec' || e=='ocoge' || e=='child_process' || e=='@google-cloud/speech' || e=='nodemailer' || e=='fs' )
        //   alert(`この機能またはブロックは web 版ではご利用になれません。\n詳しくはお問い合わせください。`);
        // else return;
    }
    //elecを名前空間で置き換え
    var elec = {};
    elec.saveFile = () => require('elec');
    elec.savePrefsToLS = () => { ; }
    elec.loadPrefsFromLS = () => { ; }
    elec.newFile = () => { ; }
    elec.setWsChanged = () => { ; }

    //ワークスペースのダウンロード
    elec.saveWsFile = xml_text => {
        let blob = new Blob([xml_text], { "type": "text/xml" });
        const downLoadLink = document.createElement("a");
        document.body.appendChild(downLoadLink);
        downLoadLink.download = 'workspace.xml';
        downLoadLink.href = URL.createObjectURL(blob);
        downLoadLink.click();
        downLoadLink.parentElement.removeChild(downLoadLink);
        return true;
    }
    //ワークスペースのインポート
    elec.loadWsFile = () => {
        const fileInputEl = document.createElement('input');
        document.body.appendChild(fileInputEl);
        fileInputEl.type = 'file';
        fileInputEl.addEventListener('change', ev => {
            let reader = new FileReader();
            reader.readAsText(ev.target.files[0]);
            reader.addEventListener('load', () => {
                let xml = Blockly.Xml.textToDom(reader.result);
                Blockly.Xml.domToWorkspace(xml, workspace);
            });
        });
        fileInputEl.click();
        fileInputEl.parentElement.removeChild(fileInputEl);
        return '';
    }
}