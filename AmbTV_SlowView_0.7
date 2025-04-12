// ==UserScript==
// @name        AmbTV SlowView
// @namespace        http://tampermonkey.net/
// @version        0.7
// @description        AbemaTV ユーティリティ
// @author        Ameba User
// @match        https://abema.tv/*
// @exclude        https://abema.tv/now-on-air/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=abema.tv
// @grant        none
// @updateURL        https://github.com/personwritep/AmbTV_SlowView/raw/main/AmbTV_SlowView.user.js
// @downloadURL        https://github.com/personwritep/AmbTV_SlowView/raw/main/AmbTV_SlowView.user.js
// ==/UserScript==


let target=document.querySelector('head > title');
let monitor=new MutationObserver(player_env);
monitor.observe(target, { childList: true });



function player_env(){
    let interval_s; // スロー実行のインターバル
    let run=0; // スロー再生実行
    let hide=0; // コントロールの非表示

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


    if(!location.pathname.includes('video/episode')){ // 書庫型動画プレーヤーのみ
        if(document.querySelector('#sv_panel')){
            document.querySelector('#sv_panel').remove(); }}


    let retry0=0;
    let interval0=setInterval(wait_target0, 20);
    function wait_target0(){
        retry0++;
        if(retry0>100){ // リトライ制限 100回 2secまで
            clearInterval(interval0); }
        let player=document.querySelector(
            '.com-vod-VODRecommendedContentsContainerView__player');
        if(player){
            clearInterval(interval0);
            set_player(player); }}



    function set_player(player){
        let help_url='https://ameblo.jp/personwritep/entry-12878536354.html'

        let SVG_h=
            '<svg class="help_ATSV" height="20" width="20" viewBox="0 0 150 150">'+
            '<path  d="M66 13C56 15 47 18 39 24C-12 60 18 146 82 137C92 '+
            '135 102 131 110 126C162 90 128 4 66 13M68 25C131 17 145 117 81 '+
            '125C16 133 3 34 68 25M69 40C61 41 39 58 58 61C66 63 73 47 82 57C84 '+
            '60 83 62 81 65C77 70 52 90 76 89C82 89 82 84 86 81C92 76 98 74 100 66'+
            'C105 48 84 37 69 40M70 94C58 99 66 118 78 112C90 107 82 89 70 94z">'+
            '</path></svg>';


        let style=
            '<style class="atv_style_slow">'+
            'html { overflow-y: hidden; } '+
            'button.com-m-HeaderMenu, '+
            '.com-application-Header__right, '+
            '.c-application-SideNavigation, '+
            '.c-application-SideNavigation--collapsed, '+
            '.com-vod-VODRecommendedContentsContainerView__player-aside-recommended'+
            ' { display: none !important; } '+
            '.c-video-EpisodeContainerView-breadcrumb, '+
            '.com-vod-VODDetailsAccordion, '+
            '.com-video-EpisodePlayerSection__header-action-buttons, '+
            '.com-video-EpisodeTitleBlock__expire-text, '+
            '.com-vod-VODRecommendedContentsContainerView__episode-list, '+
            '.com-feature-area-FeatureRecommendedArea__section, '+
            '.c-video-EpisodeContainerView__page-bottom, '+
            '.c-application-FooterContainer { display: none; } '+
            // slots playrer
            '.c-tv-TimeshiftSlotContainerView-breadcrumb, '+
            '.c-tv-TimeshiftPlayerContainerView-comment-button, '+
            '.c-tv-TimeshiftSlotContainerView-detail__action-buttons { display: none; } '+
            '.com-vod-VODRecommendedContentsContainerView__player-and-details { '+
            'margin: 0; } '+
            '</style>'+

            '<style class="atv_style_basic_slow">'+
            '.com-application-Header { height: 50px; } '+
            '.com-vod-VODResponsiveMainContent { margin-top: 58px; overflow-x: visible; } '+
            '.com-vod-VODScreen-container { background: #000 !important; } '+
            '.com-playback-SeekBar__highlighter, .com-playback-SeekBar__marker, '+
            '.com-a-Slider__highlighter { background-color: #2196f3 !important; } '+
            '.com-vod-VODScreen__video-control-bg { '+
            'height: 60px !important; background: rgba(0,0,0,0.5) !important; } '+
            '.com-vod-VODScreen__recommend-content-bg { '+
            'background-image: none !important; } '+
            '.com-vod-VODPlayerNextContentRecommendBase__inner { '+
            'padding: 10px; background: rgb(0 0 0 / 50%); } '+
            '.com-vod-VODResponsiveMainContent { '+
            '--com-vod-VODResponsiveMainContent--content-min-width: 820px; } '+
            '.com-video-EpisodePlayerSectionExternalContent { display: none; } '+ // 🟠AD
            '.com-vod-VODResponsiveMainContent--with-partner-service-banner { '+
            '--com-vod-VODResponsiveMainContent--space-below-player: 80; } '+ // 🟠AD
            '</style>';

        if(!player.querySelector('.atv_style_slow')){
            player.insertAdjacentHTML('beforeend', style); }

        let atv_style_slow=player.querySelector('.atv_style_slow');
        if(atv_style_slow){
            atv_style_slow.disabled=false; }



        let style_hide=
            '<style class="atv_style_hide">'+
            '.com-vod-VODScreen-container { cursor: none; } '+
            '.com-vod-VideoControlBar, .com-vod-VODScreen__video-control-bg { '+
            'display: none !important; } '+
            '</style>';

        if(!player.querySelector('.atv_style_hide')){
            player.insertAdjacentHTML('beforeend', style_hide); }

        let atv_style_hide=player.querySelector('.atv_style_hide'); // 🟩 コントロール非表示
        if(atv_style_hide){
            atv_style_hide.disabled=true; }



        let panel=
            '<div id="sv_panel">'+
            '<input id="sv_w" type="button" value="Wide view">'+
            '<input id="sv_h" type="button" value="Hide panel">'+
            '<span class="d-b d-b1">無変換:Pause</span>'+
            '<span class="d-b d-b2">Space:Pause-Slow</span>'+
            '<span class="d-b d-b3">変換:Play</span>'+
            'Sense<input id="sv_s" type="number" min="10" max="50" step="1">'+
            'Speed<input id="sv_b" type="number" min="4" max="60" step="1">'+
            'Cut-Line <input id="cutl" type="button" value="　">'+
            '　<span><a href="'+ help_url +'" target="_blank" rel="noopener noreferrer">'+
            SVG_h +'</a></span>'+
            '<style>'+
            '#sv_panel { position: fixed; top: 10px; left: 23px; z-index: 2000; '+
            'font: normal 16px/22px Meiryo; color: #bbb; padding: 2px 0 2px 12px; width: 950px; '+
            'border: 1px solid #444; background: #163850; user-select: none; } '+
            '#sv_w, #sv_h { margin-right: 12px; padding: 1px 6px 0; height: 22px; color: #bbb; '+
            'border: none; border-radius: 2px; background: transparent; cursor: pointer; } '+
            '#sv_w:hover, #sv_h:hover { color: #fff; background: #008db9; } '+
            '.d-b { display: inline-block; border: 1px solid #888; border-radius: 2px; '+
            'padding: 0 4px; height: 22px; } '+
            '.d-b1 { margin: 0 1px 0 16px; } '+
            '.d-b2 { margin: 0 1px 0 1px; } '+
            '.d-b3 { margin: 0 28px 0 1px; } '+
            '#sv_s, #sv_b { width: 40px; height: 26px; line-height: 20px; text-align: center; '+
            'padding: 2px 0 0; margin: 0 8px 0 2px; border: none; outline: none; color: #bbb; '+
            'background: #163850; -moz-appearance: textfield; } '+
            '#sv_s:hover, #sv_b:hover { color: #fff; -moz-appearance: initial; } '+
            '#sv_s::-webkit-inner-spin-button, #sv_b::-webkit-inner-spin-button { '+
            'filter:invert(1)brightness(1.5); } '+
            '#cutl { height: 21px; width: 21px; border: none; border-radius: 2px; '+
            'background: #000; outline: 1px solid #666; cursor: pointer; } '+
            '.help_ATSV { vertical-align: -4px; fill: #aaa; }'+
            '</style></div>';

        if(!document.querySelector('#sv_panel')){
            document.body.insertAdjacentHTML('beforeend', panel); }


        let sv_s=document.querySelector('#sv_s');
        if(sv_s){
            sv_s.value=sense;
            sv_s.onchange=function(){
                slow_play(0);
                sense=sv_s.value;
                sessionStorage.setItem('ATV_SV_sense', sense); }}


        let sv_b=document.querySelector('#sv_b');
        if(sv_b){
            sv_b.value=rate_b;
            sv_b.onchange=function(){
                slow_play(0);
                rate_b=sv_b.value;
                sessionStorage.setItem('ATV_SV_rate_b', rate_b); }}


        ad_block(player); // ADブロック


        player.oncontextmenu=function(event){
            event.preventDefault();
            hide_con(player); } // 🟩 動画面の右クリックでコントロールを非表示


        let cutl=document.querySelector('#cutl');
        if(cutl){
            cut_line(player, cutl);
            cutl.onclick=function(){
                if(cut==0){
                    cut=1; }
                else if(cut==1){
                    cut=2; }
                else {
                    cut=0; }
                cut_line(player, cutl);
                sessionStorage.setItem('ATV_SV_cut', cut); }}


        document.body.addEventListener('keydown', function(event){
            if(event.keyCode==32){ //「Space」キー
                event.preventDefault();
                event.stopImmediatePropagation();
                if(run==0){
                    slow_play(1); }
                else{
                    slow_play(0); }}
            if(event.keyCode==28 || event.keyCode==17){ //「変換」「Ctrl」キー　通常再生
                event.preventDefault();
                slow_play(2); }
            if(event.keyCode==29 || event.keyCode==18){ //「無変換」「Alt」キー 再生停止
                event.preventDefault();
                slow_play(0); }
            if(event.keyCode==87){ //「W」キー　ページアレンジ有効/無効
                wide_view(); }
            if(event.keyCode==72){ //「H」キー　パネル表示/非表示
                hide_panel(); }
        });


        let sv_w=document.querySelector('#sv_w');
        if(sv_w){
            sv_w.onclick=()=>{
                wide_view(); }}


        let sv_h=document.querySelector('#sv_h');
        if(sv_h){
            sv_h.onclick=()=>{
                hide_panel(); }}


        function wide_view(){
            let atv_style_slow=player.querySelector('.atv_style_slow');
            if(atv_style_slow){
                if(atv_style_slow.disabled==false){
                    atv_style_slow.disabled=true; }
                else{
                    atv_style_slow.disabled=false; }}}


        function hide_panel(){
            let sv_panel=document.querySelector('#sv_panel');
            if(sv_panel){
                if(hide==0){
                    hide=1;
                    sv_panel.style.visibility='hidden'; }
                else{
                    hide=0;
                    sv_panel.style.visibility='visible'; }}}

    } // set_player()



    function ad_block(player){
        let retry2=0;
        let interval2=setInterval(wait_target2, 20);
        function wait_target2(){
            retry2++;
            if(retry2>100){ // リトライ制限 100回 2secまで
                clearInterval(interval2); }
            let ad_container=player.querySelector('#videoAdContainer > div');
            if(ad_container){
                clearInterval(interval2);
                ad_container.remove(); }}}



    function hide_con(player){
        let atv_style_hide=player.querySelector('.atv_style_hide');
        if(atv_style_hide){
            if(atv_style_hide.disabled==true){
                atv_style_hide.disabled=false; }
            else{
                atv_style_hide.disabled=true; }}}



    function cut_line(player, cutl){
        if(cut==0){
            cutl.style.outline='1px solid #666';
            cutl.style.boxShadow='';
            player.style.boxShadow=''; }
        else if(cut==1){
            cutl.style.outline='1px solid #fff';
            cutl.style.boxShadow='';
            player.style.boxShadow='0 0 0 1px #fff'; }
        else if(cut==2){
            cutl.style.outline='1px solid #fff';
            cutl.style.boxShadow='inset 0 0 0 1px #000, inset 0 0 0 2px #fff';
            player.style.boxShadow='0 0 0 1px #000, 0 0 0 10px #fff'; }}



    function slow_play(n){
        let player=document.querySelector(
            '.com-vod-VODRecommendedContentsContainerView__player');
        let VE=player.querySelector('.com-a-Video__video-element');
        let PB=player.querySelector('.com-vod-PlaybackButton');
        if(VE && PB){
            if(n==1){ // スロー再生
                run=1;

                let sense=sessionStorage.getItem('ATV_SV_sense');
                interval_s=setInterval(slow, sense)

                let i=0;
                function slow(){
                    let rate_b=sessionStorage.getItem('ATV_SV_rate_b');
                    i++;

                    if(i<rate_b -2){
                        pause(); }
                    else{
                        play(); }

                    if(i==rate_b -1){
                        i=-1; }}}
            else if(n==2){ // 通常再生
                run=0;
                clearInterval(interval_s);
                play(); }
            else{ // 再生停止
                run=0;
                clearInterval(interval_s);
                pause(); }


            function pause(){
                if(VE.hasAttribute('autoplay')){
                    PB.click(); }}

            function play(){
                if(!VE.hasAttribute('autoplay')){
                    PB.click(); }}}

    } // slow_play()

} // player_env()
