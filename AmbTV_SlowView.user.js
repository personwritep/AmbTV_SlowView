// ==UserScript==
// @name        AmbTV SlowView
// @namespace        http://tampermonkey.net/
// @version        1.4
// @description        AbemaTV ユーティリティ
// @author        Ameba User
// @match        https://abema.tv/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=abema.tv
// @grant        none
// @updateURL        https://github.com/personwritep/AmbTV_SlowView/raw/main/AmbTV_SlowView.user.js
// @downloadURL        https://github.com/personwritep/AmbTV_SlowView/raw/main/AmbTV_SlowView.user.js
// ==/UserScript==


let act=0; // 起動ショートカットのコントロールフラグ


let target=document.querySelector('head > title');
let monitor=new MutationObserver(player_env);
monitor.observe(target, { childList: true });

player_env;


function player_env(){
    if(location.pathname.includes('video/episode')){ // 書庫型動画プレーヤー以外はパネル削除
        let retry=0;
        let interval=setInterval(wait_target, 10);
        function wait_target(){
            retry++;
            if(retry>100){ // リトライ制限 100回 1secまで
                clearInterval(interval);
                act=0;
                reset(); }
            let video=document.querySelector('.com-a-Video__video');
            if(video){
                clearInterval(interval);
                act=1;
                set_act(); }}} // ツール起動の待機状態
    else{
        act=0;
        reset(); }


    function set_act(){
        document.body.addEventListener('keydown', function(event){
            if(event.ctrlKey && event.altKey && act==1){ //「Ctrl+Alt」キーの押下
                event.preventDefault();
                event.stopImmediatePropagation();
                act=2;
                main(); }
            if(event.keyCode==32 && is_end()){ //「Space」キーの押下
                event.preventDefault();
                event.stopImmediatePropagation();
                freeze(); }});

    } // set_act()


    function reset(){
        if(document.querySelector('#sv_panel')){
            document.querySelector('#sv_panel').remove(); }

        let player_wrap=document.querySelector('.com-vod-VODMiniPlayerWrapper');
        if(player_wrap){
            player_wrap.style.boxShadow=''; }}


    function is_end(){
        let next_card=document.querySelector('.com-pages-episode-NextContentCard__inner');
        let recommend=document.querySelector('.com-pages-episode-FullScreenRecommend');
        if(next_card){
            let card_width=window.getComputedStyle(next_card).width;
            if(card_width!='0px' || recommend){
                return true; }}}


    function freeze(){
        let next_card=document.querySelector('.com-pages-episode-NextContentCard__inner');
        let cancel=document.querySelector('.com-pages-episode-NextContentCard__cancel-button');
        if(next_card && cancel){
            let card_width=window.getComputedStyle(next_card).width;
            if(card_width!='0px'){
                stop_end();

                let monitor=new MutationObserver(stop_end); // next_cardパネルを監視
                monitor.observe(next_card, { attributes: true }); } // 2回目のcancelを押す

            function stop_end(){
                next_card.style.visibility='hidden';
                let recommend=document.querySelector('.com-pages-episode-FullScreenRecommend');
                if(recommend){
                    recommend.style.visibility='hidden'; }
                setTimeout(()=>{
                    cancel.click();
                }, 20); }}

    } // freeze()

} // player_env()



