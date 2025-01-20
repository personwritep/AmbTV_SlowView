// ==UserScript==
// @name        AmbTV SlowView
// @namespace        http://tampermonkey.net/
// @version        0.5
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
    let sence=sessionStorage.getItem('ATV_SV_sence');
    if(!sence){
        sence=21;
        sessionStorage.setItem('ATV_SV_sence', sence); }

    let rate_b=sessionStorage.getItem('ATV_SV_rate_b');
    if(!rate_b){
        rate_b=6;
        sessionStorage.setItem('ATV_SV_rate_b', rate_b); }

    let cut=sessionStorage.getItem('ATV_SV_cut');
    if(!cut){
        cut=0;
        sessionStorage.setItem('ATV_SV_cut', cut); }


    let interval_s; // スロー実行のインターバル
    let run=0; // スロー再生実行
    let hide=0; // コントロールの非表示
    let arrange=1; // ページのアレンジ

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
            'Sence <input id="sv_s" type="number" min="10" max="50" step="1">'+
            '　Speed <input id="sv_b" type="number" min="4" max="60" step="1">'+
            '　Cut-Line <input id="cutl" type="button" value="　">'+
            '　<span><a href="'+ help_url +'" target="_blank" rel="noopener noreferrer">'+
            SVG_h +'</a></span>'+
            '<style>'+
            '#sv_panel { position: fixed; top: 10px; right: 160px; z-index: 2000; '+
            'font: normal 16px/22px Meiryo; color: #fff; padding: 2px 12px; '+
            'border: 1px solid #aaa; background: #163850; user-select: none; } '+
            '#sv_s, #sv_b { width: 65px; text-align: center; padding: 2px 6px 0; outline: none; } '+
            '#cutl { height: 21px; width: 21px; border: none; border-radius: 2px; '+
            'background: #000; outline: 1px solid #666; cursor: pointer; } '+
            '.help_ATSV { vertical-align: -4px; fill: #ccc; }'+
            '</style></div>';

        if(!document.querySelector('#sv_panel')){
            document.body.insertAdjacentHTML('beforeend', panel); }


        let sv_s=document.querySelector('#sv_s');
        if(sv_s){
            sv_s.value=sence;
            sv_s.onchange=function(){
                slow_play(0);
                sence=sv_s.value;
                sessionStorage.setItem('ATV_SV_sence', sence); }}


        let sv_b=document.querySelector('#sv_b');
        if(sv_b){
            sv_b.value=rate_b;
            sv_b.onchange=function(){
                slow_play(0);
                rate_b=sv_b.value;
                sessionStorage.setItem('ATV_SV_rate_b', rate_b); }}


        ad_block(player); // ADブロック


        player.oncontextmenu=function(e){
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

            if(event.keyCode==72){ //「H」キー　パネル表示/非表示
                let sv_panel=document.querySelector('#sv_panel');
                if(sv_panel){
                    if(hide==0){
                        hide=1;
                        sv_panel.style.visibility='hidden'; }
                    else{
                        hide=0;
                        sv_panel.style.visibility='visible'; }}}

            if(event.keyCode==87){ //「W」キー　ページアレンジ有効/無効
                let atv_style_slow=player.querySelector('.atv_style_slow');
                if(atv_style_slow){
                    if(arrange==1){
                        arrange=0;
                        atv_style_slow.disabled=false; }
                    else{
                        arrange=1;
                        atv_style_slow.disabled=true; }}}
        });

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
            if(n!=0){
                run=1;

                let sence=sessionStorage.getItem('ATV_SV_sence');
                interval_s=setInterval(slow, sence)

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
            else{
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