function main(){
    let interval_s; // スロー実行のインターバル
    let run=2; // 0: 停止 1: スロー再生 2:再生
    let panel_v; // パネル表示の状態 0:非表示  1:表示


    let sense=sessionStorage.getItem('ATV_SV_sense');
    if(!sense){
        sense=21;
        sessionStorage.setItem('ATV_SV_sense', sense); }

    let rate_b=sessionStorage.getItem('ATV_SV_rate_b');
    if(!rate_b){
        rate_b=6;
        sessionStorage.setItem('ATV_SV_rate_b', rate_b); }

    let cut=sessionStorage.getItem('ATV_SV_cut');
    if(!cut){
        cut=0;
        sessionStorage.setItem('ATV_SV_cut', cut); }

    let cut_size=sessionStorage.getItem('ATV_SV_cut_size');
    if(!cut_size){
        cut_size=960; //「Size」の初期値を変更するには、この値を書き変えてください。🔴🔴🔴
        sessionStorage.setItem('ATV_SV_cut_size', cut_size); }



    let player_wrap=document.querySelector('.com-vod-VODMiniPlayerWrapper');
    if(player_wrap){
        set_player(player_wrap); }


    function set_player(player_wrap){
        let help_url='https://ameblo.jp/personwritep/entry-12910769407.html'

        let SVG_h=
            '<svg class="help_ATSV" height="20" width="20" viewBox="0 0 150 150">'+
            '<path  d="M66 13C56 15 47 18 39 24C-12 60 18 146 82 137C92 '+
            '135 102 131 110 126C162 90 128 4 66 13M68 25C131 17 145 117 81 '+
            '125C16 133 3 34 68 25M69 40C61 41 39 58 58 61C66 63 73 47 82 57C84 '+
            '60 83 62 81 65C77 70 52 90 76 89C82 89 82 84 86 81C92 76 98 74 100 66'+
            'C105 48 84 37 69 40M70 94C58 99 66 118 78 112C90 107 82 89 70 94z">'+
            '</path></svg>';

        let panel=
            '<div id="sv_panel">'+
            '<input id="sv_h" type="button" value="Ctrl+Alt:Panel">'+
            '<span class="d-b d-b1">Space:Play-Pause</span>'+
            '<span class="d-b d-b2">変換:Slow-Pause</span>'+
            'Sense<input id="sv_s" type="number" min="10" max="50" step="1">'+
            'Speed<input id="sv_b" type="number" min="4" max="60" step="1">'+
            'Cut-Line <input id="cutl" type="button" value="　">'+
            'Size<input id="sv_size" type="number" min="360" max="1600" step="2">'+
            '<span><a href="'+ help_url +'" target="_blank" rel="noopener noreferrer">'+
            SVG_h +'</a></span>'+
            '<style>'+
            '#sv_panel { position: fixed; top: 15px; left: 65px; z-index: 2000; color: #bbb; '+
            'font: normal 16px/22px Meiryo; padding: 2px 0 2px 12px; width: 910px; '+
            'border: 1px solid #444; background: #163850; user-select: none; } '+
            '#sv_h { margin-right: 12px; padding: 0 6px; height: 22px; color: #bbb; '+
            'border: 1px solid #888; border-radius: 2px; background: transparent; '+
            'outline: none; cursor: pointer; } '+
            '#sv_h:hover { color: #fff; background: #008db9; } '+
            '.d-b { display: inline-block; border: 1px solid #888; border-radius: 2px; '+
            'padding: 0 4px; height: 22px; } '+
            '.d-b1 { margin: 0 1px 0 16px; } '+
            '.d-b2 { margin: 0 28px 0 1px; } '+
            '#sv_s, #sv_b, #sv_size { width: 40px; height: 26px; line-height: 20px; '+
            'text-align: center; padding: 2px 0 0; margin: 0 8px 0 2px; border: none; '+
            'outline: none; color: #bbb; background: #163850; -moz-appearance: textfield; } '+
            '#sv_size { width: 60px; } '+
            '#sv_s:hover, #sv_b:hover, #sv_size:hover { color: #fff; -moz-appearance: initial; } '+
            '#sv_s::-webkit-inner-spin-button, #sv_b::-webkit-inner-spin-button, '+
            '#sv_size::-webkit-inner-spin-button { filter:invert(1)brightness(1.5); } '+
            '#cutl { height: 21px; width: 21px; border: none; border-radius: 2px; '+
            'background: #000; outline: 1px solid #666; cursor: pointer; margin-right: 12px; } '+
            '.help_ATSV { vertical-align: -4px; fill: #aaa; }'+
            '</style></div>';

        if(document.querySelector('#sv_panel')){
            document.querySelector('#sv_panel').remove(); }
        document.body.insertAdjacentHTML('beforeend', panel);

        disp_panel(1)


        let sv_s=document.querySelector('#sv_s');
        if(sv_s){
            sv_s.value=sense;
            sv_s.onchange=()=>{
                run=0;
                slow_play(0);
                sense=sv_s.value;
                sessionStorage.setItem('ATV_SV_sense', sense);
                sv_s.blur(); }}


        let sv_b=document.querySelector('#sv_b');
        if(sv_b){
            sv_b.value=rate_b;
            sv_b.onchange=()=>{
                run=0;
                slow_play(0);
                rate_b=sv_b.value;
                sessionStorage.setItem('ATV_SV_rate_b', rate_b);
                sv_b.blur(); }}


        let cutl=document.querySelector('#cutl');
        if(cutl){
            cut_line(player_wrap, cut);
            cutl.onclick=()=>{
                if(cut==0){
                    cut=1; }
                else if(cut==1){
                    cut=2; }
                else if(cut==2){
                    cut=3; }
                else {
                    cut=0; }
                cut_line(player_wrap, cut);
                sessionStorage.setItem('ATV_SV_cut', cut); }}


        let sv_size=document.querySelector('#sv_size');
        if(sv_size){
            sv_size.value=cut_size;
            sv_size.onchange=()=>{
                cut_size=sv_size.value;
                video_size(player_wrap, cut_size);
                sessionStorage.setItem('ATV_SV_cut_size', cut_size); }}


        function video_size(player_wrap, cut_size){
            let video_elem=player_wrap.querySelector('.com-a-Video__video-element');
            player_wrap.style.width=cut_size/1+34+'px';
            video_elem.style.width=cut_size+'px'; }


        let sv_h=document.querySelector('#sv_h');
        if(sv_h){
            sv_h.onclick=()=>{
                disp_panel(0); }}


        document.body.addEventListener('keydown', function(event){
            if(event.keyCode==28){ //「変換」キー スロー再生/停止
                event.preventDefault();
                event.stopImmediatePropagation();
                if(run==0 || run==2){
                    run=1;
                    slow_play(1); }
                else{
                    run=0;
                    slow_play(0); }}
            else if(event.keyCode==32){ //「Space」キー 通常再生/停止
                event.preventDefault();
                event.stopImmediatePropagation();
                if(run==0 || run==1){
                    run=2;
                    slow_play(2); }
                else{
                    run=0;
                    slow_play(0); }}
            else if(event.altKey && act==2){
                if(event.ctrlKey){
                    if(panel_v==0){
                        disp_panel(1); }
                    else{
                        disp_panel(0); }}}});


        function disp_panel(n){ // 0: 非表示 1: 表示
            let sv_panel=document.querySelector('#sv_panel');
            if(sv_panel){
                if(n==0){
                    panel_v=0;
                    cut_line(player_wrap, 0);
                    sv_panel.style.visibility='hidden'; }
                else{
                    panel_v=1;
                    cut_line(player_wrap, cut);
                    sv_panel.style.visibility='visible'; }}}

    } // set_player()



    function cut_line(player_wrap, cut){
        let video=player_wrap.querySelector('.com-a-Video__video');
        let video_elem=video.querySelector('.com-a-Video__video-element');
        let cutl=document.querySelector('#cutl');
        if(video && video_elem && cutl){
            if(cut==0){
                cutl.style.background='#000';
                cutl.style.outline='1px solid #666';
                cutl.style.boxShadow='';
                player_wrap.style.width='100%';
                video.style.display='block';
                video.style.alignItems='';
                video.style.padding='0';
                video.style.backgroundColor='';
                video_elem.style.height='100%';
                video_elem.style.width='100%';
                video_elem.style.outline=''; }
            if(cut==1){
                cutl.style.background='#009699';
                cutl.style.outline='1px solid #666';
                cutl.style.boxShadow='';
                player_wrap.style.width=cut_size/1+34+'px';
                video.style.display='flex';
                video.style.alignItems='center';
                video.style.padding='16px';
                video.style.backgroundColor='';
                video_elem.style.height='fit-content';
                video_elem.style.width=cut_size+'px';
                video_elem.style.outline=''; }
            else if(cut==2){
                cutl.style.background='#009699';
                cutl.style.outline='1px solid #fff';
                cutl.style.boxShadow='';
                player_wrap.style.width=cut_size/1+34+'px';
                video.style.display='flex';
                video.style.alignItems='center';
                video.style.padding='16px';
                video.style.backgroundColor='';
                video_elem.style.height='fit-content';
                video_elem.style.width=cut_size+'px';
                video_elem.style.outline='1px solid #fff'; }
            else if(cut==3){
                cutl.style.background='#009699';
                cutl.style.outline='1px solid #fff';
                cutl.style.boxShadow='inset 0 0 0 1px #000, inset 0 0 0 2px #fff';
                player_wrap.style.width=cut_size/1+34+'px';
                video.style.display='flex';
                video.style.alignItems='center';
                video.style.padding='16px';
                video.style.backgroundColor='#fff';
                video_elem.style.height='fit-content';
                video_elem.style.width=cut_size+'px';
                video_elem.style.outline='1px solid #000'; }}

        //                video_elem.style.boxShadow='0 0 0 1px #000, 0 0 0 400px #fff'; }}

    } // cut_line()



    function slow_play(n){
        let player_wrap=document.querySelector('.com-vod-VODMiniPlayerWrapper');
        let video_elem=player_wrap.querySelector('.com-a-Video__video-element');
        let PB=player_wrap.querySelector('.com-vod-VideoControlButton');

        if(video_elem && PB){
            if(n==1){ // スロー再生
                let sense=sessionStorage.getItem('ATV_SV_sense');
                interval_s=setInterval(slow, sense)
                let rate_b=sessionStorage.getItem('ATV_SV_rate_b');

                let i=0;
                function slow(){
                    i++;

                    if(i<rate_b -2){
                        pause(); }
                    else{
                        play(); }

                    if(i==rate_b -1){
                        i=-1; }}}
            else if(n==2){ // 通常再生
                clearInterval(interval_s);
                play(); }
            else{ // 再生停止
                clearInterval(interval_s);
                pause(); }


            function pause(){
                if(video_elem.hasAttribute('autoplay')){
                    PB.click(); }}

            function play(){
                if(!video_elem.hasAttribute('autoplay')){
                    PB.click(); }}}

    } // slow_play()

} // main()
